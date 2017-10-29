package com.mikeias.erestaurante.web.rest;

import com.mikeias.erestaurante.service.PrivilegioService;
import com.mikeias.erestaurante.domain.Cargo;
import com.mikeias.erestaurante.repository.CargoRepository;

import com.codahale.metrics.annotation.Timed;
import com.mikeias.erestaurante.domain.Imposto;

import com.mikeias.erestaurante.repository.ImpostoRepository;
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
 * REST controller for managing Imposto.
 */
@RestController
@RequestMapping("/api")
public class ImpostoResource {

    private final Logger log = LoggerFactory.getLogger(ImpostoResource.class);

    private static final String ENTITY_NAME = "imposto";

    private final ImpostoRepository impostoRepository;


//////////////////////////////////REQUER PRIVILEGIOS
                                  private final CargoRepository cargoRepository;

                                  public ImpostoResource(ImpostoRepository impostoRepository, CargoRepository cargoRepository) {
                                  this.impostoRepository = impostoRepository;
                                  this.cargoRepository = cargoRepository;
                                  }
//////////////////////////////////REQUER PRIVILEGIOS

    /**
     * POST  /impostos : Create a new imposto.
     *
     * @param imposto the imposto to create
     * @return the ResponseEntity with status 201 (Created) and with body the new imposto, or with status 400 (Bad Request) if the imposto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/impostos")
    @Timed
    public ResponseEntity<Imposto> createImposto(@RequestBody Imposto imposto) throws URISyntaxException {
        log.debug("REST request to save Imposto : {}", imposto);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeCriar(cargoRepository, ENTITY_NAME)) {
                                  log.error("TENTATIVA DE CRIAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME  + " : {}", imposto);
                                  return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para criar esta entidade.")).body(null);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        if (imposto.getId() != null) {
            throw new BadRequestAlertException("A new imposto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Imposto result = impostoRepository.save(imposto);
        return ResponseEntity.created(new URI("/api/impostos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /impostos : Updates an existing imposto.
     *
     * @param imposto the imposto to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated imposto,
     * or with status 400 (Bad Request) if the imposto is not valid,
     * or with status 500 (Internal Server Error) if the imposto couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/impostos")
    @Timed
    public ResponseEntity<Imposto> updateImposto(@RequestBody Imposto imposto) throws URISyntaxException {
        log.debug("REST request to update Imposto : {}", imposto);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeEditar(cargoRepository, ENTITY_NAME)) {
                                  log.error("TENTATIVA DE EDITAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME  + " : {}", imposto);
                                  return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para editar esta entidade.")).body(null);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        if (imposto.getId() == null) {
            return createImposto(imposto);
        }
        Imposto result = impostoRepository.save(imposto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, imposto.getId().toString()))
            .body(result);
    }

    /**
     * GET  /impostos : get all the impostos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of impostos in body
     */
    @GetMapping("/impostos")
    @Timed
    public ResponseEntity<List<Imposto>> getAllImpostos(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Impostos");

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
                                  log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME);
                                  return  null;
                                  }

//////////////////////////////////REQUER PRIVILEGIOS
        Page<Imposto> page = impostoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/impostos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /impostos/:id : get the "id" imposto.
     *
     * @param id the id of the imposto to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the imposto, or with status 404 (Not Found)
     */
    @GetMapping("/impostos/{id}")
    @Timed
    public ResponseEntity<Imposto> getImposto(@PathVariable Long id) {
        log.debug("REST request to get Imposto : {}", id);
        Imposto imposto = impostoRepository.findOne(id);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
                                  imposto = null;
                                  log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME + " : {}", id);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(imposto));
    }

    /**
     * DELETE  /impostos/:id : delete the "id" imposto.
     *
     * @param id the id of the imposto to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/impostos/{id}")
    @Timed
    public ResponseEntity<Void> deleteImposto(@PathVariable Long id) {
        log.debug("REST request to delete Imposto : {}", id);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (PrivilegioService.podeDeletar(cargoRepository, ENTITY_NAME)) {
                                  impostoRepository.delete(id);
                                  } else {
                                  log.error("TENTATIVA DE EXCUIR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME + " : {}", id);
                                  return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para deletar esta entidade.")).body(null);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
