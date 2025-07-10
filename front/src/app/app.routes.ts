// src/app/app.routes.ts
import { Routes } from "@angular/router";
import { HomePage } from "./pages/home/home.page";
import { ContactComponent } from "./features/contact/contact.component";
import { authGuard } from "./core/auth/guard/auth.guard";

export const APP_ROUTES: Routes = [
  {
    path: "home",
    component: HomePage,
    canActivate: [authGuard], // Protège la route home
  },
  {
    path: "products",
    loadChildren: () =>
      import("./features/products/routes/products.routes").then((m) => m.PRODUCTS_ROUTES),
    canActivate: [authGuard], // Protège la route products
  },
  {
    path: "contact",
    component: ContactComponent,
    canActivate: [authGuard], // Protège la route contact
  },
  {
    path: "login",
    loadComponent: () =>
      import("./pages/login/login.component").then(m => m.LoginComponent),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "home" // Redirige les routes inconnues vers home
  }
];
