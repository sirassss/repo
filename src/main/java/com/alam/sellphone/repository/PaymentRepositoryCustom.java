package com.alam.sellphone.repository;

import com.alam.sellphone.service.dto.PaymentDTO;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PaymentRepositoryCustom {
    Page<PaymentDTO> findAllAdmin(Pageable pageable);

    List<PaymentDTO> getForUser(String login);
}
