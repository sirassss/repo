package com.alam.sellphone.repository;

import com.alam.sellphone.service.dto.OrderDetailsDTO;
import java.util.List;

public interface OrderDetailsRepositoryCustom {
    List<OrderDetailsDTO> getByOderID(Long orderID);
}
