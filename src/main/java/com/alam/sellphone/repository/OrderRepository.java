package com.alam.sellphone.repository;

import com.alam.sellphone.domain.Order;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Order entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query(value = " select * from Cart where UserID = ?1 and Status = 0 ", nativeQuery = true)
    Optional<Order> getOrderUnpaid(Long userID);
}
