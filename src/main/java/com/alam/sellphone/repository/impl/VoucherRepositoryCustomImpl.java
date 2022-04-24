package com.alam.sellphone.repository.impl;

import com.alam.sellphone.domain.Product;
import com.alam.sellphone.domain.Voucher;
import com.alam.sellphone.repository.VoucherRepositoryCustom;
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

public class VoucherRepositoryCustomImpl implements VoucherRepositoryCustom {

    @Autowired
    @PersistenceContext(unitName = "entityManagerFactory")
    private EntityManager entityManager;

    @Override
    public Page<Voucher> findAllNotForProduct(Pageable pageable, Long userID) {
        StringBuilder sql = new StringBuilder();
        List<Voucher> vouchers = new ArrayList<>();
        Map<String, Object> params = new HashMap<>();
        sql.append("FROM Voucher WHERE ProductID IS NULL and Status = 1 and UserID = :userID ");
        params.put("userID", userID);
        Query countQuery = entityManager.createNativeQuery("SELECT Count(1) " + sql);
        Common.setParams(countQuery, params);
        Number total = (Number) countQuery.getSingleResult();
        if (total.longValue() > 0) {
            Query query = entityManager.createNativeQuery("SELECT * " + sql + Common.addSort(pageable.getSort()), Voucher.class);
            Common.setParamsWithPageable(query, params, pageable, total);
            vouchers = query.getResultList();
        }
        return new PageImpl<>(vouchers, pageable, total.longValue());
    }
}
