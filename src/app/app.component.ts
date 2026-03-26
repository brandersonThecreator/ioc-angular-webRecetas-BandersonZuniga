import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Element } from "./models/element.model";
import { DADES_MOCK } from "./mocks/dades-mock";
import { BarraCercaComponent } from "./components/barra-cerca/barra-cerca.component";
import { LlistaElementsComponent } from "./components/llista-elements/llista-elements.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    BarraCercaComponent,
    LlistaElementsComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "SaboresWeb";
  receptes = DADES_MOCK;
  cercaTerme = "";

  constructor() {
    console.log("Hola! Aquí tens receptes");
  }

  onCercaCanviada(terme: string) {
    this.cercaTerme = terme;
  }

  onReceptaSeleccionada(recepta: Element) {
    alert("Has triat: " + recepta.nom);
  }
}
