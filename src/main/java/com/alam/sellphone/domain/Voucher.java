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

    @Column(name = "promotionrate", precision = 21, scale = 2)
    private BigDecimal promotionRate;

    @Column(name = "dateissue")
    private Integer dateIssue;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "userid")
    private Long userID;

    @Column(name = "description")
    private String description;

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

    public Integer getDateIssue() {
        return this.dateIssue;
    }

    public Voucher dateIssue(Integer dateIssue) {
        this.dateIssue = dateIssue;
        return this;
    }

    public void setDateIssue(Integer dateIssue) {
        this.dateIssue = dateIssue;
    }

    public Boolean getStatus() {
        return status;
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
            ", promotionPrice=" + getPromotionRate() +
            ", dateIssue='" + getDateIssue() + "'" +
            ", status=" + getStatus() +
            "}";
    }

    public Long getUserID() {
        return userID;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public BigDecimal getPromotionRate() {
        return promotionRate;
    }

    public void setPromotionRate(BigDecimal promotionRate) {
        this.promotionRate = promotionRate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
