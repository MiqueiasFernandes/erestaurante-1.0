package com.mikeias.erestaurante.web.rest;

import com.mikeias.erestaurante.repository.*;
import com.mikeias.erestaurante.service.PrivilegioService;
import com.mikeias.erestaurante.domain.Cargo;

import com.codahale.metrics.annotation.Timed;
import com.mikeias.erestaurante.domain.Venda;
import com.mikeias.erestaurante.web.rest.util.DoubleUtil;
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

import java.util.List;
import java.util.Optional;
import java.time.ZonedDateTime;

/**
 * REST controller for managing Venda.
 */
@RestController
@RequestMapping("/api")
public class VendaResource {

    private final Logger log = LoggerFactory.getLogger(VendaResource.class);

    private static final String ENTITY_NAME = "venda";

    private final VendaRepository vendaRepository;
    private final LancamentoRepository lancamentoRepository;
    private final ComandaRepository comandaRepository;
    private final ProdutoRepository produtoRepository;


//////////////////////////////////REQUER PRIVILEGIOS
                                  private final CargoRepository cargoRepository;

                                  public VendaResource(
                                      VendaRepository vendaRepository,
                                      CargoRepository cargoRepository,
                                      LancamentoRepository lancamentoRepository,
                                      ComandaRepository comandaRepository,
                                      ProdutoRepository produtoRepository) {
                                  this.vendaRepository = vendaRepository;
                                  this.cargoRepository = cargoRepository;
                                      this.lancamentoRepository = lancamentoRepository;
                                      this.comandaRepository = comandaRepository;
                                      this.produtoRepository =  produtoRepository;
                                  }
//////////////////////////////////REQUER PRIVILEGIOS

    /**
     * POST  /vendas : Create a new venda.
     *
     * @param venda the venda to create
     * @return the ResponseEntity with status 201 (Created) and with body the new venda, or with status 400 (Bad Request) if the venda has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/vendas")
    @Timed
    public ResponseEntity<Venda> createVenda(@Valid @RequestBody Venda venda) throws URISyntaxException {
        log.debug("REST request to save Venda : {}", venda);

        venda = DoubleUtil.handleVenda(venda);
        venda.setData(ZonedDateTime.now());

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeCriar(cargoRepository, ENTITY_NAME)) {
                                  log.error("TENTATIVA DE CRIAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME  + " : {}", venda);
                                  return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para criar esta entidade.")).body(null);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        if (venda.getId() != null) {
            throw new BadRequestAlertException("A new venda cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Venda result = vendaRepository.save(venda);
        return ResponseEntity.created(new URI("/api/vendas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /vendas : Updates an existing venda.
     *
     * @param venda the venda to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated venda,
     * or with status 400 (Bad Request) if the venda is not valid,
     * or with status 500 (Internal Server Error) if the venda couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/vendas")
    @Timed
    public ResponseEntity<Venda> updateVenda(@Valid @RequestBody Venda venda) throws URISyntaxException {
        log.debug("REST request to update Venda : {}", venda);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeEditar(cargoRepository, ENTITY_NAME)) {
                                  log.error("TENTATIVA DE EDITAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME  + " : {}", venda);
                                  return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para editar esta entidade.")).body(null);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        if (venda.getId() == null) {
            return createVenda(venda);
        }
        Venda result = vendaRepository.save(DoubleUtil.handleVenda(venda));

        ComandaResource.verificarComanda(result.getComanda(), comandaRepository, vendaRepository, lancamentoRepository, produtoRepository, log);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, venda.getId().toString()))
            .body(result);
    }

    /**
     * GET  /vendas : get all the vendas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of vendas in body
     */
    @GetMapping("/vendas")
    @Timed
    public ResponseEntity<List<Venda>> getAllVendas(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Vendas");

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
                                  log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME);
                                  return  null;
                                  }

//////////////////////////////////REQUER PRIVILEGIOS
        Page<Venda> page = vendaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/vendas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


    /**
     * GET  /vendas/comanda/:id/:modo : get all the vendas of comanda id with modo.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of vendas in body
     */
    @GetMapping("/vendas/comanda/{id}/{modo}")
    @Timed
    public List<Venda> getAllVendasByComanda(@PathVariable Long id, @PathVariable String modo) {
        log.debug("REST request to get all Vendas For Comanda {} modo {}", id, modo);

        //////////////////////////////////REQUER PRIVILEGIOS
        if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
            log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME);
            return  null;
        }

//////////////////////////////////REQUER PRIVILEGIOS

//        List<Venda> vendas = vendaRepository.findAll();
//        vendas.removeIf(venda -> ((venda.getComanda() == null) || (!venda.getComanda().getId().equals(id))));
        List<Venda> vendas = vendaRepository.findAllByComandaId(id);///vendas;

        vendas.removeIf(v -> ((modo != null) && (!modo.isEmpty()) && (!modo.contains(v.getStatus().toString().toUpperCase()))));

        return vendas;
    }


    /**
     * GET  /vendas/:id : get the "id" venda.
     *
     * @param id the id of the venda to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the venda, or with status 404 (Not Found)
     */
    @GetMapping("/vendas/{id}")
    @Timed
    public ResponseEntity<Venda> getVenda(@PathVariable Long id) {
        log.debug("REST request to get Venda : {}", id);
        Venda venda = vendaRepository.findOne(id);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
                                  venda = null;
                                  log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME + " : {}", id);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(venda));
    }

    /**
     * DELETE  /vendas/:id : delete the "id" venda.
     *
     * @param id the id of the venda to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/vendas/{id}")
    @Timed
    public ResponseEntity<Void> deleteVenda(@PathVariable Long id) {
        log.debug("REST request to delete Venda : {}", id);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (PrivilegioService.podeDeletar(cargoRepository, ENTITY_NAME)) {
                                  vendaRepository.delete(id);
                                  } else {
                                  log.error("TENTATIVA DE EXCUIR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME + " : {}", id);
                                  return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para deletar esta entidade.")).body(null);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
