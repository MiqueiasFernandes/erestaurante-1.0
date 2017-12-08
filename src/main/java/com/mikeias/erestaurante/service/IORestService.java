package com.mikeias.erestaurante.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mikeias.erestaurante.domain.Impressora;
import com.mikeias.erestaurante.domain.ImpressoraData;
import com.mikeias.erestaurante.domain.PrintersStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class IORestService {

    private static final Logger log = LoggerFactory.getLogger(IORestService.class);


    private static RestTemplate getRestTemplate() {
        return new RestTemplate();
    }


    private static Object getOnTemplate(String path, Class classe, Object retorno) {
        log.info("#######################GET " + path +"############################");
        try {
            return getRestTemplate().getForObject( path,  classe);
        }catch (Exception e) {
            log.error("ERRO AO TENTAR: GET " + path + " EX: " + e);
        }
        return retorno;
    }

    private static Object postOnTemplate(String path, Object enviado, Class classe, Object retorno) {
        log.info("#######################POST " + path +"############################");
        try {
            return getRestTemplate().postForObject(
                path, enviado,  classe);
        }catch (Exception e) {
            log.error("ERRO AO TENTAR: POST " + path + " EX: " + e);
        }
        return retorno;
    }


    private static String postTEXTO(String path, String enviado) {
        return (String) postOnTemplate(path, enviado, String.class, "false");
    }

    private static boolean postBINARIO(String path, MultipartFile file) {
        try {

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setAccept(Arrays.asList(new MediaType[]{MediaType.TEXT_PLAIN}));
            HttpEntity<byte[]> entity = null;
            entity = new HttpEntity<byte[]>(
                file.getBytes(),
                headers);
            return "true".equals(
                postOnTemplate(path, entity, String.class, "false")
            );
        }catch (Exception ex){
            log.error("ERRO AO TENTAR SERIALIZAR EX: " + ex);
        }
        return false;
    }


    /////////////////////impressora

    static final String http = "http://";
    static final String porta = ":9090";
    static final String recurso = "/impressora/";

    public static ImpressoraData[] getListOfPrints(String ip){
        String url = http + ip + porta + recurso + "status";

        try {
            PrintersStatus[] status = new ObjectMapper().readValue(new URL(url), PrintersStatus[].class);
            log.debug("status de impressoras {} ", status);
            ImpressoraData[] ps = new ImpressoraData[status.length];
            for (int i=0;i<ps.length;i++)
                ps[i] = new ImpressoraData(status[i]);
            return ps;
        } catch (IOException e) {
            log.error("impossivel converter " + url + " em PrinterStatus " + e);
        }
        return null;
    }


    public static boolean printTexto(String texto, Impressora print){

        MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
        map.add("orientation", "portrait");
        map.add("pages", "all");
        map.add("printer", print.getNome());
        map.add("content", texto);

        return "sucesso".equalsIgnoreCase((String) postOnTemplate(
            http+  print.getCodigo().split("-")[0] + porta + recurso +"print/text/iso-a4",
            map, String.class,
            null));
    }


}
