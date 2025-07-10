package com.alten.ecommerce.service.impl;

import com.alten.ecommerce.model.CartItem;
import com.alten.ecommerce.model.Product;
import com.alten.ecommerce.model.User;
import com.alten.ecommerce.repository.CartItemRepository;
import com.alten.ecommerce.repository.ProductRepository;
import com.alten.ecommerce.repository.UserRepository;
//import jakarta.transaction.Transactional;
import com.alten.ecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<CartItem> getCartByUserEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        return cartItemRepository.findByUser(user);
    }

    @Override
    public CartItem addToCart(String email, Long productId, int quantity) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé"));

        // Vérifier si le produit est déjà dans le panier
        Optional<CartItem> existingItem = cartItemRepository.findByUserAndProduct(user, product);
        if (existingItem.isPresent()) {
            CartItem existingCartItem = existingItem.get();
            int newQuantity = existingCartItem.getQuantity() + quantity;
            if (product.getQuantity() < newQuantity) {
                throw new RuntimeException("Stock insuffisant pour cette quantité");
            }
            existingCartItem.setQuantity(newQuantity);
            return cartItemRepository.save(existingCartItem);
        }

        CartItem cartItem = new CartItem();
        cartItem.setUser(user);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);

        return cartItemRepository.save(cartItem);
    }

    @Override
    public CartItem updateCartItem(Long cartItemId, String email, int quantity) {
        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Élément du panier introuvable"));

        if (!cartItem.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Accès non autorisé");
        }

        if (cartItem.getProduct().getQuantity() < quantity) {
            throw new RuntimeException("Stock insuffisant");
        }
        cartItem.setQuantity(quantity);
        return cartItemRepository.save(cartItem);
    }

    @Override
    public void removeFromCart(Long cartItemId, String email) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Élément du panier introuvable"));

        if (!item.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Accès non autorisé");
        }

        cartItemRepository.delete(item);
    }

    @Override
    public void clearCart(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        cartItemRepository.deleteByUser(user);
    }

//    @Transactional(readOnly = true)
//    @Override
//    public List<CartItem> getCartByUser(String email) {
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
//        return cartItemRepository.findByUserWithProduct(user);
//    }
//
//    @Transactional(readOnly = true)
//    @Override
//    public Optional<CartItem> findByUserAndProduct( String email, Long idProduct) {
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
//        Product product = productRepository.findById(idProduct)
//                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
//        return cartItemRepository.findByUserAndProductWithProduct(user, product);
//    }

}
