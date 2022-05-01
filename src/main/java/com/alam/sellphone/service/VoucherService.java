package com.alam.sellphone.service;

import com.alam.sellphone.domain.Voucher;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Voucher}.
 */
public interface VoucherService {
    /**
     * Save a voucher.
     *
     * @param voucher the entity to save.
     * @return the persisted entity.
     */
    Voucher save(Voucher voucher);

    /**
     * Partially updates a voucher.
     *
     * @param voucher the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Voucher> partialUpdate(Voucher voucher);

    /**
     * Get all the vouchers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Voucher> findAll(Pageable pageable);

    /**
     * Get the "id" voucher.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Voucher> findOne(Long id);

    /**
     * Delete the "id" voucher.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    Page<Voucher> findAllForAdmin(Pageable pageable);
}
