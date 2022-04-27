package com.alam.sellphone.web.rest.dto;

import com.alam.sellphone.domain.Manufactured;
import com.alam.sellphone.domain.Product;
import com.alam.sellphone.service.dto.ManufacturedDTO;
import java.util.List;

public class ListBanner {

    private Product productTop;

    private Product productBottom;

    private Product productTB;

    private List<Product> listProduct;

    private List<List<Product>> listProduct2;

    private List<ManufacturedDTO> listManufacturer;

    public ListBanner() {}

    public ListBanner(Product productTop, Product productBottom, List<Product> listProduct) {
        this.productTop = productTop;
        this.productBottom = productBottom;
        this.listProduct = listProduct;
    }

    public Product getProductTop() {
        return productTop;
    }

    public void setProductTop(Product productTop) {
        this.productTop = productTop;
    }

    public Product getProductBottom() {
        return productBottom;
    }

    public void setProductBottom(Product productBottom) {
        this.productBottom = productBottom;
    }

    public List<Product> getListProduct() {
        return listProduct;
    }

    public void setListProduct(List<Product> listProduct) {
        this.listProduct = listProduct;
    }

    public List<List<Product>> getListProduct2() {
        return listProduct2;
    }

    public void setListProduct2(List<List<Product>> listProduct2) {
        this.listProduct2 = listProduct2;
    }

    public List<ManufacturedDTO> getListManufacturer() {
        return listManufacturer;
    }

    public void setListManufacturer(List<ManufacturedDTO> listManufacturer) {
        this.listManufacturer = listManufacturer;
    }

    public Product getProductTB() {
        return productTB;
    }

    public void setProductTB(Product productTB) {
        this.productTB = productTB;
    }
}
