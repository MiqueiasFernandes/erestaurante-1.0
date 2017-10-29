package com.mikeias.erestaurante.web.rest;

import com.mikeias.erestaurante.service.PrivilegioService;
import com.mikeias.erestaurante.domain.Cargo;
import com.mikeias.erestaurante.repository.CargoRepository;

import com.codahale.metrics.annotation.Timed;
import com.mikeias.erestaurante.domain.Nota;

import com.mikeias.erestaurante.repository.NotaRepository;
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
 * REST controller for managing Nota.
 */
@RestController
@RequestMapping("/api")
public class NotaResource {

    private final Logger log = LoggerFactory.getLogger(NotaResource.class);

    private static final String ENTITY_NAME = "nota";

    private final NotaRepository notaRepository;


//////////////////////////////////REQUER PRIVILEGIOS
                                  private final CargoRepository cargoRepository;

                                  public NotaResource(NotaRepository notaRepository, CargoRepository cargoRepository) {
                                  this.notaRepository = notaRepository;
                                  this.cargoRepository = cargoRepository;
                                  }
//////////////////////////////////REQUER PRIVILEGIOS

    /**
     * POST  /notas : Create a new nota.
     *
     * @param nota the nota to create
     * @return the ResponseEntity with status 201 (Created) and with body the new nota, or with status 400 (Bad Request) if the nota has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/notas")
    @Timed
    public ResponseEntity<Nota> createNota(@RequestBody Nota nota) throws URISyntaxException {
        log.debug("REST request to save Nota : {}", nota);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeCriar(cargoRepository, ENTITY_NAME)) {
                                  log.error("TENTATIVA DE CRIAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME  + " : {}", nota);
                                  return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para criar esta entidade.")).body(null);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        if (nota.getId() != null) {
            throw new BadRequestAlertException("A new nota cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Nota result = notaRepository.save(nota);
        return ResponseEntity.created(new URI("/api/notas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /notas : Updates an existing nota.
     *
     * @param nota the nota to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated nota,
     * or with status 400 (Bad Request) if the nota is not valid,
     * or with status 500 (Internal Server Error) if the nota couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/notas")
    @Timed
    public ResponseEntity<Nota> updateNota(@RequestBody Nota nota) throws URISyntaxException {
        log.debug("REST request to update Nota : {}", nota);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeEditar(cargoRepository, ENTITY_NAME)) {
                                  log.error("TENTATIVA DE EDITAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME  + " : {}", nota);
                                  return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para editar esta entidade.")).body(null);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        if (nota.getId() == null) {
            return createNota(nota);
        }
        Nota result = notaRepository.save(nota);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, nota.getId().toString()))
            .body(result);
    }

    /**
     * GET  /notas : get all the notas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of notas in body
     */
    @GetMapping("/notas")
    @Timed
    public ResponseEntity<List<Nota>> getAllNotas(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Notas");

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
                                  log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME);
                                  return  null;
                                  }

//////////////////////////////////REQUER PRIVILEGIOS
        Page<Nota> page = notaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/notas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /notas/:id : get the "id" nota.
     *
     * @param id the id of the nota to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the nota, or with status 404 (Not Found)
     */
    @GetMapping("/notas/{id}")
    @Timed
    public ResponseEntity<Nota> getNota(@PathVariable Long id) {
        log.debug("REST request to get Nota : {}", id);
        Nota nota = notaRepository.findOne(id);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
                                  nota = null;
                                  log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME + " : {}", id);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(nota));
    }

    /**
     * DELETE  /notas/:id : delete the "id" nota.
     *
     * @param id the id of the nota to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/notas/{id}")
    @Timed
    public ResponseEntity<Void> deleteNota(@PathVariable Long id) {
        log.debug("REST request to delete Nota : {}", id);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (PrivilegioService.podeDeletar(cargoRepository, ENTITY_NAME)) {
                                  notaRepository.delete(id);
                                  } else {
                                  log.error("TENTATIVA DE EXCUIR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME + " : {}", id);
                                  return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para deletar esta entidade.")).body(null);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
