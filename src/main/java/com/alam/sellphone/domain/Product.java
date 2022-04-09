package com.alam.sellphone.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "unit_price", precision = 21, scale = 2)
    private BigDecimal unitPrice;

    @Column(name = "installment")
    private Boolean installment;

    @Column(name = "accompanying_products")
    private String accompanyingProducts;

    @Column(name = "warranty")
    private Integer warranty;

    @Column(name = "created_date")
    private LocalDate createdDate;

    @Column(name = "modified_date")
    private LocalDate modifiedDate;

    @Column(name = "created_user")
    private String createdUser;

    @Column(name = "modified_user")
    private String modifiedUser;

    @Column(name = "status")
    private Boolean status;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product id(Long id) {
        this.id = id;
        return this;
    }

    public String getCode() {
        return this.code;
    }

    public Product code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return this.name;
    }

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return this.quantity;
    }

    public Product quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getUnitPrice() {
        return this.unitPrice;
    }

    public Product unitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
        return this;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Boolean getInstallment() {
        return this.installment;
    }

    public Product installment(Boolean installment) {
        this.installment = installment;
        return this;
    }

    public void setInstallment(Boolean installment) {
        this.installment = installment;
    }

    public String getAccompanyingProducts() {
        return this.accompanyingProducts;
    }

    public Product accompanyingProducts(String accompanyingProducts) {
        this.accompanyingProducts = accompanyingProducts;
        return this;
    }

    public void setAccompanyingProducts(String accompanyingProducts) {
        this.accompanyingProducts = accompanyingProducts;
    }

    public Integer getWarranty() {
        return this.warranty;
    }

    public Product warranty(Integer warranty) {
        this.warranty = warranty;
        return this;
    }

    public void setWarranty(Integer warranty) {
        this.warranty = warranty;
    }

    public LocalDate getCreatedDate() {
        return this.createdDate;
    }

    public Product createdDate(LocalDate createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDate getModifiedDate() {
        return this.modifiedDate;
    }

    public Product modifiedDate(LocalDate modifiedDate) {
        this.modifiedDate = modifiedDate;
        return this;
    }

    public void setModifiedDate(LocalDate modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public String getCreatedUser() {
        return this.createdUser;
    }

    public Product createdUser(String createdUser) {
        this.createdUser = createdUser;
        return this;
    }

    public void setCreatedUser(String createdUser) {
        this.createdUser = createdUser;
    }

    public String getModifiedUser() {
        return this.modifiedUser;
    }

    public Product modifiedUser(String modifiedUser) {
        this.modifiedUser = modifiedUser;
        return this;
    }

    public void setModifiedUser(String modifiedUser) {
        this.modifiedUser = modifiedUser;
    }

    public Boolean getStatus() {
        return this.status;
    }

    public Product status(Boolean status) {
        this.status = status;
        return this;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", name='" + getName() + "'" +
            ", quantity=" + getQuantity() +
            ", unitPrice=" + getUnitPrice() +
            ", installment='" + getInstallment() + "'" +
            ", accompanyingProducts='" + getAccompanyingProducts() + "'" +
            ", warranty=" + getWarranty() +
            ", createdDate='" + getCreatedDate() + "'" +
            ", modifiedDate='" + getModifiedDate() + "'" +
            ", createdUser='" + getCreatedUser() + "'" +
            ", modifiedUser='" + getModifiedUser() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
