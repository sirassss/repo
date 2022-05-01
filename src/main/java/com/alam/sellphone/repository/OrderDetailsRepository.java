package com.alam.sellphone.repository;

import com.alam.sellphone.domain.OrderDetails;
import com.alam.sellphone.service.dto.OrderDetailsDTO;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the OrderDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long>, OrderDetailsRepositoryCustom {}
