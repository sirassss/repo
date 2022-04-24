package com.alam.sellphone.repository;

import com.alam.sellphone.domain.Voucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface VoucherRepositoryCustom {
    Page<Voucher> findAllNotForProduct(Pageable pageable, Long id);
}
