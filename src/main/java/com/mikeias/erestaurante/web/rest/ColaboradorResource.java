package com.mikeias.erestaurante.web.rest;

import com.google.common.collect.Iterables;
import com.mikeias.erestaurante.domain.enumeration.CargoTipo;
import com.mikeias.erestaurante.service.PrivilegioService;
import com.mikeias.erestaurante.domain.Cargo;
import com.mikeias.erestaurante.repository.CargoRepository;

import com.codahale.metrics.annotation.Timed;
import com.mikeias.erestaurante.domain.Colaborador;

import com.mikeias.erestaurante.repository.ColaboradorRepository;
import com.mikeias.erestaurante.service.UserService;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Colaborador.
 */
@RestController
@RequestMapping("/api")
public class ColaboradorResource {

    private final Logger log = LoggerFactory.getLogger(ColaboradorResource.class);

    private static final String ENTITY_NAME = "colaborador";

    private final ColaboradorRepository colaboradorRepository;

    private final UserService userService;


    //////////////////////////////////REQUER PRIVILEGIOS
    private final CargoRepository cargoRepository;

    public ColaboradorResource(ColaboradorRepository colaboradorRepository, UserService userService, CargoRepository cargoRepository) {
        this.colaboradorRepository = colaboradorRepository;
        this.userService = userService;
        this.cargoRepository = cargoRepository;
    }
//////////////////////////////////REQUER PRIVILEGIOS

    /**
     * POST  /colaboradors : Create a new colaborador.
     *
     * @param colaborador the colaborador to create
     * @return the ResponseEntity with status 201 (Created) and with body the new colaborador, or with status 400 (Bad Request) if the colaborador has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/colaboradors")
    @Timed
    public ResponseEntity<Colaborador> createColaborador(@Valid @RequestBody Colaborador colaborador) throws URISyntaxException {
        log.debug("REST request to save Colaborador : {}", colaborador);

//////////////////////////////////REQUER PRIVILEGIOS
        if (!PrivilegioService.podeCriar(cargoRepository, ENTITY_NAME)) {
            log.error("TENTATIVA DE CRIAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME + " : {}", colaborador);
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para criar esta entidade.")).body(null);
        }
//////////////////////////////////REQUER PRIVILEGIOS
        if (colaborador.getId() != null) {
            throw new BadRequestAlertException("A new colaborador cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Colaborador result = colaboradorRepository.save(colaborador);

        ////ativar o usuario
        if (result != null) {
            this.userService.getUserWithAuthoritiesByLogin(
                colaborador.getUsuario().getLogin()
            ).ifPresent(user -> {
                this.userService.activateRegistration(user.getActivationKey());
            });
        }

        return ResponseEntity.created(new URI("/api/colaboradors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /colaboradors : Updates an existing colaborador.
     *
     * @param colaborador the colaborador to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated colaborador,
     * or with status 400 (Bad Request) if the colaborador is not valid,
     * or with status 500 (Internal Server Error) if the colaborador couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/colaboradors")
    @Timed
    public ResponseEntity<Colaborador> updateColaborador(@Valid @RequestBody Colaborador colaborador) throws URISyntaxException {
        log.debug("REST request to update Colaborador : {}", colaborador);

//////////////////////////////////REQUER PRIVILEGIOS
        if (!PrivilegioService.podeEditar(cargoRepository, ENTITY_NAME)) {
            log.error("TENTATIVA DE EDITAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME + " : {}", colaborador);
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para editar esta entidade.")).body(null);
        }
//////////////////////////////////REQUER PRIVILEGIOS
        if (colaborador.getId() == null) {
            return createColaborador(colaborador);
        }
        Colaborador result = colaboradorRepository.save(colaborador);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, colaborador.getId().toString()))
            .body(result);
    }

    /**
     * GET  /colaboradors : get all the colaboradors.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of colaboradors in body
     */
    @GetMapping("/colaboradors")
    @Timed
    public ResponseEntity<List<Colaborador>> getAllColaboradors(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Colaboradors");


//////////////////////////////////REQUER PRIVILEGIOS
        if (PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
            Page<Colaborador> page = colaboradorRepository.findAll(pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/colaboradors");
            return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);

        }
//////////////////////////////////REQUER PRIVILEGIOS
        return ResponseEntity.badRequest()
            .headers(HeaderUtil
                .createFailureAlert(ENTITY_NAME,
                    "privilegios insuficientes.",
                    "Este usuario não possui privilegios sufuentes " +
                        "para ver/listar esta entidade.")).body(null);
    }

    /**
     * GET  /colaboradors/:id : get the "id" colaborador.
     *
     * @param id the id of the colaborador to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the colaborador, or with status 404 (Not Found)
     */
    @GetMapping("/colaboradors/{id}")
    @Timed
    public ResponseEntity<Colaborador> getColaborador(@PathVariable Long id) {
        log.debug("REST request to get Colaborador : {}", id);


        if (id < 0) {
            log.debug("REST request to get Current colaborador : {}", id);
            return ResponseUtil.wrapOrNotFound(
                Optional.ofNullable(colaboradorRepository.findByUsuarioIsCurrentUser()));
        }


        Colaborador colaborador = colaboradorRepository.findOneWithEagerRelationships(id);


//////////////////////////////////REQUER PRIVILEGIOS
        if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
            colaborador = null;
            log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME + " : {}", id);
        }
//////////////////////////////////REQUER PRIVILEGIOS
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(colaborador));
    }

    /**
     * DELETE  /colaboradors/:id : delete the "id" colaborador.
     *
     * @param id the id of the colaborador to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/colaboradors/{id}")
    @Timed
    public ResponseEntity<Void> deleteColaborador(@PathVariable Long id) {
        log.debug("REST request to delete Colaborador : {}", id);

//////////////////////////////////REQUER PRIVILEGIOS
        if (PrivilegioService.podeDeletar(cargoRepository, ENTITY_NAME)) {
            colaboradorRepository.delete(id);
        } else {
            log.error("TENTATIVA DE EXCUIR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME + " : {}", id);
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para deletar esta entidade.")).body(null);
        }
//////////////////////////////////REQUER PRIVILEGIOS
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }


    @GetMapping("/colaboradors/cargo/{cargo}")
    @Timed
    public ResponseEntity<List<Colaborador>> getColaboradorByCargo(@PathVariable String cargo) {
        log.debug("REST request to get Colaborador by cargo: {}", cargo);


//////////////////////////////////REQUER PRIVILEGIOS
        if (PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
            List<Colaborador> colaboradores = colaboradorRepository.findAllWithEagerRelationships();

            colaboradores.removeIf(c -> {
                for (Cargo a : c.getCargos())
                    if (a.getTipo().toString().equals(cargo))
                        return false;
                return true;
            });


            return new ResponseEntity<>(colaboradores, HttpStatus.OK);

        }
//////////////////////////////////REQUER PRIVILEGIOS
        return ResponseEntity.badRequest()
            .headers(HeaderUtil
                .createFailureAlert(ENTITY_NAME,
                    "privilegios insuficientes.",
                    "Este usuario não possui privilegios sufuentes " +
                        "para ver/listar esta entidade.")).body(null);
    }
}
