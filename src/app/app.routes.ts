import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/cataleg",
    pathMatch: "full",
  },
  {
    path: "cataleg",
    loadComponent: () =>
      import("./pages/cataleg/cataleg-page.component").then(
        (m) => m.CatalegPageComponent,
      ),
  },
  {
    path: "preferits",
    loadComponent: () =>
      import("./pages/preferits/preferits-page.component").then(
        (m) => m.PreferitsPageComponent,
      ),
  },
  {
    path: "**",
    redirectTo: "/cataleg",
  },
];
