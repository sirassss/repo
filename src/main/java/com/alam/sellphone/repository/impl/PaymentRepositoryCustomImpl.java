package com.alam.sellphone.repository.impl;

import com.alam.sellphone.repository.PaymentRepositoryCustom;
import com.alam.sellphone.service.dto.PaymentDTO;
import com.alam.sellphone.service.util.Common;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

public class PaymentRepositoryCustomImpl implements PaymentRepositoryCustom {

    @Autowired
    @PersistenceContext(unitName = "entityManagerFactory")
    private EntityManager entityManager;

    @Override
    public Page<PaymentDTO> findAllAdmin(Pageable pageable) {
        StringBuilder sql = new StringBuilder();
        List<PaymentDTO> payments = new ArrayList<>();
        Map<String, Object> params = new HashMap<>();
        sql.append(
            " select p.ID, u.FirstName as userFirstName, u.LastName as userLastName, " +
            "       OrderAddress, OrderPhone, TotalAmount, c.CreatedDate, p.Status, OrderID, BankID " +
            "    from Payment p " +
            "        left join Bank b on p.BankID = b.ID " +
            "        left join Cart c on p.OrderID = c.ID " +
            "        left join Account u on u.ID = c.UserID "
        );
        Query countQuery = entityManager.createNativeQuery("SELECT Count(1) from ( " + sql + " ) as tabpro");
        Common.setParams(countQuery, params);
        Number total = (Number) countQuery.getSingleResult();
        if (total.longValue() > 0) {
            Query query = entityManager.createNativeQuery(sql + Common.addSort(pageable.getSort()), "PaymentDTO");
            Common.setParamsWithPageable(query, params, pageable, total);
            payments = query.getResultList();
        }
        return new PageImpl<>(payments, pageable, total.longValue());
    }

    @Override
    public List<PaymentDTO> getForUser(String login) {
        StringBuilder sql = new StringBuilder();
        sql.append(
            " select p.ID, u.FirstName as userFirstName, u.LastName as userLastName, " +
            "       OrderAddress, OrderPhone, TotalAmount, c.CreatedDate, p.Status, OrderID, BankID " +
            "    from Payment p " +
            "        left join Bank b on p.BankID = b.ID " +
            "        left join Cart c on p.OrderID = c.ID " +
            "        left join Account u on u.ID = c.UserID where u.Login = :login "
        );
        Query res = entityManager.createNativeQuery(sql.toString(), "PaymentDTO");
        res.setParameter("login", login);
        return res.getResultList();
    }
}
