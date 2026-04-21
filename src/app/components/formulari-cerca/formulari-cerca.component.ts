import {
  Component,
  Output,
  EventEmitter,
  inject,
  OnDestroy,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from "@angular/forms";
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  takeUntil,
  switchMap,
  of,
  delay,
  catchError,
} from "rxjs";
import { ElementService } from "../../services/element.service";

@Component({
  selector: "app-formulari-cerca",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./formulari-cerca.component.html",
  styleUrl: "./formulari-cerca.component.scss",
})
export class FormulariCercaComponent implements OnDestroy {
  @Output() cercaEmitida = new EventEmitter<string>();

  private fb = inject(FormBuilder);
  private elementService = inject(ElementService);
  private destroy$ = new Subject<void>();

  formulariCerca: FormGroup;

  constructor() {
    this.formulariCerca = this.fb.group({
      termeCerca: [
        "",
        {
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
          ],
          asyncValidators: [this.codiDisponibleValidator.bind(this)],
        },
      ],
    });

    // Configurar debounce per cerca automàtica
    this.configurarCercaAutomatica();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private configurarCercaAutomatica(): void {
    const termeCercaControl = this.formulariCerca.get("termeCerca");

    if (termeCercaControl) {
      termeCercaControl.valueChanges
        .pipe(
          debounceTime(400), // Espera 400ms després de l'última tecla
          distinctUntilChanged(),
          takeUntil(this.destroy$),
        )
        .subscribe((valor) => {
          if (valor && valor.length >= 2 && this.formulariCerca.valid) {
            this.cercaEmitida.emit(valor);
            this.elementService.cercar(valor);
          }
        });
    }
  }

  // Validador asíncron que simula una consulta a l'API
  private codiDisponibleValidator(control: any) {
    if (!control.value || control.value.length < 2) {
      return of(null);
    }

    return of(control.value).pipe(
      delay(500), // Simula retard de 500ms
      switchMap((terme) => {
        // Simulació: si el terme conté "noresultats", retorna error
        if (terme.toLowerCase().includes("noresultats")) {
          return of({ sensResultats: true });
        }
        return of(null);
      }),
      catchError(() => of(null)),
    );
  }

  netejar(): void {
    this.formulariCerca.get("termeCerca")?.setValue("");
    this.cercaEmitida.emit("");
    this.elementService.obtenirPopulars(); // Tornar a carregar elements populars
  }

  // Getter per facilitar l'accés al control
  get termeCerca() {
    return this.formulariCerca.get("termeCerca");
  }

  // Helper per mostrar si té text
  get teTex(): boolean {
    return this.termeCerca?.value && this.termeCerca.value.length > 0;
  }

  // Helper per mostrar si està validant
  get estaValidant(): boolean {
    return this.termeCerca?.pending || false;
  }

  // Helpers per als missatges d'error
  get errorLongitudMinima(): boolean {
    return (
      (this.termeCerca?.hasError("minlength") && this.termeCerca?.touched) ||
      false
    );
  }

  get errorLongitudMaxima(): boolean {
    return (
      (this.termeCerca?.hasError("maxlength") && this.termeCerca?.touched) ||
      false
    );
  }

  get errorSenseResultats(): boolean {
    return (
      (this.termeCerca?.hasError("sensResultats") &&
        this.termeCerca?.touched) ||
      false
    );
  }
}
