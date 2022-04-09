package com.alam.sellphone.repository;

import com.alam.sellphone.domain.Voucher;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Voucher entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long> {}
