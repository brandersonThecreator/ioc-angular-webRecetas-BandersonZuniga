import {
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
  computed,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Element, ElementCataleg } from "../../models/element.model";
import { PreferitsService } from "../../services/preferits.service";

@Component({
  selector: "app-targeta-element",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./targeta-element.component.html",
  styleUrl: "./targeta-element.component.scss",
})
export class TargetaElementComponent {
  @Input() element?: Element;
  @Input() elementCataleg?: ElementCataleg;
  @Input() esPreferit?: boolean; // Input directe per casos especials
  @Output() elementSeleccionat = new EventEmitter<Element>();
  @Output() catalogElementSeleccionat = new EventEmitter<ElementCataleg>();
  @Output() preferitCanviat = new EventEmitter<ElementCataleg>();

  private preferitsService = inject(PreferitsService);

  // Computed per verificar estat de preferit
  esElementPreferit = computed(() => {
    if (this.esPreferit !== undefined) return this.esPreferit;
    if (this.elementCataleg) {
      return this.preferitsService.esPreferit(this.elementCataleg.id);
    }
    return false;
  });

  clickRecepta() {
    if (this.element) {
      this.elementSeleccionat.emit(this.element);
    }
  }

  clickElementCataleg() {
    if (this.elementCataleg) {
      this.catalogElementSeleccionat.emit(this.elementCataleg);
    }
  }

  // Helper per determinar quin model s'està utilitzant
  get esCataleg(): boolean {
    return !!this.elementCataleg;
  }

  // Gestió de preferits
  togglePreferit(event: Event): void {
    event.stopPropagation(); // Evitar que es triggeri el click del catàleg

    if (this.elementCataleg) {
      if (this.esElementPreferit()) {
        this.preferitsService.eliminarPreferit(this.elementCataleg.id);
      } else {
        this.preferitsService.afegirPreferit(this.elementCataleg);
      }
      this.preferitCanviat.emit(this.elementCataleg);
    }
  }
}
