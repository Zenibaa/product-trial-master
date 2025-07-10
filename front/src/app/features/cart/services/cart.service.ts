import {Injectable, inject, signal, computed} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Observable, of, catchError, tap, switchMap, EMPTY} from "rxjs";
import {CartItem} from "../models/cartItem.model";
import {CartItemRequest} from "../../products/models/cartItemRequest.model";

const API = {
  cart: "http://localhost:8081/api/cart",
};

@Injectable({ providedIn: "root" })
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly _cartItems = signal<CartItem[]>([]);
  private readonly _isLoading = signal<boolean>(false);

  public readonly cartItems = this._cartItems.asReadonly();
  public readonly isLoading = this._isLoading.asReadonly();

  public readonly cartItemsCount = computed(() =>
    this._cartItems().reduce((total, item) => total + item.quantity, 0)
  );

  public readonly cartTotalPrice = computed(() =>
    this._cartItems().reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0)
  );


  getCart(): Observable<CartItem[]> {
    this._isLoading.set(true);
    return this.http.get<CartItem[]>(API.cart).pipe(
      tap((items) => {
        this._cartItems.set(items);
        this._isLoading.set(false);
      }),
      catchError((err) => {
        console.error("Erreur de récupération du panier", err);
        this._isLoading.set(false);
        return EMPTY;
      })
    );
  }


  addToCart(request: CartItemRequest): Observable<CartItem> {
    this._isLoading.set(true);
    return this.http.post<CartItem>(API.cart, request).pipe(
      switchMap((item) => {
        // Après l'ajout, récupérer l'état à jour du panier depuis le backend
        return this.getCart().pipe(
          tap(() => this._isLoading.set(false)),
          switchMap(() => of(item)) // Retourner l'item ajouté
        );
      }),
      catchError((err) => {
        console.error("Erreur d'ajout au panier", err);
        this._isLoading.set(false);
        return EMPTY;
      })
    );
  }


  updateCartItem(id: number, request: CartItemRequest): Observable<CartItem> {
    this._isLoading.set(true);
    return this.http.put<CartItem>(`${API.cart}/${id}`, request).pipe(
      switchMap((updatedItem) => {
        // Après la mise à jour, récupérer l'état à jour du panier depuis le backend
        return this.getCart().pipe(
          tap(() => this._isLoading.set(false)),
          switchMap(() => of(updatedItem)) // Retourner l'item mis à jour
        );
      }),
      catchError((err) => {
        console.error("Erreur de mise à jour du panier", err);
        this._isLoading.set(false);
        return EMPTY;
      })
    );
  }


  removeFromCart(id: number): Observable<void> {
    this._isLoading.set(true);
    return this.http.delete<void>(`${API.cart}/${id}`).pipe(
      switchMap(() => {
        // Après la suppression, récupérer l'état à jour du panier depuis le backend
        return this.getCart().pipe(
          tap(() => this._isLoading.set(false)),
          switchMap(() => of(undefined)) // Retourner void
        );
      }),
      catchError((err) => {
        console.error("Erreur de suppression du panier", err);
        this._isLoading.set(false);
        return EMPTY;
      })
    );
  }


  clearCart(): Observable<void> {
    this._isLoading.set(true);
    return this.http.delete<void>(API.cart).pipe(
      switchMap(() => {
        return this.getCart().pipe(
          tap(() => this._isLoading.set(false)),
          switchMap(() => of(undefined))
        );
      }),
      catchError((err) => {
        console.error("Erreur de vidage du panier", err);
        this._isLoading.set(false);
        return EMPTY;
      })
    );
  }



  getProductQuantityInCart(productId: number): number {
    const item = this._cartItems().find(item => item.product?.id === productId);
    return item ? item.quantity : 0;
  }


}
