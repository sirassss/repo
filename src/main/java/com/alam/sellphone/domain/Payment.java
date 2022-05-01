package com.alam.sellphone.domain;

import com.alam.sellphone.service.dto.PaymentDTO;
import com.alam.sellphone.service.dto.ProductDTO;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Payment.
 */
@Entity
@Table(name = "payment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SqlResultSetMappings(
    {
        @SqlResultSetMapping(
            name = "PaymentDTO",
            classes = {
                @ConstructorResult(
                    targetClass = PaymentDTO.class,
                    columns = {
                        @ColumnResult(name = "id", type = Long.class),
                        @ColumnResult(name = "userFirstName", type = String.class),
                        @ColumnResult(name = "userLastName", type = String.class),
                        @ColumnResult(name = "orderAddress", type = String.class),
                        @ColumnResult(name = "orderPhone", type = String.class),
                        @ColumnResult(name = "totalAmount", type = BigDecimal.class),
                        @ColumnResult(name = "createdDate", type = LocalDate.class),
                        @ColumnResult(name = "status", type = Integer.class),
                        @ColumnResult(name = "orderID", type = Long.class),
                        @ColumnResult(name = "bankID", type = Long.class),
                    }
                ),
            }
        ),
    }
)
public class Payment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "orderid")
    private Long orderID;

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

    public Long getOrderID() {
        return orderID;
    }

    public void setOrderID(Long orderID) {
        this.orderID = orderID;
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
        return status;
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
            ", orderDetailID=" + getOrderID() +
            ", bankID=" + getBankID() +
            ", status=" + getStatus() +
            "}";
    }
}
