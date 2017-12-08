package com.mikeias.erestaurante.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mikeias.erestaurante.domain.Impressora;

import com.mikeias.erestaurante.domain.ImpressoraData;
import com.mikeias.erestaurante.domain.Script;
import com.mikeias.erestaurante.repository.CargoRepository;
import com.mikeias.erestaurante.repository.ImpressoraRepository;
import com.mikeias.erestaurante.service.IORestService;
import com.mikeias.erestaurante.service.PrivilegioService;
import com.mikeias.erestaurante.web.rest.errors.BadRequestAlertException;
import com.mikeias.erestaurante.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.*;

/**
 * REST controller for managing Impressora.
 */
@RestController
@RequestMapping("/api")
public class ImpressoraResource {

    private final Logger log = LoggerFactory.getLogger(ImpressoraResource.class);

    private static final String ENTITY_NAME = "impressora";

    private final ImpressoraRepository impressoraRepository;

    //////////////////////////////////REQUER PRIVILEGIOS
    private final CargoRepository cargoRepository;


    private static int[] contabilizar = new int[10];



    public ImpressoraResource(ImpressoraRepository impressoraRepository, CargoRepository cargoRepository) {
        this.impressoraRepository = impressoraRepository;
        this.cargoRepository = cargoRepository;
        contabilizar[0] =
            contabilizar[1] =
                contabilizar[2] =
                    contabilizar[3] =
                        contabilizar[4] =
                            contabilizar[5] =
                                contabilizar[6] =
                                    contabilizar[7] =
                                        contabilizar[8] =
                                            contabilizar[9] = 1;
    }

    /**
     * POST  /impressoras : Create a new impressora.
     *
     * @param impressora the impressora to create
     * @return the ResponseEntity with status 201 (Created) and with body the new impressora, or with status 400 (Bad Request) if the impressora has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/impressoras")
    @Timed
    public ResponseEntity<Impressora> createImpressora(@RequestBody Impressora impressora) throws URISyntaxException {
        log.debug("REST request to save Impressora : {}", impressora);


        //////////////////////////////////REQUER PRIVILEGIOS
        if (!PrivilegioService.podeCriar(cargoRepository, ENTITY_NAME)) {
            log.error("TENTATIVA DE CRIAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME  + " : {}", impressora);
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para criar esta entidade.")).body(null);
        }
//////////////////////////////////REQUER PRIVILEGIOS


        if (impressora.getId() != null) {
            throw new BadRequestAlertException("A new impressora cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Impressora result = impressoraRepository.save(impressora);
        return ResponseEntity.created(new URI("/api/impressoras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /impressoras : Updates an existing impressora.
     *
     * @param impressora the impressora to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated impressora,
     * or with status 400 (Bad Request) if the impressora is not valid,
     * or with status 500 (Internal Server Error) if the impressora couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/impressoras")
    @Timed
    public ResponseEntity<Impressora> updateImpressora(@RequestBody Impressora impressora) throws URISyntaxException {
        log.debug("REST request to update Impressora : {}", impressora);

        //////////////////////////////////REQUER PRIVILEGIOS
        if (!PrivilegioService.podeEditar(cargoRepository, ENTITY_NAME)) {
            log.error("TENTATIVA DE EDITAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME  + " : {}", impressora);
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para editar esta entidade.")).body(null);
        }
//////////////////////////////////REQUER PRIVILEGIOS


        if (impressora.getId() == null) {
            return createImpressora(impressora);
        }
        Impressora result = impressoraRepository.save(impressora);

        if (result.getScript() != null && !result.getScript().isEmpty()) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                Data data = objectMapper.readValue(result.getScript(), Data.class);

                boolean atualizou = false;

                for (Script s : data.getData()) {
                    if ((s.getStatus() >= 2) && IORestService.printTexto(s.getArquivo(), result)){
//
//                        if (s.getSequenciavel() > 0){
//                            s.setArquivo(s.getArquivo().replace("{{SEQ}}", "" + contabilizar[s.getSequenciavel() - 1]++));
//                        }

//                        if (IORestService.printTexto(s.getArquivo(), result)) {
                            s.setStatus(3);
                            atualizou = true;
//                        }
                    }
                }

                if (atualizou){
                    result.setScript(objectMapper.writeValueAsString(data));
                    result = impressoraRepository.save(result);/////nao atualizou
                }

            } catch (Exception e) {
                log.error("Erro ao obter script {} por {}", result, e);
            }
        }

        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, impressora.getId().toString()))
            .body(result);
    }

    /**
     * GET  /impressoras : get all the impressoras.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of impressoras in body
     */
    @GetMapping("/impressoras")
    @Timed
    public List<Impressora> getAllImpressoras() {
        log.debug("REST request to get all Impressoras");

        //////////////////////////////////REQUER PRIVILEGIOS
        if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
            log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME);
            return  null;
        }

//////////////////////////////////REQUER PRIVILEGIOS


        return impressoraRepository.findAll();
        }

    /**
     * GET  /impressoras/:id : get the "id" impressora.
     *
     * @param id the id of the impressora to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the impressora, or with status 404 (Not Found)
     */
    @GetMapping("/impressoras/{id}")
    @Timed
    public ResponseEntity<Impressora> getImpressora(@PathVariable Long id) {
        log.debug("REST request to get Impressora : {}", id);

        Impressora impressora = null;

        if (id < 0) {

            String printer = null;

            switch (id.intValue()) {
                case -1:
                    printer = "nota";
                    break;
                case -2:
                    printer = "relatorio";
                    break;
            }

            final String print = printer;

            if (print != null) {

                log.debug("REST request to get Impressora for " + printer);


                final List<Impressora> all = impressoraRepository.findAll();

                all.removeIf(pt -> pt.getLocal() == null || pt.getLocal().isEmpty() || !pt.getLocal().contains(print));

                all.sort(Comparator.comparingInt(Impressora::getPrioridade));

               impressora = all.get(0);

            } else {
                log.error("NÃO HÁ IMPRESSORAS INSTALADA PARA " + print.toUpperCase() + " E FOI REQUISITADO!");
            }

        } else {

            impressora = impressoraRepository.findOne(id);

        }

        //////////////////////////////////REQUER PRIVILEGIOS
        if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
            impressora = null;
            log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME + " : {}", id);
        }
//////////////////////////////////REQUER PRIVILEGIOS

        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(impressora));
    }

    /**
     * DELETE  /impressoras/:id : delete the "id" impressora.
     *
     * @param id the id of the impressora to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/impressoras/{id}")
    @Timed
    public ResponseEntity<Void> deleteImpressora(@PathVariable Long id) {
        log.debug("REST request to delete Impressora : {}", id);

        //////////////////////////////////REQUER PRIVILEGIOS
        if (PrivilegioService.podeDeletar(cargoRepository, ENTITY_NAME)) {
            impressoraRepository.delete(id);
        } else {
            log.error("TENTATIVA DE EXCUIR SEM PERMISSÃO BLOQUEADA! " + ENTITY_NAME + " : {}", id);
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "privilegios insuficientes.", "Este usuario não possui privilegios sufuentes para deletar esta entidade.")).body(null);
        }
//////////////////////////////////REQUER PRIVILEGIOS

        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }


    /**
     * GET  /impressoras/ip/:ip : get the impressora on IP.
     *
     * @param ip the host of the impressora to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the impressora, or with status 404 (Not Found)
     */
    @GetMapping("/impressoras/ip/{ip}")
    @Timed
    public ResponseEntity<ImpressoraData[]> getImpressoras(@PathVariable String ip) {

        ip = ip.replace("-", ".");

        log.debug("REST request to get Impressora on IP: {}", ip);


        ImpressoraData[] impressoras = IORestService.getListOfPrints(ip);
        //////////////////////////////////REQUER PRIVILEGIOS
        if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
            impressoras = null;
            log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! GET IMPRESSORAS " + ENTITY_NAME + " : {}", ip);
        }
//////////////////////////////////REQUER PRIVILEGIOS

        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(impressoras));
    }



    /**
     * GET  /impressoras/locais : get the impressora locais.
     *
     * @return the ResponseEntity with status 200 (OK) and with body the impressora, or with status 404 (Not Found)
     */
    @GetMapping("/impressoras/locais")
    @Timed
    public ResponseEntity<String[]> getLocaisDeImpressao() {

        log.debug("REST request to get Impressora locais");


        List<Impressora> impressoras = impressoraRepository.findAll();
        //////////////////////////////////REQUER PRIVILEGIOS
        if (!PrivilegioService.podeVer(cargoRepository, ENTITY_NAME)) {
            impressoras = null;
            log.error("TENTATIVA DE VISUALIZAR SEM PERMISSÃO BLOQUEADA! GET LOCAIS DE IMPRESSÃO " + ENTITY_NAME);
        }
//////////////////////////////////REQUER PRIVILEGIOS

        ArrayList<String> imps;
        String[] retorno = new String[]{};

        if (impressoras != null) {
            imps = new ArrayList<>();
            for (int i=0; i < impressoras.size(); i++) {
                imps.addAll(Arrays.asList(impressoras.get(i).getLocal().split(",")));
            }
            retorno = imps.toArray(retorno);
        }

        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(retorno));
    }

}


class Data {
    private Script[] data;

    public Script[] getData() {
        return data;
    }

    public void setData(Script[] data) {
        this.data = data;
    }
}
