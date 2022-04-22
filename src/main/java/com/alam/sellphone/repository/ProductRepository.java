package com.alam.sellphone.repository;

import com.alam.sellphone.domain.Product;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, ProductRepositoryCustom {
    @Query(value = " select * from Product where ID in ?1", nativeQuery = true)
    List<Product> getAllProductsByID(List<Long> productID);
}
