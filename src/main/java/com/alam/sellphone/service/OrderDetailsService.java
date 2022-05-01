package com.alam.sellphone.service;

import com.alam.sellphone.domain.OrderDetails;
import com.alam.sellphone.service.dto.OrderDetailsDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link OrderDetails}.
 */
public interface OrderDetailsService {
    /**
     * Save a orderDetails.
     *
     * @param orderDetails the entity to save.
     * @return the persisted entity.
     */
    OrderDetails save(OrderDetails orderDetails);

    /**
     * Partially updates a orderDetails.
     *
     * @param orderDetails the entity to update partially.
     * @return the persisted entity.
     */
    Optional<OrderDetails> partialUpdate(OrderDetails orderDetails);

    /**
     * Get all the orderDetails.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<OrderDetails> findAll(Pageable pageable);

    /**
     * Get the "id" orderDetails.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<OrderDetails> findOne(Long id);

    /**
     * Delete the "id" orderDetails.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    List<OrderDetailsDTO> getByOderID(Long orderID);
}
