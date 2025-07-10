import {Component, inject} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {NgIf, NgFor, CurrencyPipe} from "@angular/common";
import {CartService} from "../../services/cart.service";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {BadgeModule} from "primeng/badge";
import {TooltipModule} from "primeng/tooltip";
import {CartItem} from "../../models/cartItem.model";

@Component({
  selector: 'app-cart-composant',
  standalone: true,
  imports: [
    ButtonModule,
    BadgeModule,
    ToastModule,
    TooltipModule,
    NgIf,
    NgFor,
    CurrencyPipe
  ],
  providers: [MessageService],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private readonly cartService = inject(CartService);
  private readonly messageService = inject(MessageService);

  public readonly cartItems = this.cartService.cartItems;
  public readonly cartTotal = this.cartService.cartTotalPrice;
  public readonly cartItemsCount = this.cartService.cartItemsCount;


  removeFromCart(id: number) {
    this.cartService.removeFromCart(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Supprimé',
          detail: 'Article supprimé du panier'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de supprimer l\'article'
        });
      }
    });
  }

  updateQuantity(id: number, newQuantity: number) {
    if (newQuantity <= 0) {
      this.removeFromCart(id);
      return;
    }

    const item = this.cartItems().find(item => item.id === id);
    if (item && item.product) {
      this.cartService.updateCartItem(id, {
        productId: item.product.id,
        quantity: newQuantity
      }).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Quantité mise à jour',
            detail: `Quantité: ${newQuantity}`
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Impossible de mettre à jour la quantité'
          });
        }
      });
    }
  }

  clearCart() {
    this.cartService.clearCart().subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Panier vidé',
          detail: 'Tous les articles ont été supprimés'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de vider le panier'
        });
      }
    });
  }

  trackByItemId(index: number, item: CartItem): number {
    return item.id;
  }

  checkout() {
    const items = this.cartItems();
    if (items.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Panier vide',
        detail: 'Ajoutez des articles avant de passer commande'
      });
      return;
    }

    console.log('Commande passée:', items);
    this.messageService.add({
      severity: 'info',
      summary: 'Commande en cours',
      detail: 'Redirection vers le paiement...'
    });
  }
}
