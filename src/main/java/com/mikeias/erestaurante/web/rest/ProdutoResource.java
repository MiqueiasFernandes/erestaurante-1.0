package com.mikeias.erestaurante.web.rest;

import com.mikeias.erestaurante.service.PrivilegioService;
import com.mikeias.erestaurante.domain.Cargo;
import com.mikeias.erestaurante.repository.CargoRepository;

import com.codahale.metrics.annotation.Timed;
import com.mikeias.erestaurante.domain.Produto;
import com.mikeias.erestaurante.web.rest.util.DoubleUtil;
import com.mikeias.erestaurante.repository.ProdutoRepository;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Produto.
 */
@RestController
@RequestMapping("/api")
public class ProdutoResource {

    private final Logger log = LoggerFactory.getLogger(ProdutoResource.class);

    private static final String ENTITY_NAME = "produto";

    private final ProdutoRepository produtoRepository;


    //////////////////////////////////REQUER PRIVILEGIOS
    private final CargoRepository cargoRepository;

    public ProdutoResource(ProdutoRepository produtoRepository, CargoRepository cargoRepository) {
        this.produtoRepository = produtoRepository;
        this.cargoRepository = cargoRepository;
    }
//////////////////////////////////REQUER PRIVILEGIOS

    /**
     * POST  /produtos : Create a new produto.
     *
     * @param produto the produto to create
     * @return the ResponseEntity with status 201 (Created) and with body the new produto, or with status 400 (Bad Request) if the produto has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/produtos")
    @Timed
    public ResponseEntity<Produto> createProduto(@RequestBody Produto produto) throws URISyntaxException {
        log.debug("REST request to save Produto : {}", produto);

        produto = DoubleUtil.handleProduto(produto);

//////////////////////////////////REQUER PRIVILEGIOS
        if (!PrivilegioService.podeCriar(cargoRepository, ENTITY_NAME)) {
            log.error("TENTATIVA DE CRIAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME  + " : {}", produto);
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para criar esta entidade.")).body(null);
        }
//////////////////////////////////REQUER PRIVILEGIOS
        if (produto.getId() != null) {
            throw new BadRequestAlertException("A new produto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Produto result = produtoRepository.save(produto);
        return ResponseEntity.created(new URI("/api/produtos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /produtos : Updates an existing produto.
     *
     * @param produto the produto to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated produto,
     * or with status 400 (Bad Request) if the produto is not valid,
     * or with status 500 (Internal Server Error) if the produto couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/produtos")
    @Timed
    public ResponseEntity<Produto> updateProduto(@RequestBody Produto produto) throws URISyntaxException {
        log.debug("REST request to update Produto : {}", produto);
        produto = DoubleUtil.handleProduto(produto);
//////////////////////////////////REQUER PRIVILEGIOS
        if (!PrivilegioService.podeEditar(cargoRepository, ENTITY_NAME)) {
            log.error("TENTATIVA DE EDITAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME  + " : {}", produto);
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para editar esta entidade.")).body(null);
        }
//////////////////////////////////REQUER PRIVILEGIOS
        if (produto.getId() == null) {
            return createProduto(produto);
        }
        Produto result = produtoRepository.save(produto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, produto.getId().toString()))
            .body(result);
    }

    /**
     * GET  /produtos : get all the produtos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of produtos in body
     */
    @GetMapping("/produtos")
    @Timed
    public ResponseEntity<List<Produto>> getAllProdutos(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Produtos");

//////////////////////////////////REQUER PRIVILEGIOS
        if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
            log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME);
            return  null;
        }

//////////////////////////////////REQUER PRIVILEGIOS
        Page<Produto> page = produtoRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/produtos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /produtos/:id : get the "id" produto.
     *
     * @param id the id of the produto to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the produto, or with status 404 (Not Found)
     */
    @GetMapping("/produtos/{id}")
    @Timed
    public ResponseEntity<Produto> getProduto(@PathVariable Long id) {
        log.debug("REST request to get Produto : {}", id);
        Produto produto = produtoRepository.findOne(id);

//////////////////////////////////REQUER PRIVILEGIOS
        if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
            produto = null;
            log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME + " : {}", id);
        }
//////////////////////////////////REQUER PRIVILEGIOS
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(produto));
    }

    @GetMapping("/produtos/pesquisa/{tipo}/{pesquisa}")
    @Timed
    public ResponseEntity<List<Produto>> getProdutoPesquisa(@PathVariable String tipo, @PathVariable String pesquisa) {
        log.debug("REST request to get Produto for pesquisa: {} - {}", tipo, pesquisa);

        String[] modos = {
            "Bebidas",
            "Restaurante",
            "Sobremesas",
            "categoria",
            "nome",
            "preco",
            "estoque",
            "codigo",
            "unidade"};

        String data1 = tipo;
        String data2 = pesquisa;

        List<Produto> produtos = produtoRepository.findAll();

        ArrayList<Produto> list= new ArrayList<>();

        if (data1 == null || data1.isEmpty() || data1.equalsIgnoreCase("Todos")) {
            list.addAll(produtos);
        } else if (
            data1.equalsIgnoreCase(modos[0]) ||
                data1.equalsIgnoreCase(modos[1]) ||
                data1.equalsIgnoreCase(modos[2])
            ) {
            getOfCategoria(produtos, list, data1);
        } else  if (data2 != null && !data2.isEmpty()) {


            String keyword = data2.toLowerCase();


            if (data1.contains(modos[3])){//categoria
                for (Produto p : produtos){
                    try{
                        if(p.getDescricao().toLowerCase().contains(keyword)){
                            list.add(p);
                        }
                    } catch (Exception ex) {

                    }
                }
            }

            if (data1.contains(modos[4])){ ////nome
                for (Produto p : produtos){
                    try{
                        if(p.getNome().toLowerCase().contains(keyword)){
                            list.add(p);
                        }
                    } catch (Exception ex) {

                    }
                }
            }

            if (data1.contains(modos[5])){ ///preco
                for (Produto p : produtos) {
                    try{
                        if (keyword.contains(p.getPreco().toString())) {
                            list.add(p);
                        }
                    } catch (Exception ex) {

                    }
                }
            }
            if (data1.contains(modos[6])) { ////estoque
                for (Produto p : produtos) {
                    try{
                        if (keyword.contains(p.getEstoque().toString())) {
                            list.add(p);
                        }
                    } catch (Exception ex) {

                    }
                }
            }
            if (data1.contains(modos[7])){/////codigo
                for (Produto p : produtos){
                    try{
                        if(keyword.contains(p.getCodigo().toLowerCase())){
                            list.add(p);
                        }
                    } catch (Exception ex) {

                    }
                }
            }
            if (data1.contains(modos[8])){////unidade
                for (Produto p : produtos){
                    try{
                        if(keyword.contains(p.getUnidade().toString().toLowerCase())){
                            list.add(p);
                        }
                    } catch (Exception ex) {

                    }
                }
            }
        } else {
            list.addAll(produtos);
        }

        ArrayList<Produto> p3 = new ArrayList<>();

        for (Produto p : list) {
            boolean tem= false;
            for (Produto q : p3) {
                if (q.getId().equals(p.getId())) {
                    tem = true;
                    break;
                }
            }
            if (!tem) {
                p3.add(p);
            }
        }

//////////////////////////////////REQUER PRIVILEGIOS
        if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
            log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME);
            return  null;
        }

//////////////////////////////////REQUER PRIVILEGIOS
        return new ResponseEntity<>(list, HttpStatus.OK);
    }




    void getOfCategoria(List<Produto> produtos, ArrayList<Produto> produtos1, String catedoria) {


        for (Produto p: produtos) {

            try {
                String desc = p.getDescricao();
                if (desc != null && !desc.isEmpty()) {
                    System.err.println(desc);

                    String res = desc.replaceAll(".*\"categoria\":\\[", "").replaceAll("\\].*", "");
                    if (res != null && !res.isEmpty()) {

                        System.err.println(res);

                        if (res.toLowerCase().contains(catedoria.toLowerCase())) {
                            produtos1.add(p);
                        }
                    }
                }
            } catch (Exception ex) {

            }

        }


    }



    /**
     * DELETE  /produtos/:id : delete the "id" produto.
     *
     * @param id the id of the produto to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/produtos/{id}")
    @Timed
    public ResponseEntity<Void> deleteProduto(@PathVariable Long id) {
        log.debug("REST request to delete Produto : {}", id);

//////////////////////////////////REQUER PRIVILEGIOS
        if (PrivilegioService.podeDeletar(cargoRepository, ENTITY_NAME)) {
            produtoRepository.delete(id);
        } else {
            log.error("TENTATIVA DE EXCUIR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME + " : {}", id);
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para deletar esta entidade.")).body(null);
        }
//////////////////////////////////REQUER PRIVILEGIOS
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
