package com.mikeias.erestaurante.web.rest;

import com.mikeias.erestaurante.domain.Comanda;
import com.mikeias.erestaurante.domain.Venda;
import com.mikeias.erestaurante.domain.enumeration.Status;
import com.mikeias.erestaurante.domain.enumeration.VendaStatus;
import com.mikeias.erestaurante.repository.ComandaRepository;
import com.mikeias.erestaurante.repository.VendaRepository;
import com.mikeias.erestaurante.web.rest.util.DoubleUtil;

import com.mikeias.erestaurante.service.PrivilegioService;
import com.mikeias.erestaurante.domain.Cargo;
import com.mikeias.erestaurante.repository.CargoRepository;

import com.codahale.metrics.annotation.Timed;
import com.mikeias.erestaurante.domain.Lancamento;

import com.mikeias.erestaurante.repository.LancamentoRepository;
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

/**
 * REST controller for managing Lancamento.
 */
@RestController
@RequestMapping("/api")
public class LancamentoResource {

    private final Logger log = LoggerFactory.getLogger(LancamentoResource.class);

    private static final String ENTITY_NAME = "lancamento";

    private final LancamentoRepository lancamentoRepository;
    private final VendaRepository vendaRepository;
    private final ComandaRepository comandaRepository;


//////////////////////////////////REQUER PRIVILEGIOS
                                  private final CargoRepository cargoRepository;

    public LancamentoResource(
        LancamentoRepository lancamentoRepository,
        CargoRepository cargoRepository,
        VendaRepository vendaRepository,
        ComandaRepository comandaRepository) {
        this.lancamentoRepository = lancamentoRepository;
        this.cargoRepository = cargoRepository;
        this.vendaRepository = vendaRepository;
        this.comandaRepository = comandaRepository;
    }
//////////////////////////////////REQUER PRIVILEGIOS

    /**
     * POST  /lancamentos : Create a new lancamento.
     *
     * @param lancamento the lancamento to create
     * @return the ResponseEntity with status 201 (Created) and with body the new lancamento, or with status 400 (Bad Request) if the lancamento has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/lancamentos")
    @Timed
    public ResponseEntity<Lancamento> createLancamento(@Valid @RequestBody Lancamento lancamento) throws URISyntaxException {
        log.debug("REST request to save Lancamento : {}", lancamento);
        lancamento = DoubleUtil.handleLancamento(lancamento);
//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeCriar(cargoRepository, ENTITY_NAME)) {
                                  log.error("TENTATIVA DE CRIAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME  + " : {}", lancamento);
                                  return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para criar esta entidade.")).body(null);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        if (lancamento.getId() != null) {
            throw new BadRequestAlertException("A new lancamento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Lancamento result = lancamentoRepository.save(lancamento);
        verificarComanda(result);
        return ResponseEntity.created(new URI("/api/lancamentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /lancamentos : Updates an existing lancamento.
     *
     * @param lancamento the lancamento to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated lancamento,
     * or with status 400 (Bad Request) if the lancamento is not valid,
     * or with status 500 (Internal Server Error) if the lancamento couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/lancamentos")
    @Timed
    public ResponseEntity<Lancamento> updateLancamento(@Valid @RequestBody Lancamento lancamento) throws URISyntaxException {
        log.debug("REST request to update Lancamento : {}", lancamento);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeEditar(cargoRepository, ENTITY_NAME)) {
                                  log.error("TENTATIVA DE EDITAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME  + " : {}", lancamento);
                                  return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para editar esta entidade.")).body(null);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        if (lancamento.getId() == null) {
            return createLancamento(lancamento);
        }
        Lancamento result = lancamentoRepository.save(lancamento);
        verificarComanda(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, lancamento.getId().toString()))
            .body(result);
    }


    void verificarComanda(Lancamento lancamento) {
        Comanda comanda = lancamento.getComanda();
        if (lancamento.isIsentrada()) {
            Double total =
                comanda.getComandaCalculada(vendaRepository).getTotal() +
                    comanda.getGorjeta();

            for (Lancamento lancamento1 : getAllLancamentosByComanda(comanda.getId())) {
                if (lancamento1.isIsentrada()) {
                    total -= (lancamento1.getParcelas() * lancamento1.getValor());
                }
            }
            if (total <= 0) {
                List<Venda>  vs = vendaRepository.findAllByComandaId(comanda.getId());
                vs.removeIf(v -> (
                    (v.getStatus() == VendaStatus.ENTREGUE) || (v.getStatus() == VendaStatus.CANCELADO))
                );
                if (vs.size() < 1) {
                    comanda.setStatus(Status.PAGA);
                    this.comandaRepository.save(comanda);
                } else {
                    log.warn("Comanda não pode ser fechada por possir vendas em aberto {}", comanda);
                }
            }
        }
    }


    /**
     * GET  /lancamentos : get all the lancamentos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of lancamentos in body
     */
    @GetMapping("/lancamentos")
    @Timed
    public ResponseEntity<List<Lancamento>> getAllLancamentos(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Lancamentos");

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
                                  log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME);
                                  return  null;
                                  }

//////////////////////////////////REQUER PRIVILEGIOS
        Page<Lancamento> page = lancamentoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/lancamentos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /lancamentos/comanda/:id : get all the lancamentos by comanda id.
     *
     * @param id the id of the comanda to retrieve lancamentos
     * @return the ResponseEntity with status 200 (OK) and the list of lancamentos in body
     */
    @GetMapping("/lancamentos/comanda/{id}")
    @Timed
    public List<Lancamento> getAllLancamentosByComanda(@PathVariable Long id) {
        log.debug("REST request to get all Lancamentos by comanda {} ", id);

//////////////////////////////////REQUER PRIVILEGIOS
        if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
            log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME);
            return  null;
        }

//////////////////////////////////REQUER PRIVILEGIOS
        return lancamentoRepository.findAllByComandaId(id);
    }


    /**
     * GET  /lancamentos/:id : get the "id" lancamento.
     *
     * @param id the id of the lancamento to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the lancamento, or with status 404 (Not Found)
     */
    @GetMapping("/lancamentos/{id}")
    @Timed
    public ResponseEntity<Lancamento> getLancamento(@PathVariable Long id) {
        log.debug("REST request to get Lancamento : {}", id);
        Lancamento lancamento = lancamentoRepository.findOne(id);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
                                  lancamento = null;
                                  log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME + " : {}", id);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(lancamento));
    }

    /**
     * DELETE  /lancamentos/:id : delete the "id" lancamento.
     *
     * @param id the id of the lancamento to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/lancamentos/{id}")
    @Timed
    public ResponseEntity<Void> deleteLancamento(@PathVariable Long id) {
        log.debug("REST request to delete Lancamento : {}", id);

//////////////////////////////////REQUER PRIVILEGIOS
                                  if (PrivilegioService.podeDeletar(cargoRepository, ENTITY_NAME)) {
                                  lancamentoRepository.delete(id);
                                  } else {
                                  log.error("TENTATIVA DE EXCUIR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME + " : {}", id);
                                  return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para deletar esta entidade.")).body(null);
                                  }
//////////////////////////////////REQUER PRIVILEGIOS
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
