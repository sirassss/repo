package com.alam.sellphone.service.dto;

import com.alam.sellphone.domain.OrderDetails;
import java.math.BigDecimal;
import java.time.LocalDate;

public class PaymentDTO {

    private Long id;
    private String userFirstName;
    private String userLastName;
    private String orderAddress;
    private String orderPhone;
    private BigDecimal totalAmount;
    private LocalDate createdDate;
    private Integer status;
    private OrderDetails orderDetails;
    private Long orderID;
    private Long bankID;

    public PaymentDTO() {}

    public PaymentDTO(
        Long id,
        String userFirstName,
        String userLastName,
        String orderAddress,
        String orderPhone,
        BigDecimal totalAmount,
        LocalDate createdDate,
        Integer status,
        Long orderID,
        Long bankID
    ) {
        this.id = id;
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.orderAddress = orderAddress;
        this.orderPhone = orderPhone;
        this.totalAmount = totalAmount;
        this.createdDate = createdDate;
        this.status = status;
        this.orderID = orderID;
        this.bankID = bankID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserFirstName() {
        return userFirstName;
    }

    public void setUserFirstName(String userFirstName) {
        this.userFirstName = userFirstName;
    }

    public String getUserLastName() {
        return userLastName;
    }

    public void setUserLastName(String userLastName) {
        this.userLastName = userLastName;
    }

    public String getOrderAddress() {
        return orderAddress;
    }

    public void setOrderAddress(String orderAddress) {
        this.orderAddress = orderAddress;
    }

    public String getOrderPhone() {
        return orderPhone;
    }

    public void setOrderPhone(String orderPhone) {
        this.orderPhone = orderPhone;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public OrderDetails getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(OrderDetails orderDetails) {
        this.orderDetails = orderDetails;
    }

    public Long getOrderID() {
        return orderID;
    }

    public void setOrderID(Long orderID) {
        this.orderID = orderID;
    }

    public Long getBankID() {
        return bankID;
    }

    public void setBankID(Long bankID) {
        this.bankID = bankID;
    }
}
