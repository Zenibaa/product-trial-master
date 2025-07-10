package com.alten.ecommerce.controller;

import com.alten.ecommerce.model.CartItem;
import com.alten.ecommerce.utils.mapper.CartItemMapper;
import com.alten.ecommerce.dto.request.CartItemRequest;
import com.alten.ecommerce.dto.CartItemDTO;
import com.alten.ecommerce.service.impl.CartServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:4200")
@PreAuthorize("hasRole('USER')")
public class CartController {

    @Autowired
    private CartServiceImpl cartServiceImpl;
    @Autowired
    private CartItemMapper cartItemMapper;
    @GetMapping
    public ResponseEntity<List<CartItemDTO>> getCart(Principal principal) {
        List<CartItem> cartItems = cartServiceImpl.getCartByUserEmail(principal.getName());
        List<CartItemDTO> cartItemDTOs = cartItemMapper.toDTOList(cartItems);
        return ResponseEntity.ok(cartItemDTOs);
    }

    @PostMapping
    public ResponseEntity<CartItemDTO> addToCart(@Valid @RequestBody CartItemRequest request,
                                              Principal principal) {
        CartItem cartItem = cartServiceImpl.addToCart(principal.getName(),
                request.getProductId(),
                request.getQuantity());
        CartItemDTO cartItemDTO = cartItemMapper.toDTO(cartItem);
        return ResponseEntity.ok(cartItemDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CartItemDTO> updateCartItem(@PathVariable Long id,
                                                   @Valid @RequestBody CartItemRequest request,
                                                   Principal principal) {
        CartItem cartItem = cartServiceImpl.updateCartItem(id, principal.getName(),
                request.getQuantity());
        CartItemDTO cartItemDTO = cartItemMapper.toDTO(cartItem);
        return ResponseEntity.ok(cartItemDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long id, Principal principal) {
        cartServiceImpl.removeFromCart(id, principal.getName());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<?> clearCart(Principal principal) {
        cartServiceImpl.clearCart(principal.getName());
        return ResponseEntity.ok().build();
    }

}