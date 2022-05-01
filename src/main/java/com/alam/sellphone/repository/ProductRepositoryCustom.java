package com.alam.sellphone.repository;

import com.alam.sellphone.domain.Product;
import com.alam.sellphone.service.dto.ProductDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductRepositoryCustom {
    Page<Product> findAllByKeySearch(Pageable pageable, String varSearch, Long typeSearch);

    Page<ProductDTO> findAllForAdmin(Pageable pageable);
}
