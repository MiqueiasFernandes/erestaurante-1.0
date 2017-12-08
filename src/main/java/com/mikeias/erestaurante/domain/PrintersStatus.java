package com.mikeias.erestaurante.domain;

import java.util.List;

public class PrintersStatus {

    private String nome;
    private boolean status;
    private boolean termica;
    private List<String> atributes;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public boolean isTermica() {
        return termica;
    }

    public void setTermica(boolean termica) {
        this.termica = termica;
    }

    public List<String> getAtributes() {
        return atributes;
    }

    public void setAtributes(List<String> atributes) {
        this.atributes = atributes;
    }

}
