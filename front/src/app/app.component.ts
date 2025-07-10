import {
  Component, inject,
} from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/components/panel-menu/panel-menu.component";
import { SidebarModule } from "primeng/sidebar";
import { CartComponent } from "./features/cart/ui/cart/cart.component";
import { ToastModule } from "primeng/toast";
import { CartService } from "./features/cart/services/cart.service";
import { BadgeModule } from "primeng/badge";
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";
import {AuthService} from "./core/auth/services/auth.service.";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [
    RouterModule,
    SplitterModule,
    ToolbarModule,
    PanelMenuComponent,
    SidebarModule,
    CartComponent,
    ToastModule,
    BadgeModule,
    ButtonModule,
    CommonModule
  ],
})
export class AppComponent {
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  title = 'ALTEN E-COMMERCE';
  isCartOpen = false;

  get cartCountValue() {
    return this.cartService.cartItemsCount();
  }

  get isLoading() {
    return this.cartService.isLoading();
  }

  get currentUser() {
    return this.authService.getCurrentUser();
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }


  toggleCart() {
    this.isCartOpen = !this.isCartOpen;

    // Si on ouvre le panier, récupérer les données à jour
    if (this.isCartOpen) {
      this.cartService.getCart().subscribe({
        next: (items) => {
          console.log('Panier récupéré:', items);
        },
        error: (error) => {
          console.error('Erreur lors de la récupération du panier:', error);
        }
      });
    }
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
