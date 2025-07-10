package com.alten.ecommerce.controller;

import com.alten.ecommerce.dto.request.LoginRequest;
import com.alten.ecommerce.dto.request.SignupRequest;
import com.alten.ecommerce.dto.response.JwtResponse;
import com.alten.ecommerce.model.User;
import com.alten.ecommerce.dto.response.UserResponse;
import com.alten.ecommerce.repository.UserRepository;
import com.alten.ecommerce.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/token")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            UserResponse userDetails = (UserResponse) authentication.getPrincipal();

            return ResponseEntity.ok(new JwtResponse(
                    userDetails.getId(),
                    jwt,
                    "Bearer",
                    userDetails.getEmail(),
                    userDetails.getUsername()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/account")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Erreur: Le nom d'utilisateur est déjà utilisé!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Erreur: L'email est déjà utilisé!"));
        }

        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setFirstname(signUpRequest.getFirstname());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        // Définir le rôle par défaut
        user.setRole("USER");

        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "Utilisateur créé avec succès!"));
    }
}