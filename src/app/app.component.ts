import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "ioc-angular-webRecetas-brandersonZuniga";
  constructor() {
    console.log("hola disfruta de todas comidas");
  }
}
