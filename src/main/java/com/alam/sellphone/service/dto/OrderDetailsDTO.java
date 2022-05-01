package com.alam.sellphone.service.dto;

import java.math.BigDecimal;

public class OrderDetailsDTO {

    private Long id;
    private Long productID;
    private Long orderID;
    private Integer quantity;
    private BigDecimal unitPrice;
    private Integer total;
    private String image;
    private String name;

    public OrderDetailsDTO() {}

    public OrderDetailsDTO(
        Long id,
        Long productID,
        Long orderID,
        Integer quantity,
        BigDecimal unitPrice,
        Integer total,
        String image,
        String name
    ) {
        this.id = id;
        this.productID = productID;
        this.orderID = orderID;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.total = total;
        this.image = image;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getProductID() {
        return productID;
    }

    public void setProductID(Long productID) {
        this.productID = productID;
    }

    public Long getOrderID() {
        return orderID;
    }

    public void setOrderID(Long orderID) {
        this.orderID = orderID;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
