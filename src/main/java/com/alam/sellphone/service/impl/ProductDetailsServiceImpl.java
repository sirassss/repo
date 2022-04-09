package com.alam.sellphone.service.impl;

import com.alam.sellphone.domain.ProductDetails;
import com.alam.sellphone.repository.ProductDetailsRepository;
import com.alam.sellphone.service.ProductDetailsService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link ProductDetails}.
 */
@Service
@Transactional
public class ProductDetailsServiceImpl implements ProductDetailsService {

    private final Logger log = LoggerFactory.getLogger(ProductDetailsServiceImpl.class);

    private final ProductDetailsRepository productDetailsRepository;

    public ProductDetailsServiceImpl(ProductDetailsRepository productDetailsRepository) {
        this.productDetailsRepository = productDetailsRepository;
    }

    @Override
    public ProductDetails save(ProductDetails productDetails) {
        log.debug("Request to save ProductDetails : {}", productDetails);
        return productDetailsRepository.save(productDetails);
    }

    @Override
    public Optional<ProductDetails> partialUpdate(ProductDetails productDetails) {
        log.debug("Request to partially update ProductDetails : {}", productDetails);

        return productDetailsRepository
            .findById(productDetails.getId())
            .map(
                existingProductDetails -> {
                    if (productDetails.getProductID() != null) {
                        existingProductDetails.setProductID(productDetails.getProductID());
                    }
                    if (productDetails.getManufacturerID() != null) {
                        existingProductDetails.setManufacturerID(productDetails.getManufacturerID());
                    }
                    if (productDetails.getCapacity() != null) {
                        existingProductDetails.setCapacity(productDetails.getCapacity());
                    }
                    if (productDetails.getScreen() != null) {
                        existingProductDetails.setScreen(productDetails.getScreen());
                    }
                    if (productDetails.getCamera() != null) {
                        existingProductDetails.setCamera(productDetails.getCamera());
                    }
                    if (productDetails.getoSAndCPU() != null) {
                        existingProductDetails.setoSAndCPU(productDetails.getoSAndCPU());
                    }
                    if (productDetails.getpIN() != null) {
                        existingProductDetails.setpIN(productDetails.getpIN());
                    }
                    if (productDetails.getImageUrl() != null) {
                        existingProductDetails.setImageUrl(productDetails.getImageUrl());
                    }
                    if (productDetails.getColor() != null) {
                        existingProductDetails.setColor(productDetails.getColor());
                    }
                    if (productDetails.getDescription() != null) {
                        existingProductDetails.setDescription(productDetails.getDescription());
                    }

                    return existingProductDetails;
                }
            )
            .map(productDetailsRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductDetails> findAll(Pageable pageable) {
        log.debug("Request to get all ProductDetails");
        return productDetailsRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ProductDetails> findOne(Long id) {
        log.debug("Request to get ProductDetails : {}", id);
        return productDetailsRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProductDetails : {}", id);
        productDetailsRepository.deleteById(id);
    }
}
