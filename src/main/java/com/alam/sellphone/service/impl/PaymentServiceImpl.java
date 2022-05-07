package com.alam.sellphone.service.impl;

import com.alam.sellphone.domain.Payment;
import com.alam.sellphone.domain.User;
import com.alam.sellphone.repository.OrderDetailsRepository;
import com.alam.sellphone.repository.OrderRepository;
import com.alam.sellphone.repository.PaymentRepository;
import com.alam.sellphone.service.MailService;
import com.alam.sellphone.service.PaymentService;
import com.alam.sellphone.service.UserService;
import com.alam.sellphone.service.dto.OrderDetailsDTO;
import com.alam.sellphone.service.dto.PaymentDTO;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Payment}.
 */
@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final Logger log = LoggerFactory.getLogger(PaymentServiceImpl.class);

    private final PaymentRepository paymentRepository;

    private final MailService mailService;

    private final UserService userService;

    private final OrderDetailsRepository orderDetailsRepository;

    public PaymentServiceImpl(
        PaymentRepository paymentRepository,
        MailService mailService,
        UserService userService,
        OrderRepository orderRepository,
        OrderDetailsRepository orderDetailsRepository
    ) {
        this.paymentRepository = paymentRepository;
        this.mailService = mailService;
        this.userService = userService;
        this.orderDetailsRepository = orderDetailsRepository;
    }

    @Override
    public Payment save(Payment payment) {
        log.debug("Request to save Payment : {}", payment);
        if (payment.getStatus() == 1) {
            Optional<User> user = userService.getUserWithAuthorities();
            if (user.isPresent()) {
                List<OrderDetailsDTO> order = orderDetailsRepository.getByOderID(payment.getOrderID());
                mailService.sendPayment(user.get(), order);
            }
        }

        return paymentRepository.save(payment);
    }

    @Override
    public Optional<Payment> partialUpdate(Payment payment) {
        log.debug("Request to partially update Payment : {}", payment);

        return paymentRepository
            .findById(payment.getId())
            .map(
                existingPayment -> {
                    if (payment.getOrderID() != null) {
                        existingPayment.setOrderID(payment.getOrderID());
                    }
                    if (payment.getBankID() != null) {
                        existingPayment.setBankID(payment.getBankID());
                    }
                    if (payment.getStatus() != null) {
                        existingPayment.setStatus(payment.getStatus());
                    }

                    return existingPayment;
                }
            )
            .map(paymentRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PaymentDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Payments");
        return paymentRepository.findAllAdmin(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Payment> findOne(Long id) {
        log.debug("Request to get Payment : {}", id);
        return paymentRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Payment : {}", id);
        paymentRepository.deleteById(id);
    }

    @Override
    public List<PaymentDTO> getForUser(String login) {
        return paymentRepository.getForUser(login);
    }
}
