import { Component, inject } from "@angular/core";
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PreferitsService } from "./services/preferits.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "WebRecetes - Catàleg de Receptes";

  private preferitsService = inject(PreferitsService);

  // Signal per mostrar el comptador de preferits
  totalPreferits = this.preferitsService.totalPreferits;
}
