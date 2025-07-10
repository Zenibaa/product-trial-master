import { Component, OnInit, inject, signal } from "@angular/core";
import { ProductFormComponent } from "app/features/products/ui/product-form/product-form.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { CartService } from '../../../cart/services/cart.service';
import { MessageService } from 'primeng/api';
import {Product} from "../../models/product.model";
import {ProductsService} from "../../models/products.service";
import {CartItemRequest} from "../../models/cartItemRequest.model";

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent],
  providers: [MessageService]
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly messageService = inject(MessageService);

  public readonly products = this.productsService.products;
  public readonly cartItemList = this.cartService.cartItems;
  public readonly isCartLoading = this.cartService.isLoading;

  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);
  public readonly addingToCart = signal<number | null>(null); // ID du produit en cours d'ajout

  ngOnInit() {
    this.productsService.get().subscribe();
    this.cartService.getCart().subscribe();
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe();
  }

  public AddToCart(product: Product) {
    this.addingToCart.set(product.id);

    const cartItemRequest: CartItemRequest = { productId: product.id, quantity: 1 };

    this.cartService.addToCart(cartItemRequest).subscribe({
      next: (response) => {
        this.addingToCart.set(null);
        if (response) {
          this.messageService.add({
            severity: 'success',
            summary: 'Produit ajouté',
            detail: `${product.name} a été ajouté au panier`,
            life: 3000
          });
        }
      },
      error: (error) => {
        this.addingToCart.set(null);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible d\'ajouter le produit au panier',
          life: 3000
        });
      }
    });
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }

  public isProductBeingAdded(productId: number): boolean {
    return this.addingToCart() === productId;
  }

  public getProductQuantityInCart(productId: number): number {
    return this.cartService.getProductQuantityInCart(productId);
  }
}
