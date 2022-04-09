package com.alam.sellphone.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Voucher.
 */
@Entity
@Table(name = "voucher")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Voucher implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "vouchercode")
    private String voucherCode;

    @Column(name = "productid")
    private Long productID;

    @Column(name = "promotionprice", precision = 21, scale = 2)
    private BigDecimal promotionPrice;

    @Column(name = "dateissue")
    private LocalDate dateIssue;

    @Column(name = "status")
    private Integer status;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Voucher id(Long id) {
        this.id = id;
        return this;
    }

    public String getVoucherCode() {
        return this.voucherCode;
    }

    public Voucher voucherCode(String voucherCode) {
        this.voucherCode = voucherCode;
        return this;
    }

    public void setVoucherCode(String voucherCode) {
        this.voucherCode = voucherCode;
    }

    public Long getProductID() {
        return this.productID;
    }

    public Voucher productID(Long productID) {
        this.productID = productID;
        return this;
    }

    public void setProductID(Long productID) {
        this.productID = productID;
    }

    public BigDecimal getPromotionPrice() {
        return this.promotionPrice;
    }

    public Voucher promotionPrice(BigDecimal promotionPrice) {
        this.promotionPrice = promotionPrice;
        return this;
    }

    public void setPromotionPrice(BigDecimal promotionPrice) {
        this.promotionPrice = promotionPrice;
    }

    public LocalDate getDateIssue() {
        return this.dateIssue;
    }

    public Voucher dateIssue(LocalDate dateIssue) {
        this.dateIssue = dateIssue;
        return this;
    }

    public void setDateIssue(LocalDate dateIssue) {
        this.dateIssue = dateIssue;
    }

    public Integer getStatus() {
        return this.status;
    }

    public Voucher status(Integer status) {
        this.status = status;
        return this;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Voucher)) {
            return false;
        }
        return id != null && id.equals(((Voucher) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Voucher{" +
            "id=" + getId() +
            ", voucherCode='" + getVoucherCode() + "'" +
            ", productID=" + getProductID() +
            ", promotionPrice=" + getPromotionPrice() +
            ", dateIssue='" + getDateIssue() + "'" +
            ", status=" + getStatus() +
            "}";
    }
}
