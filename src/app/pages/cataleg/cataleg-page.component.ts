import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ElementService } from "../../services/element.service";
import { TargetaElementComponent } from "../../components/targeta-element/targeta-element.component";
import { FormulariCercaComponent } from "../../components/formulari-cerca/formulari-cerca.component";

@Component({
  selector: "app-cataleg-page",
  standalone: true,
  imports: [CommonModule, TargetaElementComponent, FormulariCercaComponent],
  templateUrl: "./cataleg-page.component.html",
  styleUrl: "./cataleg-page.component.scss",
})
export class CatalegPageComponent implements OnInit {
  private elementService = inject(ElementService);

  elements = this.elementService.elements;
  carregant = this.elementService.carregant;
  error = this.elementService.error;

  ngOnInit(): void {
    this.carregarElementsPopulars();
  }

  carregarElementsPopulars(): void {
    this.elementService.obtenirPopulars();
  }

  reintentar(): void {
    this.carregarElementsPopulars();
  }

  onCercaCanviada(terme: string): void {
    if (terme && terme.trim().length > 0) {
      this.elementService.cercar(terme);
    } else {
      this.carregarElementsPopulars();
    }
  }
}
