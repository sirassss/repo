package com.alam.sellphone.domain;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Order.
 */
@Entity
@Table(name = "cart")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "userid")
    private Long userID;

    @Column(name = "createddate")
    private LocalDate createdDate;

    @Column(name = "orderaddress")
    private String orderAddress;

    @Column(name = "orderphone")
    private String orderPhone;

    @Column(name = "status")
    private Boolean status;

    @OneToMany(cascade = { CascadeType.ALL }, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "orderid")
    private List<OrderDetails> orderDetails = new ArrayList<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Order id(Long id) {
        this.id = id;
        return this;
    }

    public Long getUserID() {
        return this.userID;
    }

    public Order userID(Long userID) {
        this.userID = userID;
        return this;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public LocalDate getCreatedDate() {
        return this.createdDate;
    }

    public Order createdDate(LocalDate createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public String getOrderAddress() {
        return this.orderAddress;
    }

    public Order orderAddress(String orderAddress) {
        this.orderAddress = orderAddress;
        return this;
    }

    public void setOrderAddress(String orderAddress) {
        this.orderAddress = orderAddress;
    }

    public String getOrderPhone() {
        return this.orderPhone;
    }

    public Order orderPhone(String orderPhone) {
        this.orderPhone = orderPhone;
        return this;
    }

    public void setOrderPhone(String orderPhone) {
        this.orderPhone = orderPhone;
    }

    public Boolean getStatus() {
        return this.status;
    }

    public Order status(Boolean status) {
        this.status = status;
        return this;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public List<OrderDetails> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<OrderDetails> orderDetails) {
        this.orderDetails = orderDetails;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Order)) {
            return false;
        }
        return id != null && id.equals(((Order) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Order{" +
            "id=" + getId() +
            ", userID=" + getUserID() +
            ", createdDate='" + getCreatedDate() + "'" +
            ", orderAddress='" + getOrderAddress() + "'" +
            ", orderPhone='" + getOrderPhone() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
