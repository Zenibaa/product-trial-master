package com.alten.ecommerce.service;
import com.alten.ecommerce.model.CartItem;

import java.util.List;

public interface CartService {
    List<CartItem> getCartByUserEmail(String email);
    CartItem addToCart(String email, Long productId, int quantity);
    CartItem updateCartItem(Long cartItemId, String email, int quantity);
    void removeFromCart(Long cartItemId, String email);
    void clearCart(String email);
//    List<CartItem> getCartByUser(String email);
//    Optional<CartItem> findByUserAndProduct(String email, Long idProduct);
}

