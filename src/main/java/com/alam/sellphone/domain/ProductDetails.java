package com.alam.sellphone.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ProductDetails.
 */
@Entity
@Table(name = "productdetail")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ProductDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "productid")
    private Long productID;

    @Column(name = "manufacturerid")
    private Long manufacturerID;

    @Column(name = "capacity")
    private String capacity;

    @Column(name = "screen")
    private String screen;

    @Column(name = "camera")
    private String camera;

    @Column(name = "osandcpu")
    private String oSAndCPU;

    @Column(name = "pin")
    private String pIN;

    @Column(name = "imageurl")
    private String imageUrl;

    @Column(name = "color")
    private String color;

    @Column(name = "description")
    private String description;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProductDetails id(Long id) {
        this.id = id;
        return this;
    }

    public Long getProductID() {
        return this.productID;
    }

    public ProductDetails productID(Long productID) {
        this.productID = productID;
        return this;
    }

    public void setProductID(Long productID) {
        this.productID = productID;
    }

    public Long getManufacturerID() {
        return this.manufacturerID;
    }

    public ProductDetails manufacturerID(Long manufacturerID) {
        this.manufacturerID = manufacturerID;
        return this;
    }

    public void setManufacturerID(Long manufacturerID) {
        this.manufacturerID = manufacturerID;
    }

    public String getCapacity() {
        return this.capacity;
    }

    public ProductDetails capacity(String capacity) {
        this.capacity = capacity;
        return this;
    }

    public void setCapacity(String capacity) {
        this.capacity = capacity;
    }

    public String getScreen() {
        return this.screen;
    }

    public ProductDetails screen(String screen) {
        this.screen = screen;
        return this;
    }

    public void setScreen(String screen) {
        this.screen = screen;
    }

    public String getCamera() {
        return this.camera;
    }

    public ProductDetails camera(String camera) {
        this.camera = camera;
        return this;
    }

    public void setCamera(String camera) {
        this.camera = camera;
    }

    public String getoSAndCPU() {
        return this.oSAndCPU;
    }

    public ProductDetails oSAndCPU(String oSAndCPU) {
        this.oSAndCPU = oSAndCPU;
        return this;
    }

    public void setoSAndCPU(String oSAndCPU) {
        this.oSAndCPU = oSAndCPU;
    }

    public String getpIN() {
        return this.pIN;
    }

    public ProductDetails pIN(String pIN) {
        this.pIN = pIN;
        return this;
    }

    public void setpIN(String pIN) {
        this.pIN = pIN;
    }

    public String getImageUrl() {
        return this.imageUrl;
    }

    public ProductDetails imageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        return this;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getColor() {
        return this.color;
    }

    public ProductDetails color(String color) {
        this.color = color;
        return this;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getDescription() {
        return this.description;
    }

    public ProductDetails description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProductDetails)) {
            return false;
        }
        return id != null && id.equals(((ProductDetails) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProductDetails{" +
            "id=" + getId() +
            ", productID=" + getProductID() +
            ", manufacturerID=" + getManufacturerID() +
            ", capacity='" + getCapacity() + "'" +
            ", screen='" + getScreen() + "'" +
            ", camera='" + getCamera() + "'" +
            ", oSAndCPU='" + getoSAndCPU() + "'" +
            ", pIN='" + getpIN() + "'" +
            ", imageUrl='" + getImageUrl() + "'" +
            ", color='" + getColor() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
