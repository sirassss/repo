package com.alam.sellphone.domain;

import com.alam.sellphone.service.dto.ProductDTO;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SqlResultSetMappings(
    {
        @SqlResultSetMapping(
            name = "ProductDTO",
            classes = {
                @ConstructorResult(
                    targetClass = ProductDTO.class,
                    columns = {
                        @ColumnResult(name = "id", type = Long.class),
                        @ColumnResult(name = "image", type = String.class),
                        @ColumnResult(name = "code", type = String.class),
                        @ColumnResult(name = "name", type = String.class),
                        @ColumnResult(name = "quantity", type = Integer.class),
                        @ColumnResult(name = "unitPrice", type = BigDecimal.class),
                        @ColumnResult(name = "installment", type = Integer.class),
                        @ColumnResult(name = "nameManufacturer", type = String.class),
                        @ColumnResult(name = "createdDate", type = LocalDate.class),
                    }
                ),
            }
        ),
    }
)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "unitprice", precision = 21, scale = 2)
    private BigDecimal unitPrice;

    @Column(name = "installment")
    private Integer installment;

    @Column(name = "accompanyingproducts")
    private String accompanyingProducts;

    @Column(name = "warranty")
    private Integer warranty;

    @Column(name = "createddate")
    private LocalDate createdDate;

    @Column(name = "modifieddate")
    private LocalDate modifiedDate;

    @Column(name = "createduser")
    private String createdUser;

    @Column(name = "modifieduser")
    private String modifiedUser;

    @Column(name = "rate")
    private Integer rate;

    @Column(name = "typeid")
    private Long typeID;

    @Column(name = "bannerid")
    private Long bannerID;

    @Column(name = "isnew")
    private Boolean isNew;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "productid")
    private Set<ProductDetails> productDetails = new HashSet<>();

    @OneToMany(cascade = { CascadeType.ALL }, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "productid")
    private Set<Voucher> vouchers = new HashSet<>();

    @OneToMany(cascade = { CascadeType.ALL }, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "productid")
    private Set<ProductBanner> productBanners = new HashSet<>();

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

    public Long getTypeID() {
        return typeID;
    }

    public void setTypeID(Long typeID) {
        this.typeID = typeID;
    }

    public Long getBannerID() {
        return bannerID;
    }

    public void setBannerID(Long bannerID) {
        this.bannerID = bannerID;
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

    public Integer getInstallment() {
        return installment;
    }

    public void setInstallment(Integer installment) {
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

    public Set<ProductDetails> getProductDetails() {
        return productDetails;
    }

    public void setProductDetails(Set<ProductDetails> productDetails) {
        this.productDetails = productDetails;
    }

    public Set<Voucher> getVouchers() {
        return vouchers;
    }

    public void setVouchers(Set<Voucher> vouchers) {
        this.vouchers = vouchers;
    }

    public Boolean getNew() {
        return isNew;
    }

    public void setNew(Boolean aNew) {
        isNew = aNew;
    }

    public Set<ProductBanner> getProductBanners() {
        return productBanners;
    }

    public void setProductBanners(Set<ProductBanner> productBanners) {
        this.productBanners = productBanners;
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
            "}";
    }

    public Integer getRate() {
        return rate;
    }

    public void setRate(Integer rate) {
        this.rate = rate;
    }
}
