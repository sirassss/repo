package com.alam.sellphone.web.rest.dto;

import com.alam.sellphone.domain.Product;
import java.util.List;

public class ListBanner {

    private Product productTop;

    private Product productBottom;

    private List<Product> listProduct;

    private List<List<Product>> listProduct2;

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
}
