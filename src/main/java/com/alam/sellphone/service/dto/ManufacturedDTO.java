package com.alam.sellphone.service.dto;

public class ManufacturedDTO {

    private Long id;

    private String name;

    private String image;

    private String description;

    private Integer bannerID;

    public ManufacturedDTO(Long id, String name, String image, String description, Integer bannerID) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.bannerID = bannerID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getBannerID() {
        return bannerID;
    }

    public void setBannerID(Integer bannerID) {
        this.bannerID = bannerID;
    }
}
