package com.alam.sellphone.service.impl;

import com.alam.sellphone.domain.Order;
import com.alam.sellphone.repository.OrderRepository;
import com.alam.sellphone.service.OrderService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Order}.
 */
@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    private final Logger log = LoggerFactory.getLogger(OrderServiceImpl.class);

    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public Order save(Order order) {
        log.debug("Request to save Order : {}", order);
        return orderRepository.save(order);
    }

    @Override
    public Optional<Order> partialUpdate(Order order) {
        log.debug("Request to partially update Order : {}", order);

        return orderRepository
            .findById(order.getId())
            .map(
                existingOrder -> {
                    if (order.getUserID() != null) {
                        existingOrder.setUserID(order.getUserID());
                    }
                    if (order.getCreatedDate() != null) {
                        existingOrder.setCreatedDate(order.getCreatedDate());
                    }
                    if (order.getOrderAddress() != null) {
                        existingOrder.setOrderAddress(order.getOrderAddress());
                    }
                    if (order.getOrderPhone() != null) {
                        existingOrder.setOrderPhone(order.getOrderPhone());
                    }
                    if (order.getStatus() != null) {
                        existingOrder.setStatus(order.getStatus());
                    }

                    return existingOrder;
                }
            )
            .map(orderRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Order> findAll(Pageable pageable) {
        log.debug("Request to get all Orders");
        return orderRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Order> findOne(Long id) {
        log.debug("Request to get Order : {}", id);
        return orderRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Order : {}", id);
        orderRepository.deleteById(id);
    }
}
