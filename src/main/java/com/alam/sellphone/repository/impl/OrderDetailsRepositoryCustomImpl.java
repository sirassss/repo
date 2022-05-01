package com.alam.sellphone.repository.impl;

import com.alam.sellphone.repository.OrderDetailsRepositoryCustom;
import com.alam.sellphone.service.dto.OrderDetailsDTO;
import com.alam.sellphone.service.dto.PaymentDTO;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;

public class OrderDetailsRepositoryCustomImpl implements OrderDetailsRepositoryCustom {

    @Autowired
    @PersistenceContext(unitName = "entityManagerFactory")
    private EntityManager entityManager;

    @Override
    public List<OrderDetailsDTO> getByOderID(Long orderID) {
        StringBuilder sql = new StringBuilder();
        sql.append(
            "select od.ID, od.ProductID, OrderID, od.Quantity, od.UnitPrice, Total, pd.ImageUrl as image, Name " +
            "       from OrderDetail od " +
            "           inner join Product sp on sp.ID = od.ProductID " +
            "           inner join ProductDetail pd on od.ProductID = pd.ProductID " +
            "                where OrderID = :orderID"
        );
        Query detailsDTO = entityManager.createNativeQuery(sql.toString(), "OrderDetailsDTO");
        detailsDTO.setParameter("orderID", orderID);
        return detailsDTO.getResultList();
    }
}
