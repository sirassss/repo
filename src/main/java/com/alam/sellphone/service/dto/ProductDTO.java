package com.alam.sellphone.service.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import javax.persistence.Column;

public class ProductDTO {

    private Long id;

    private String image;

    private String code;

    private String name;

    private Integer quantity;

    private BigDecimal unitPrice;

    private Integer installment;

    private String nameManufacturer;

    private LocalDate createdDate;

    public ProductDTO() {}

    public ProductDTO(
        Long id,
        String image,
        String code,
        String name,
        Integer quantity,
        BigDecimal unitPrice,
        Integer installment,
        String nameManufacturer,
        LocalDate createdDate
    ) {
        this.id = id;
        this.image = image;
        this.code = code;
        this.name = name;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.installment = installment;
        this.nameManufacturer = nameManufacturer;
        this.createdDate = createdDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Integer getInstallment() {
        return installment;
    }

    public void setInstallment(Integer installment) {
        this.installment = installment;
    }

    public String getNameManufacturer() {
        return nameManufacturer;
    }

    public void setNameManufacturer(String nameManufacturer) {
        this.nameManufacturer = nameManufacturer;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }
}
