package com.mikeias.erestaurante.domain;

import java.util.HashMap;
import java.util.List;

public class ImpressoraData {

    private String nome;
    private boolean status;
    private boolean termica;
    private HashMap<String, String> atributes;

    public ImpressoraData(PrintersStatus status) {
        this.nome = status.getNome();
        this.status = status.isStatus();
        this.termica = status.isTermica();
        atributes = new HashMap<>();
        if (status.getAtributes().size() > 0) {
            List<String> atributos = status.getAtributes();
            for (int i=0; i<atributos.size() - 1; i+= 2) {
                atributes.put(atributos.get(i), atributos.get(i+1));
            }
        }
    }

    public String getNome() {
        return nome;
    }

    public boolean isStatus() {
        return status;
    }

    public boolean isTermica() {
        return termica;
    }

    public HashMap<String, String> getAtributes() {
        return atributes;
    }
}
