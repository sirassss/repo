package com.alam.sellphone.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ProductBanner.
 */
@Entity
@Table(name = "productbanner")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ProductBanner implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "productid")
    private Long productID;

    @Column(name = "istop")
    private Boolean isTop;

    @Column(name = "isbottom")
    private Boolean isBottom;

    @Column(name = "istb")
    private Boolean isTB;

    @Column(name = "islistdouble")
    private Boolean isListDouble;

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

    public Boolean getTop() {
        return isTop;
    }

    public void setTop(Boolean top) {
        isTop = top;
    }

    public Boolean getBottom() {
        return isBottom;
    }

    public void setBottom(Boolean bottom) {
        isBottom = bottom;
    }

    public Boolean getListDouble() {
        return isListDouble;
    }

    public void setListDouble(Boolean listDouble) {
        isListDouble = listDouble;
    }

    public Boolean getTB() {
        return isTB;
    }

    public void setTB(Boolean TB) {
        isTB = TB;
    }
}
