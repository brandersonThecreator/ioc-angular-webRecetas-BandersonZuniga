import { Component, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-barra-cerca",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./barra-cerca.component.html",
  styleUrls: ["./barra-cerca.component.scss"],
})
export class BarraCercaComponent {
  @Output() cercaCanviada = new EventEmitter<string>();

  cercaTerme: string = "";

  buscar() {
    this.cercaCanviada.emit(this.cercaTerme);
  }

  onInputChange() {
    this.cercaCanviada.emit(this.cercaTerme);
  }

  esborrarCerca() {
    this.cercaTerme = "";
    this.cercaCanviada.emit("");
  }
}
