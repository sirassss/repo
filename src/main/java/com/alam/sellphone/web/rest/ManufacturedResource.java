package com.alam.sellphone.web.rest;

import com.alam.sellphone.domain.Manufactured;
import com.alam.sellphone.repository.ManufacturedRepository;
import com.alam.sellphone.service.ManufacturedService;
import com.alam.sellphone.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.alam.sellphone.domain.Manufactured}.
 */
@RestController
@RequestMapping("/api")
public class ManufacturedResource {

    private final Logger log = LoggerFactory.getLogger(ManufacturedResource.class);

    private static final String ENTITY_NAME = "manufactured";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ManufacturedService manufacturedService;

    private final ManufacturedRepository manufacturedRepository;

    public ManufacturedResource(ManufacturedService manufacturedService, ManufacturedRepository manufacturedRepository) {
        this.manufacturedService = manufacturedService;
        this.manufacturedRepository = manufacturedRepository;
    }

    /**
     * {@code POST  /manufactureds} : Create a new manufactured.
     *
     * @param manufactured the manufactured to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new manufactured, or with status {@code 400 (Bad Request)} if the manufactured has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/manufactureds")
    public ResponseEntity<Manufactured> createManufactured(@RequestBody Manufactured manufactured) throws URISyntaxException {
        log.debug("REST request to save Manufactured : {}", manufactured);
        if (manufactured.getId() != null) {
            throw new BadRequestAlertException("A new manufactured cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Manufactured result = manufacturedService.save(manufactured);
        return ResponseEntity
            .created(new URI("/api/manufactureds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /manufactureds/:id} : Updates an existing manufactured.
     *
     * @param id the id of the manufactured to save.
     * @param manufactured the manufactured to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated manufactured,
     * or with status {@code 400 (Bad Request)} if the manufactured is not valid,
     * or with status {@code 500 (Internal Server Error)} if the manufactured couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/manufactureds/{id}")
    public ResponseEntity<Manufactured> updateManufactured(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Manufactured manufactured
    ) throws URISyntaxException {
        log.debug("REST request to update Manufactured : {}, {}", id, manufactured);
        if (manufactured.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, manufactured.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!manufacturedRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Manufactured result = manufacturedService.save(manufactured);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, manufactured.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /manufactureds/:id} : Partial updates given fields of an existing manufactured, field will ignore if it is null
     *
     * @param id the id of the manufactured to save.
     * @param manufactured the manufactured to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated manufactured,
     * or with status {@code 400 (Bad Request)} if the manufactured is not valid,
     * or with status {@code 404 (Not Found)} if the manufactured is not found,
     * or with status {@code 500 (Internal Server Error)} if the manufactured couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/manufactureds/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Manufactured> partialUpdateManufactured(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Manufactured manufactured
    ) throws URISyntaxException {
        log.debug("REST request to partial update Manufactured partially : {}, {}", id, manufactured);
        if (manufactured.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, manufactured.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!manufacturedRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Manufactured> result = manufacturedService.partialUpdate(manufactured);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, manufactured.getId().toString())
        );
    }

    /**
     * {@code GET  /manufactureds} : get all the manufactureds.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of manufactureds in body.
     */
    @GetMapping("/manufactureds")
    public ResponseEntity<List<Manufactured>> getAllManufactureds(Pageable pageable) {
        log.debug("REST request to get a page of Manufactureds");
        Page<Manufactured> page = manufacturedService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /manufactureds/:id} : get the "id" manufactured.
     *
     * @param id the id of the manufactured to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the manufactured, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/manufactureds/{id}")
    public ResponseEntity<Manufactured> getManufactured(@PathVariable Long id) {
        log.debug("REST request to get Manufactured : {}", id);
        Optional<Manufactured> manufactured = manufacturedService.findOne(id);
        return ResponseUtil.wrapOrNotFound(manufactured);
    }

    /**
     * {@code DELETE  /manufactureds/:id} : delete the "id" manufactured.
     *
     * @param id the id of the manufactured to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/manufactureds/{id}")
    public ResponseEntity<Void> deleteManufactured(@PathVariable Long id) {
        log.debug("REST request to delete Manufactured : {}", id);
        manufacturedService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
