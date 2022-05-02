package com.alam.sellphone.repository;

import com.alam.sellphone.domain.Payment;
import com.alam.sellphone.service.dto.PaymentDTO;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Payment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long>, PaymentRepositoryCustom {
    //    @Query(value = "  select p.ID, u.FirstName as userFirstName, u.LastName as userLastName, " +
    //        "       OrderAddress, OrderPhone, TotalAmount, c.CreatedDate, p.Status, OrderID, BankID " +
    //        "    from Payment p " +
    //        "        left join Bank b on p.BankID = b.ID " +
    //        "        left join Cart c on p.OrderID = c.ID " +
    //        "        left join Account u on u.ID = c.UserID where u.Login = ?1 ", nativeQuery = true)
    //    List<PaymentDTO> getForUser(String login);
}
