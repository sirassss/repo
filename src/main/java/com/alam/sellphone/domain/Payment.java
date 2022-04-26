package com.alam.sellphone.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Payment.
 */
@Entity
@Table(name = "payment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Payment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "orderdetailid")
    private Long orderDetailID;

    @Column(name = "bankid")
    private Long bankID;

    @Column(name = "status")
    private Integer status;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Payment id(Long id) {
        this.id = id;
        return this;
    }

    public Long getOrderDetailID() {
        return this.orderDetailID;
    }

    public Payment orderDetailID(Long orderDetailID) {
        this.orderDetailID = orderDetailID;
        return this;
    }

    public void setOrderDetailID(Long orderDetailID) {
        this.orderDetailID = orderDetailID;
    }

    public Long getBankID() {
        return this.bankID;
    }

    public Payment bankID(Long bankID) {
        this.bankID = bankID;
        return this;
    }

    public void setBankID(Long bankID) {
        this.bankID = bankID;
    }

    public Integer getStatus() {
        return this.status;
    }

    public Payment status(Integer status) {
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
        if (!(o instanceof Payment)) {
            return false;
        }
        return id != null && id.equals(((Payment) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Payment{" +
            "id=" + getId() +
            ", orderDetailID=" + getOrderDetailID() +
            ", bankID=" + getBankID() +
            ", status=" + getStatus() +
            "}";
    }
}
