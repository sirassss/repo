package com.alam.sellphone.service.impl;

import com.alam.sellphone.domain.OrderDetails;
import com.alam.sellphone.repository.OrderDetailsRepository;
import com.alam.sellphone.service.OrderDetailsService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link OrderDetails}.
 */
@Service
@Transactional
public class OrderDetailsServiceImpl implements OrderDetailsService {

    private final Logger log = LoggerFactory.getLogger(OrderDetailsServiceImpl.class);

    private final OrderDetailsRepository orderDetailsRepository;

    public OrderDetailsServiceImpl(OrderDetailsRepository orderDetailsRepository) {
        this.orderDetailsRepository = orderDetailsRepository;
    }

    @Override
    public OrderDetails save(OrderDetails orderDetails) {
        log.debug("Request to save OrderDetails : {}", orderDetails);
        return orderDetailsRepository.save(orderDetails);
    }

    @Override
    public Optional<OrderDetails> partialUpdate(OrderDetails orderDetails) {
        log.debug("Request to partially update OrderDetails : {}", orderDetails);

        return orderDetailsRepository
            .findById(orderDetails.getId())
            .map(
                existingOrderDetails -> {
                    if (orderDetails.getProductID() != null) {
                        existingOrderDetails.setProductID(orderDetails.getProductID());
                    }
                    if (orderDetails.getOrderID() != null) {
                        existingOrderDetails.setOrderID(orderDetails.getOrderID());
                    }
                    if (orderDetails.getQuantity() != null) {
                        existingOrderDetails.setQuantity(orderDetails.getQuantity());
                    }
                    if (orderDetails.getUnitPrice() != null) {
                        existingOrderDetails.setUnitPrice(orderDetails.getUnitPrice());
                    }
                    if (orderDetails.getTotal() != null) {
                        existingOrderDetails.setTotal(orderDetails.getTotal());
                    }

                    return existingOrderDetails;
                }
            )
            .map(orderDetailsRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<OrderDetails> findAll(Pageable pageable) {
        log.debug("Request to get all OrderDetails");
        return orderDetailsRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<OrderDetails> findOne(Long id) {
        log.debug("Request to get OrderDetails : {}", id);
        return orderDetailsRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete OrderDetails : {}", id);
        orderDetailsRepository.deleteById(id);
    }
}
