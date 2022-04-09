package com.alam.sellphone.service;

import com.alam.sellphone.domain.Manufactured;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Manufactured}.
 */
public interface ManufacturedService {
    /**
     * Save a manufactured.
     *
     * @param manufactured the entity to save.
     * @return the persisted entity.
     */
    Manufactured save(Manufactured manufactured);

    /**
     * Partially updates a manufactured.
     *
     * @param manufactured the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Manufactured> partialUpdate(Manufactured manufactured);

    /**
     * Get all the manufactureds.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Manufactured> findAll(Pageable pageable);

    /**
     * Get the "id" manufactured.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Manufactured> findOne(Long id);

    /**
     * Delete the "id" manufactured.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
