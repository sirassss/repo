package com.alam.sellphone.repository;

import com.alam.sellphone.domain.Voucher;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Voucher entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Long>, VoucherRepositoryCustom {}
