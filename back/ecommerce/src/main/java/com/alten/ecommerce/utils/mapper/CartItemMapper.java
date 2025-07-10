package com.alten.ecommerce.utils.mapper;

import com.alten.ecommerce.dto.CartItemDTO;
import com.alten.ecommerce.dto.ProductDTO;
import com.alten.ecommerce.model.CartItem;
import com.alten.ecommerce.model.Product;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CartItemMapper {

    public CartItemDTO toDTO(CartItem cartItem) {
        CartItemDTO dto = new CartItemDTO();
        dto.setId(cartItem.getId());
        dto.setQuantity(cartItem.getQuantity());
        dto.setCreatedAt(cartItem.getCreatedAt());

        // Conversion du Product en ProductDTO
        if (cartItem.getProduct() != null) {
            dto.setProduct(toProductDTO(cartItem.getProduct()));
        }

        return dto;
    }

    public List<CartItemDTO> toDTOList(List<CartItem> cartItems) {
        return cartItems.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private ProductDTO toProductDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setCode(product.getCode());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setImage(product.getImage());
        dto.setCategory(product.getCategory());
        dto.setPrice(product.getPrice());
        dto.setQuantity(product.getQuantity());
        dto.setInternalReference(product.getInternalReference());
        dto.setShellId(product.getShellId());
        dto.setInventoryStatus(product.getInventoryStatus() != null ?
                product.getInventoryStatus().toString() : null);
        dto.setRating(product.getRating());
        dto.setCreatedAt(product.getCreatedAt());
        dto.setUpdatedAt(product.getUpdatedAt());

        return dto;
    }
}