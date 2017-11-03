package com.mikeias.erestaurante.web.rest;

import com.mikeias.erestaurante.service.PrivilegioService;
import com.mikeias.erestaurante.domain.Cargo;
import com.mikeias.erestaurante.repository.CargoRepository;

import com.codahale.metrics.annotation.Timed;
import com.mikeias.erestaurante.domain.Cliente;

import com.mikeias.erestaurante.repository.ClienteRepository;
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
 * REST controller for managing Cliente.
 */
@RestController
@RequestMapping("/api")
public class ClienteResource {

    private final Logger log = LoggerFactory.getLogger(ClienteResource.class);

    private static final String ENTITY_NAME = "cliente";

    private final ClienteRepository clienteRepository;


//////////////////////////////////REQUER PRIVILEGIOS
                                  private final CargoRepository cargoRepository;

                                  public ClienteResource(ClienteRepository clienteRepository, CargoRepository cargoRepository) {
                                  this.clienteRepository = clienteRepository;
                                  this.cargoRepository = cargoRepository;
                                  }
//////////////////////////////////REQUER PRIVILEGIOS

    /**
     * POST  /clientes : Create a new cliente.
     *
     * @param cliente the cliente to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cliente, or with status 400 (Bad Request) if the cliente has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/clientes")
    @Timed
    public ResponseEntity<Cliente> createCliente(@RequestBody Cliente cliente) throws URISyntaxException {
        log.debug("REST request to save Cliente : {}", cliente);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeCriar(cargoRepository, ENTITY_NAME)) {
                                  log.error("TENTATIVA DE CRIAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME  + " : {}", cliente);
                                  return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para criar esta entidade.")).body(null);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        if (cliente.getId() != null) {
            throw new BadRequestAlertException("A new cliente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cliente result = clienteRepository.save(cliente);
        return ResponseEntity.created(new URI("/api/clientes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /clientes : Updates an existing cliente.
     *
     * @param cliente the cliente to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cliente,
     * or with status 400 (Bad Request) if the cliente is not valid,
     * or with status 500 (Internal Server Error) if the cliente couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/clientes")
    @Timed
    public ResponseEntity<Cliente> updateCliente(@RequestBody Cliente cliente) throws URISyntaxException {
        log.debug("REST request to update Cliente : {}", cliente);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeEditar(cargoRepository, ENTITY_NAME)) {
                                  log.error("TENTATIVA DE EDITAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME  + " : {}", cliente);
                                  return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para editar esta entidade.")).body(null);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        if (cliente.getId() == null) {
            return createCliente(cliente);
        }
        Cliente result = clienteRepository.save(cliente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cliente.getId().toString()))
            .body(result);
    }

    /**
     * GET  /clientes : get all the clientes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of clientes in body
     */
    @GetMapping("/clientes")
    @Timed
    public ResponseEntity<List<Cliente>> getAllClientes(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Clientes");

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
                                  log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME);
                                  return  null;
                                  }

//////////////////////////////////REQUER PRIVILEGIOS
        Page<Cliente> page = clienteRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/clientes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /clientes/:id : get the "id" cliente.
     *
     * @param id the id of the cliente to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cliente, or with status 404 (Not Found)
     */
    @GetMapping("/clientes/{id}")
    @Timed
    public ResponseEntity<Cliente> getCliente(@PathVariable Long id) {
        log.debug("REST request to get Cliente : {}", id);

        Cliente cliente =
            id < 0  ? clienteRepository.findOneByNome("anonimo") : clienteRepository.findOne(id);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
                                  cliente = null;
                                  log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME + " : {}", id);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cliente));
    }

    /**
     * DELETE  /clientes/:id : delete the "id" cliente.
     *
     * @param id the id of the cliente to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/clientes/{id}")
    @Timed
    public ResponseEntity<Void> deleteCliente(@PathVariable Long id) {
        log.debug("REST request to delete Cliente : {}", id);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (PrivilegioService.podeDeletar(cargoRepository, ENTITY_NAME)) {
                                  clienteRepository.delete(id);
                                  } else {
                                  log.error("TENTATIVA DE EXCUIR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME + " : {}", id);
                                  return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para deletar esta entidade.")).body(null);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
