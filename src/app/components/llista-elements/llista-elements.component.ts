import {
  Component,
  Input,
  Output,
  EventEmitter,
  
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { Element } from "../../models/element.model";
import { TargetaElementComponent } from "../targeta-element/targeta-element.component";

@Component({
  selector: "app-llista-elements",
  standalone: true,
  imports: [CommonModule, TargetaElementComponent],
  templateUrl: "./llista-elements.component.html",
  styleUrls: ["./llista-elements.component.scss"],
})
export class LlistaElementsComponent {
  @Input() elements: Element[] = [];
  @Input() cercaTerme: string = "";
  @Output() elementSeleccionat = new EventEmitter<Element>();

  get elementsFiltrats(): Element[] {
    if (!this.cercaTerme || this.cercaTerme.length < 3) {
      return this.elements;
    }

    return this.elements.filter(
      (element) =>
        element.nom.toLowerCase().includes(this.cercaTerme.toLowerCase()) ||
        element.categoria
          ?.toLowerCase()
          .includes(this.cercaTerme.toLowerCase()) ||
        element.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(this.cercaTerme.toLowerCase()),
        ),
    );
  }

  trackByElementId(index: number, element: Element): number {
    return element.id;
  }

  onElementSeleccionat(element: Element): void {
    this.elementSeleccionat.emit(element);
  }
}
