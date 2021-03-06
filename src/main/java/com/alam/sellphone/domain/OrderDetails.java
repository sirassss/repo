package com.alam.sellphone.domain;

import com.alam.sellphone.service.dto.OrderDetailsDTO;
import com.alam.sellphone.service.dto.ProductDTO;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A OrderDetails.
 */
@Entity
@Table(name = "orderdetail")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SqlResultSetMappings(
    {
        @SqlResultSetMapping(
            name = "OrderDetailsDTO",
            classes = {
                @ConstructorResult(
                    targetClass = OrderDetailsDTO.class,
                    columns = {
                        @ColumnResult(name = "id", type = Long.class),
                        @ColumnResult(name = "productID", type = Long.class),
                        @ColumnResult(name = "orderID", type = Long.class),
                        @ColumnResult(name = "quantity", type = Integer.class),
                        @ColumnResult(name = "unitPrice", type = BigDecimal.class),
                        @ColumnResult(name = "total", type = Integer.class),
                        @ColumnResult(name = "image", type = String.class),
                        @ColumnResult(name = "name", type = String.class),
                    }
                ),
            }
        ),
    }
)
public class OrderDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "productid")
    private Long productID;

    @Column(name = "orderid")
    private Long orderID;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "unitprice", precision = 21, scale = 2)
    private BigDecimal unitPrice;

    @Column(name = "total", precision = 21, scale = 2)
    private BigDecimal total;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public OrderDetails id(Long id) {
        this.id = id;
        return this;
    }

    public Long getProductID() {
        return this.productID;
    }

    public OrderDetails productID(Long productID) {
        this.productID = productID;
        return this;
    }

    public void setProductID(Long productID) {
        this.productID = productID;
    }

    public Long getOrderID() {
        return this.orderID;
    }

    public OrderDetails orderID(Long orderID) {
        this.orderID = orderID;
        return this;
    }

    public void setOrderID(Long orderID) {
        this.orderID = orderID;
    }

    public Integer getQuantity() {
        return this.quantity;
    }

    public OrderDetails quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getUnitPrice() {
        return this.unitPrice;
    }

    public OrderDetails unitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
        return this;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public BigDecimal getTotal() {
        return this.total;
    }

    public OrderDetails total(BigDecimal total) {
        this.total = total;
        return this;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OrderDetails)) {
            return false;
        }
        return id != null && id.equals(((OrderDetails) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OrderDetails{" +
            "id=" + getId() +
            ", productID=" + getProductID() +
            ", orderID=" + getOrderID() +
            ", quantity=" + getQuantity() +
            ", unitPrice=" + getUnitPrice() +
            ", total=" + getTotal() +
            "}";
    }
}
