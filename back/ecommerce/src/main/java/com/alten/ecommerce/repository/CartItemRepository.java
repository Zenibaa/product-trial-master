package com.alten.ecommerce.repository;

import com.alten.ecommerce.model.CartItem;
import com.alten.ecommerce.model.Product;
import com.alten.ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    // Vos méthodes existantes
    List<CartItem> findByUser(User user);

    Optional<CartItem> findByUserAndProduct(User user, Product product);

    void deleteByUser(User user);

//    @Query("SELECT ci FROM CartItem ci " +
//            "JOIN FETCH ci.product p " +
//            "JOIN FETCH ci.user u " +
//            "WHERE u.email = :email")
//    List<CartItem> findByUserEmailWithProduct(@Param("email") String email);

    // Version avec JOIN FETCH pour findByUser
//    @Query("SELECT ci FROM CartItem ci " +
//            "JOIN FETCH ci.product " +
//            "WHERE ci.user = :user")
//    List<CartItem> findByUserWithProduct(@Param("user") User user);

//    // Version avec JOIN FETCH pour findByUserAndProduct
//    @Query("SELECT ci FROM CartItem ci " +
//            "JOIN FETCH ci.product " +
//            "WHERE ci.user = :user AND ci.product = :product")
//    Optional<CartItem> findByUserAndProductWithProduct(@Param("user") User user, @Param("product") Product product);

}