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
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from "rxjs";

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
  private destroy$ = new Subject<void>();

  formulariCerca: FormGroup;

  constructor() {
    this.formulariCerca = this.fb.group({
      termeCerca: ["", [Validators.minLength(2), Validators.maxLength(50)]],
    });

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
          debounceTime(400),
          distinctUntilChanged(),
          takeUntil(this.destroy$),
        )
        .subscribe((valor) => {
          if (valor && valor.length >= 2) {
            this.cercaEmitida.emit(valor);
          } else if (!valor || valor.length === 0) {
            this.cercaEmitida.emit("");
          }
        });
    }
  }

  netejar(): void {
    this.formulariCerca.get("termeCerca")?.setValue("");
    this.cercaEmitida.emit("");
  }

  get termeCerca() {
    return this.formulariCerca.get("termeCerca");
  }

  get teTex(): boolean {
    return this.termeCerca?.value && this.termeCerca.value.length > 0;
  }

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
}
