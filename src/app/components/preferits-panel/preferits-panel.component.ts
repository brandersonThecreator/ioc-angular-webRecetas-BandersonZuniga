import { Component, computed, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormArray,
  FormGroup,
  Validators,
} from "@angular/forms";
import { TargetaElementComponent } from "../targeta-element/targeta-element.component";
import { PreferitsService } from "../../services/preferits.service";
import { ElementCataleg } from "../../models/element.model";

@Component({
  selector: "app-preferits-panel",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TargetaElementComponent],
  templateUrl: "./preferits-panel.component.html",
  styleUrl: "./preferits-panel.component.scss",
})
export class PreferitsPanelComponent {
  private fb = inject(FormBuilder);
  private preferitsService = inject(PreferitsService);

  preferits = this.preferitsService.preferits;
  notes = this.preferitsService.notes;
  totalPreferits = this.preferitsService.totalPreferits;

  notesForm = this.fb.group({
    notes: this.fb.array([]),
  });

  hiHaPreferits = computed(() => this.preferits().length > 0);

  constructor() {
    this.sincronitzarFormAmbNotes();
  }

  get notesArray(): FormArray {
    return this.notesForm.get("notes") as FormArray;
  }

  private sincronitzarFormAmbNotes(): void {
    while (this.notesArray.length !== 0) {
      this.notesArray.removeAt(0);
    }

    this.preferits().forEach((preferit) => {
      const notaActual = this.notes()[preferit.id] || "";
      this.notesArray.push(this.crearFormGroupNota(preferit, notaActual));
    });
  }

  private crearFormGroupNota(
    element: ElementCataleg,
    notaInicial: string = "",
  ): FormGroup {
    return this.fb.group({
      elementId: [element.id, Validators.required],
      elementNom: [element.nom],
      nota: [
        notaInicial,
        [Validators.maxLength(200), this.validadorNotaPersonalitzat],
      ],
    });
  }

  private validadorNotaPersonalitzat(control: any) {
    const valor = control.value;
    if (!valor) return null;

    if (valor.match(/^[^a-zA-Z0-9\s]*$/)) {
      return { notaInvalida: true };
    }

    const paraulesProhibides = ["spam", "test123"];
    if (
      paraulesProhibides.some((paraula) =>
        valor.toLowerCase().includes(paraula.toLowerCase()),
      )
    ) {
      return { paraulaProhibida: true };
    }

    return null;
  }

  afegirNota(index: number): void {
    const formGroup = this.notesArray.at(index);
    const elementId = formGroup.get("elementId")?.value;
    const nota = formGroup.get("nota")?.value;

    if (elementId && nota && formGroup.valid) {
      this.preferitsService.afegirNota(elementId, nota);
      console.log(`Nota afegida per ${elementId}: ${nota}`);
    }
  }

  esborrarNota(index: number): void {
    const formGroup = this.notesArray.at(index);
    const elementId = formGroup.get("elementId")?.value;

    if (elementId) {
      this.preferitsService.esborrarNota(elementId);
      formGroup.get("nota")?.setValue("");
      console.log(`Nota esborrada per ${elementId}`);
    }
  }

  eliminarPreferit(element: ElementCataleg): void {
    this.preferitsService.eliminarPreferit(element.id);
    this.sincronitzarFormAmbNotes();
  }

  netejarTotsElsPreferits(): void {
    if (confirm("Estàs segur que vols eliminar tots els preferits?")) {
      this.preferitsService.netejarTots();
      this.sincronitzarFormAmbNotes();
    }
  }

  exportarPreferits(): void {
    const dades = {
      preferits: this.preferits(),
      notes: this.notes(),
      dataExportacio: new Date().toISOString(),
      totalElements: this.totalPreferits(),
    };

    const dataStr = JSON.stringify(dades, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `preferits_${new Date().toISOString().slice(0, 10)}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  }

  obtenirErrorsNota(index: number): string[] {
    const formGroup = this.notesArray.at(index);
    const control = formGroup.get("nota");
    const errors: string[] = [];

    if (control?.hasError("maxlength")) {
      errors.push("La nota no pot tenir més de 200 caràcters");
    }
    if (control?.hasError("notaInvalida")) {
      errors.push("La nota ha de contenir text vàlid");
    }
    if (control?.hasError("paraulaProhibida")) {
      errors.push("La nota conté paraules no permeses");
    }

    return errors;
  }

  notaTeTex(index: number): boolean {
    const formGroup = this.notesArray.at(index);
    const nota = formGroup.get("nota")?.value;
    return nota && nota.trim().length > 0;
  }
}
