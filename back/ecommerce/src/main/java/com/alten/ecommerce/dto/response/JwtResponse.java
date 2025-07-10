package com.alten.ecommerce.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Réponse envoyée après une authentification réussie.
 */
@Data
@AllArgsConstructor
public class JwtResponse {
    private Long id;
    private String token;
    private String type = "Bearer";
    private String email;
    private String username;
}
