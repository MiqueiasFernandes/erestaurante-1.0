package com.mikeias.erestaurante.web.rest;

import com.mikeias.erestaurante.domain.*;
import com.mikeias.erestaurante.domain.enumeration.Status;
import com.mikeias.erestaurante.domain.enumeration.VendaStatus;
import com.mikeias.erestaurante.repository.*;
import com.mikeias.erestaurante.web.rest.util.DoubleUtil;


import com.mikeias.erestaurante.service.PrivilegioService;

import com.codahale.metrics.annotation.Timed;

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

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Comanda.
 */
@RestController
@RequestMapping("/api")
public class ComandaResource {

    private final Logger log = LoggerFactory.getLogger(ComandaResource.class);

    private static final String ENTITY_NAME = "comanda";

    private final ComandaRepository comandaRepository;

    private  static int contador = 1;



    //////////////////////////////////REQUER PRIVILEGIOS
    private final CargoRepository cargoRepository;
    private final VendaRepository vendaRepository;

    public ComandaResource(ComandaRepository comandaRepository, CargoRepository cargoRepository, VendaRepository vendaRepository) {
        this.comandaRepository = comandaRepository;
        this.cargoRepository = cargoRepository;
        this.vendaRepository = vendaRepository;
    }
//////////////////////////////////REQUER PRIVILEGIOS

    /**
     * POST  /comandas : Create a new comanda.
     *
     * @param comanda the comanda to create
     * @return the ResponseEntity with status 201 (Created) and with body the new comanda, or with status 400 (Bad Request) if the comanda has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/comandas")
    @Timed
    public ResponseEntity<Comanda> createComanda(@Valid @RequestBody Comanda comanda) throws URISyntaxException {
        log.debug("REST request to save Comanda : {}", comanda);

        comanda = DoubleUtil.handleComanda(comanda);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeCriar(cargoRepository, ENTITY_NAME)) {
                                  log.error("TENTATIVA DE CRIAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME  + " : {}", comanda);
                                  return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para criar esta entidade.")).body(null);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        if (comanda.getId() != null) {
            throw new BadRequestAlertException("A new comanda cannot already have an ID", ENTITY_NAME, "idexists");
        }


        for (Mesa mesa :comanda.getMesas()) {
            if (temComanda("FECHADA", mesa.getId()) || temComanda("ABERTA", mesa.getId())) {
                log.error("TENTATIVA DE CRIAR COM OUTRA COMANDA EXISTENTE! " + ENTITY_NAME  + " : {}", comanda);
                return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME,
                    "comanda existente para esta mesa.",
                    "Há uma comanda FECHADA ou ABERTA para esta mesa, PAGUE-A antes de criar outra."))
                    .body(null);
            }
        }

        comanda.setCodigo(comanda.getCodigo() + "-" + contador++);

        Comanda result = comandaRepository.save(comanda.getComandaCalculada(vendaRepository));

        return ResponseEntity.created(new URI("/api/comandas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /comandas : Updates an existing comanda.
     *
     * @param comanda the comanda to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated comanda,
     * or with status 400 (Bad Request) if the comanda is not valid,
     * or with status 500 (Internal Server Error) if the comanda couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/comandas")
    @Timed
    public ResponseEntity<Comanda> updateComanda(@Valid @RequestBody Comanda comanda) throws URISyntaxException {
        log.debug("REST request to update Comanda : {}", comanda);

        comanda = comanda.getComandaCalculada(vendaRepository);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeEditar(cargoRepository, ENTITY_NAME)) {
                                  log.error("TENTATIVA DE EDITAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME  + " : {}", comanda);
                                  return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para editar esta entidade.")).body(null);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        if (comanda.getId() == null) {
            return createComanda(comanda);
        }
        Comanda result = comandaRepository.save(comanda);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, comanda.getId().toString()))
            .body(result);
    }

    /**
     * GET  /comandas : get all the comandas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of comandas in body
     */
    @GetMapping("/comandas")
    @Timed
    public ResponseEntity<List<Comanda>> getAllComandas(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Comandas");

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
                                  log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME);
                                  return  null;
                                  }

//////////////////////////////////REQUER PRIVILEGIOS
        Page<Comanda> page = comandaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/comandas");
        page.getContent().forEach(comanda -> comanda.calculaComanda(this.vendaRepository));
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /comandas/status/:status : get all the comandas abertas.
     *
     * @param status the id of the comanda to retrieve
     * @return the ResponseEntity with status 200 (OK) and the list of comandas in body
     */
    @GetMapping("/comandas/status/{status}")
    @Timed
    public List<Comanda> getAllComandasByStatus(@PathVariable String status) {
        log.debug("REST request to get all Comandas by status {}", status);

//////////////////////////////////REQUER PRIVILEGIOS
        if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
            log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME);
            return  null;
        }

        Status stat = Status.ABERTA;

        switch (status) {
            case "ABERTA" : stat = Status.ABERTA; break;
            case "VAZIA" : stat = Status.VAZIA;break;
            case "FECHADA" : stat = Status.FECHADA;break;
            case "PAGA" : stat = Status.PAGA;break;
        }

//////////////////////////////////REQUER PRIVILEGIOS
        List<Comanda> cs = comandaRepository.findAllWithEagerRelationshipByStatus(stat);
        cs.forEach(c -> c.calculaComanda(vendaRepository));
        return cs;
    }

    boolean temComanda(String status, Long idMesa) {
        for(Comanda c : getAllComandasByStatus(status)) {
            for (Mesa mesa :c.getMesas()) {
                if (mesa.getId().equals(idMesa )) {
                    return true;
                }
            }
        }
        return false;
    }


    /**
     * GET  /comandas/:id : get the "id" comanda.
     *
     * @param id the id of the comanda to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the comanda, or with status 404 (Not Found)
     */
    @GetMapping("/comandas/{id}")
    @Timed
    public ResponseEntity<Comanda> getComanda(@PathVariable Long id) {
        log.debug("REST request to get Comanda : {}", id);

        if (id < 0) {
            log.debug("REST request to get Comanda Avulça");

            if (temComanda("FECHADA", (id * -1))) {
                return ResponseUtil.wrapOrNotFound(Optional.ofNullable(null));
            }

            for(Comanda c : getAllComandasByStatus("ABERTA")) {
                for (Mesa mesa :c.getMesas()) {
                    if (mesa.getId().equals(id * -1)) {
                        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(c.getComandaCalculada(vendaRepository)));
                    }
                }
            }

            for(Comanda comanda : comandaRepository.findAllWithEagerRelationshipsAvulco()) {
                for (Mesa mesa :comanda.getMesas()) {
                    if (mesa.getId().equals(id * -1)) {
                        if (comanda.getStatus() == Status.VAZIA) {
                            return ResponseUtil.wrapOrNotFound(Optional.ofNullable(comanda));
                        } else {
                            return ResponseUtil.wrapOrNotFound(Optional.ofNullable(null));
                        }
                    }
                }
            }
        }

        Comanda comanda = comandaRepository.findOneWithEagerRelationships(id);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
                                  comanda = null;
                                  log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME + " : {}", id);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        Comanda c2 = comanda.getComandaCalculada(vendaRepository);

        if ((comanda != null) && (c2.getTotal() != comanda.getTotal())) {
            try {
                comanda = updateComanda(c2).getBody();
            } catch (Exception ex) {
                log.error("Falhou ao obter comanda {}", id);
            }
        }

        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(comanda));
    }

    /**
     * GET  /comandas/mesa/:id : get the "id" comanda aberta ou vazia by mesa.
     *
     * @param id the id of the mesa to retrieve comanda
     * @return the ResponseEntity with status 200 (OK) and with body the comanda, or with status 404 (Not Found)
     */
    @GetMapping("/comandas/mesa/{id}")
    @Timed
    public ResponseEntity<Comanda> getComandaByMesa(@PathVariable Long id) {
        log.debug("REST request to get Comanda by Mesa: {}", id);
        List<Comanda>  comandas = comandaRepository.findAllWithEagerRelationships();

        Comanda d = null;

        try {
            for (Comanda c : comandas) {
                for (Mesa m : c.getMesas()) {
                    if (m.getId().equals(id) && (c.getStatus() == Status.ABERTA)) {
                        d = c.getComandaCalculada(vendaRepository);
                        if (d.getTotal() != c.getTotal()) {
                            d = updateComanda(d).getBody();
                        }
                        break;
                    }
                }

                if (d != null) {
                    break;
                }
            }
        } catch (Exception ex) {
            log.error("Falhou ao obter comanda by mesa{}", id);
        }

        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(d));
    }

    /**
     * DELETE  /comandas/:id : delete the "id" comanda.
     *
     * @param id the id of the comanda to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/comandas/{id}")
    @Timed
    public ResponseEntity<Void> deleteComanda(@PathVariable Long id) {
        log.debug("REST request to delete Comanda : {}", id);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (PrivilegioService.podeDeletar(cargoRepository, ENTITY_NAME)) {
                                  comandaRepository.delete(id);
                                  } else {
                                  log.error("TENTATIVA DE EXCUIR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME + " : {}", id);
                                  return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para deletar esta entidade.")).body(null);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    public static void  verificarComanda(Comanda comanda, ComandaRepository comandaRepository, VendaRepository vendaRepository, LancamentoRepository lancamentoRepository, ProdutoRepository produtoRepository, Logger log) {
        Double total =
            comanda.getComandaCalculada(vendaRepository).getTotal() +
                comanda.getGorjeta();

        for (Lancamento lancamento1 : lancamentoRepository.findAllByComandaId(comanda.getId())) {
            if (lancamento1.isIsentrada()) {
                total -= (lancamento1.getValor() + lancamento1.getDesconto());
            }
        }
        if (total <= 0) {
            List<Venda>  vs = vendaRepository.findAllByComandaId(comanda.getId());
            vs.removeIf(v -> (
                (v.getStatus() == VendaStatus.ENTREGUE) || (v.getStatus() == VendaStatus.CANCELADO))
            );

            if (vs.size() < 1) {
                comanda.setStatus(Status.PAGA);
                comandaRepository.save(comanda);

                vs = vendaRepository.findAllByComandaId(comanda.getId());
                vs.removeIf(v -> (
                    (v.getStatus() == VendaStatus.PEDIDO) || (v.getStatus() == VendaStatus.CANCELADO ))
                );
                for (Venda v : vs ) {
                    v.getProduto().setEstoque(v.getProduto().getEstoque() - v.getQuantidade());
                    produtoRepository.save(v.getProduto());
                }


            } else {
                log.warn("Comanda não pode ser fechada por possir vendas em aberto {}", comanda);
            }
        }
    }


}
