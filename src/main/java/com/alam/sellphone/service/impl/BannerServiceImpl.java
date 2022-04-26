package com.alam.sellphone.service.impl;

import com.alam.sellphone.domain.Banner;
import com.alam.sellphone.domain.Product;
import com.alam.sellphone.domain.ProductBanner;
import com.alam.sellphone.repository.BannerRepository;
import com.alam.sellphone.repository.ProductRepository;
import com.alam.sellphone.service.BannerService;
import com.alam.sellphone.web.rest.dto.ListBanner;
import com.alam.sellphone.web.rest.errors.BadRequestAlertException;
import com.tngtech.archunit.thirdparty.com.google.common.collect.Lists;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Banner}.
 */
@Service
@Transactional
public class BannerServiceImpl implements BannerService {

    private final Logger log = LoggerFactory.getLogger(BannerServiceImpl.class);

    private final BannerRepository bannerRepository;

    private final ProductRepository productRepository;

    public BannerServiceImpl(BannerRepository bannerRepository, ProductRepository productRepository) {
        this.bannerRepository = bannerRepository;
        this.productRepository = productRepository;
    }

    @Override
    public Banner save(Banner banner) {
        log.debug("Request to save Banner : {}", banner);
        return bannerRepository.save(banner);
    }

    @Override
    public Optional<Banner> partialUpdate(Banner banner) {
        log.debug("Request to partially update Banner : {}", banner);

        return bannerRepository
            .findById(banner.getId())
            .map(
                existingBanner -> {
                    if (banner.getTypeID() != null) {
                        existingBanner.setTypeID(banner.getTypeID());
                    }
                    if (banner.getStatus() != null) {
                        existingBanner.setStatus(banner.getStatus());
                    }

                    return existingBanner;
                }
            )
            .map(bannerRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Banner> findAll(Pageable pageable) {
        log.debug("Request to get all Banners");
        return bannerRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Banner> findOne(Long id) {
        log.debug("Request to get Banner : {}", id);
        return bannerRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Banner : {}", id);
        bannerRepository.deleteById(id);
    }

    @Override
    public ListBanner getListBanner() {
        List<Product> productList = productRepository.getListBanner();
        ListBanner listBanner = new ListBanner();
        List<Product> lstDouble = new ArrayList<>();
        productList.forEach(
            n -> {
                List<ProductBanner> setVt = new ArrayList<>(n.getProductBanners());
                if (setVt.size() > 0) {
                    if (setVt.get(0).getTop()) {
                        listBanner.setProductTop(n);
                    } else if (setVt.get(0).getBottom()) {
                        listBanner.setProductBottom(n);
                    } else if (setVt.get(0).getListDouble()) {
                        lstDouble.add(n);
                    }
                }
            }
        );
        listBanner.setListProduct(Lists.partition(lstDouble, 2));
        return listBanner;
    }
}
