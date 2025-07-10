package com.alten.ecommerce.repository;

import com.alten.ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductRepository extends JpaRepository<Product, Long> {

}
