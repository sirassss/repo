package com.alam.sellphone.service;

import com.alam.sellphone.domain.Banner;
import com.alam.sellphone.web.rest.dto.ListBanner;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Banner}.
 */
public interface BannerService {
    /**
     * Save a banner.
     *
     * @param banner the entity to save.
     * @return the persisted entity.
     */
    Banner save(Banner banner);

    /**
     * Partially updates a banner.
     *
     * @param banner the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Banner> partialUpdate(Banner banner);

    /**
     * Get all the banners.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Banner> findAll(Pageable pageable);

    /**
     * Get the "id" banner.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Banner> findOne(Long id);

    /**
     * Delete the "id" banner.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    ListBanner getListPro2(Integer typeID);

    ListBanner getListPro(Integer typeID);
}
