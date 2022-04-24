package com.alam.sellphone.service.impl;

import com.alam.sellphone.domain.Product;
import com.alam.sellphone.repository.ProductRepository;
import com.alam.sellphone.service.ProductService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Product}.
 */
@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private final Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product save(Product product) {
        log.debug("Request to save Product : {}", product);
        return productRepository.save(product);
    }

    @Override
    public Optional<Product> partialUpdate(Product product) {
        log.debug("Request to partially update Product : {}", product);

        return productRepository
            .findById(product.getId())
            .map(
                existingProduct -> {
                    if (product.getCode() != null) {
                        existingProduct.setCode(product.getCode());
                    }
                    if (product.getName() != null) {
                        existingProduct.setName(product.getName());
                    }
                    if (product.getQuantity() != null) {
                        existingProduct.setQuantity(product.getQuantity());
                    }
                    if (product.getUnitPrice() != null) {
                        existingProduct.setUnitPrice(product.getUnitPrice());
                    }
                    if (product.getInstallment() != null) {
                        existingProduct.setInstallment(product.getInstallment());
                    }
                    if (product.getAccompanyingProducts() != null) {
                        existingProduct.setAccompanyingProducts(product.getAccompanyingProducts());
                    }
                    if (product.getWarranty() != null) {
                        existingProduct.setWarranty(product.getWarranty());
                    }
                    if (product.getCreatedDate() != null) {
                        existingProduct.setCreatedDate(product.getCreatedDate());
                    }
                    if (product.getModifiedDate() != null) {
                        existingProduct.setModifiedDate(product.getModifiedDate());
                    }
                    if (product.getCreatedUser() != null) {
                        existingProduct.setCreatedUser(product.getCreatedUser());
                    }
                    if (product.getModifiedUser() != null) {
                        existingProduct.setModifiedUser(product.getModifiedUser());
                    }
                    if (product.getRate() != null) {
                        existingProduct.setRate(product.getRate());
                    }

                    return existingProduct;
                }
            )
            .map(productRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Product> findAll(Pageable pageable, String varSearch, Integer typeSearch) {
        log.debug("LẤY TẤT CẢ SẢN PHẨM");
        return productRepository.findAllByKeySearch(pageable, varSearch, typeSearch);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Product> findAllForAdmin(Pageable pageable) {
        log.debug("LẤY TẤT CẢ SẢN PHẨM");
        return productRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Product> findOne(Long id) {
        log.debug("Request to get Product : {}", id);
        return productRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Product : {}", id);
        productRepository.deleteById(id);
    }

    @Override
    public List<Product> getAllProductsByID(List<Long> productID) {
        return productRepository.getAllProductsByID(productID);
    }
}
