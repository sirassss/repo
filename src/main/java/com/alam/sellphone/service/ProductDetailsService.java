package com.alam.sellphone.service;

import com.alam.sellphone.domain.ProductDetails;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link ProductDetails}.
 */
public interface ProductDetailsService {
    /**
     * Save a productDetails.
     *
     * @param productDetails the entity to save.
     * @return the persisted entity.
     */
    ProductDetails save(ProductDetails productDetails);

    /**
     * Partially updates a productDetails.
     *
     * @param productDetails the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ProductDetails> partialUpdate(ProductDetails productDetails);

    /**
     * Get all the productDetails.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ProductDetails> findAll(Pageable pageable);

    /**
     * Get the "id" productDetails.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProductDetails> findOne(Long id);

    /**
     * Delete the "id" productDetails.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
