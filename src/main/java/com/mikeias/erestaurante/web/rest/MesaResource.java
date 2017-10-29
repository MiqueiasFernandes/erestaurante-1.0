package com.mikeias.erestaurante.web.rest;

import com.mikeias.erestaurante.service.PrivilegioService;
import com.mikeias.erestaurante.domain.Cargo;
import com.mikeias.erestaurante.repository.CargoRepository;

import com.codahale.metrics.annotation.Timed;
import com.mikeias.erestaurante.domain.Mesa;

import com.mikeias.erestaurante.repository.MesaRepository;
import com.mikeias.erestaurante.web.rest.errors.BadRequestAlertException;
import com.mikeias.erestaurante.web.rest.util.HeaderUtil;
import com.mikeias.erestaurante.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Mesa.
 */
@RestController
@RequestMapping("/api")
public class MesaResource {

    private final Logger log = LoggerFactory.getLogger(MesaResource.class);

    private static final String ENTITY_NAME = "mesa";

    private final MesaRepository mesaRepository;


//////////////////////////////////REQUER PRIVILEGIOS
                                  private final CargoRepository cargoRepository;

                                  public MesaResource(MesaRepository mesaRepository, CargoRepository cargoRepository) {
                                  this.mesaRepository = mesaRepository;
                                  this.cargoRepository = cargoRepository;
                                  }
//////////////////////////////////REQUER PRIVILEGIOS

    /**
     * POST  /mesas : Create a new mesa.
     *
     * @param mesa the mesa to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mesa, or with status 400 (Bad Request) if the mesa has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mesas")
    @Timed
    public ResponseEntity<Mesa> createMesa(@RequestBody Mesa mesa) throws URISyntaxException {
        log.debug("REST request to save Mesa : {}", mesa);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeCriar(cargoRepository, ENTITY_NAME)) {
                                  log.error("TENTATIVA DE CRIAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME  + " : {}", mesa);
                                  return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para criar esta entidade.")).body(null);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        if (mesa.getId() != null) {
            throw new BadRequestAlertException("A new mesa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Mesa result = mesaRepository.save(mesa);
        return ResponseEntity.created(new URI("/api/mesas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mesas : Updates an existing mesa.
     *
     * @param mesa the mesa to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mesa,
     * or with status 400 (Bad Request) if the mesa is not valid,
     * or with status 500 (Internal Server Error) if the mesa couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mesas")
    @Timed
    public ResponseEntity<Mesa> updateMesa(@RequestBody Mesa mesa) throws URISyntaxException {
        log.debug("REST request to update Mesa : {}", mesa);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeEditar(cargoRepository, ENTITY_NAME)) {
                                  log.error("TENTATIVA DE EDITAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME  + " : {}", mesa);
                                  return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para editar esta entidade.")).body(null);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        if (mesa.getId() == null) {
            return createMesa(mesa);
        }
        Mesa result = mesaRepository.save(mesa);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mesa.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mesas : get all the mesas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of mesas in body
     */
    @GetMapping("/mesas")
    @Timed
    public ResponseEntity<List<Mesa>> getAllMesas(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Mesas");

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
                                  log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME);
                                  return  null;
                                  }

//////////////////////////////////REQUER PRIVILEGIOS
        Page<Mesa> page = mesaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/mesas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /mesas/:id : get the "id" mesa.
     *
     * @param id the id of the mesa to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mesa, or with status 404 (Not Found)
     */
    @GetMapping("/mesas/{id}")
    @Timed
    public ResponseEntity<Mesa> getMesa(@PathVariable Long id) {
        log.debug("REST request to get Mesa : {}", id);
        Mesa mesa = mesaRepository.findOne(id);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
                                  mesa = null;
                                  log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME + " : {}", id);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mesa));
    }

    /**
     * DELETE  /mesas/:id : delete the "id" mesa.
     *
     * @param id the id of the mesa to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mesas/{id}")
    @Timed
    public ResponseEntity<Void> deleteMesa(@PathVariable Long id) {
        log.debug("REST request to delete Mesa : {}", id);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (PrivilegioService.podeDeletar(cargoRepository, ENTITY_NAME)) {
                                  mesaRepository.delete(id);
                                  } else {
                                  log.error("TENTATIVA DE EXCUIR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME + " : {}", id);
                                  return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para deletar esta entidade.")).body(null);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
