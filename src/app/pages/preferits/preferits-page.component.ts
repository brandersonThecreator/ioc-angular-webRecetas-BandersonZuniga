import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PreferitsPanelComponent } from "../../components/preferits-panel/preferits-panel.component";

@Component({
  selector: "app-preferits-page",
  standalone: true,
  imports: [CommonModule, PreferitsPanelComponent],
  templateUrl: "./preferits-page.component.html",
  styleUrl: "./preferits-page.component.scss",
})
export class PreferitsPageComponent {}
