import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Element } from "../../models/element.model";

@Component({
  selector: "app-targeta-element",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./targeta-element.component.html",
  styleUrl: "./targeta-element.component.scss",
})
export class TargetaElementComponent {
  @Input() element!: Element;
  @Output() elementSeleccionat = new EventEmitter<Element>();

  clickRecepta() {
    this.elementSeleccionat.emit(this.element);
  }
}
