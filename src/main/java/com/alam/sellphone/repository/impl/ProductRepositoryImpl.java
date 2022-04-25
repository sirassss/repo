package com.alam.sellphone.repository.impl;

import com.alam.sellphone.domain.Product;
import com.alam.sellphone.repository.ProductRepositoryCustom;
import com.alam.sellphone.service.util.Common;
import com.tngtech.archunit.thirdparty.com.google.common.base.Strings;
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

public class ProductRepositoryImpl implements ProductRepositoryCustom {

    @Autowired
    @PersistenceContext(unitName = "entityManagerFactory")
    private EntityManager entityManager;

    @Override
    public Page<Product> findAllByKeySearch(Pageable pageable, String varSearch, Long typeSearch) {
        StringBuilder sql = new StringBuilder();
        List<Product> products = new ArrayList<>();
        Map<String, Object> params = new HashMap<>();
        sql.append("FROM Product WHERE 1 = 1 ");
        if (!Strings.isNullOrEmpty(varSearch)) {
            sql.append(" and Name like :varSearch ");
            params.put("varSearch", "%" + varSearch + "%");
        } else {
            sql.append(" and Name like '' ");
        }
        if (typeSearch != 999) {
            sql.append(" or TypeID = :typeSearch ");
            params.put("typeSearch", typeSearch);
        }

        Query countQuery = entityManager.createNativeQuery("SELECT Count(1) " + sql);
        Common.setParams(countQuery, params);
        Number total = (Number) countQuery.getSingleResult();
        if (total.longValue() > 0) {
            Query query = entityManager.createNativeQuery("SELECT * " + sql + Common.addSort(pageable.getSort()), Product.class);
            Common.setParamsWithPageable(query, params, pageable, total);
            products = query.getResultList();
        }
        return new PageImpl<>(products, pageable, total.longValue());
    }
}
