package com.alam.sellphone.service.impl;

import com.alam.sellphone.domain.Manufactured;
import com.alam.sellphone.repository.ManufacturedRepository;
import com.alam.sellphone.service.ManufacturedService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Manufactured}.
 */
@Service
@Transactional
public class ManufacturedServiceImpl implements ManufacturedService {

    private final Logger log = LoggerFactory.getLogger(ManufacturedServiceImpl.class);

    private final ManufacturedRepository manufacturedRepository;

    public ManufacturedServiceImpl(ManufacturedRepository manufacturedRepository) {
        this.manufacturedRepository = manufacturedRepository;
    }

    @Override
    public Manufactured save(Manufactured manufactured) {
        log.debug("Request to save Manufactured : {}", manufactured);
        return manufacturedRepository.save(manufactured);
    }

    @Override
    public Optional<Manufactured> partialUpdate(Manufactured manufactured) {
        log.debug("Request to partially update Manufactured : {}", manufactured);

        return manufacturedRepository
            .findById(manufactured.getId())
            .map(
                existingManufactured -> {
                    if (manufactured.getName() != null) {
                        existingManufactured.setName(manufactured.getName());
                    }
                    if (manufactured.getImage() != null) {
                        existingManufactured.setImage(manufactured.getImage());
                    }
                    if (manufactured.getDescription() != null) {
                        existingManufactured.setDescription(manufactured.getDescription());
                    }

                    return existingManufactured;
                }
            )
            .map(manufacturedRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Manufactured> findAll(Pageable pageable) {
        log.debug("Request to get all Manufactureds");
        return manufacturedRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Manufactured> findOne(Long id) {
        log.debug("Request to get Manufactured : {}", id);
        return manufacturedRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Manufactured : {}", id);
        manufacturedRepository.deleteById(id);
    }
}
