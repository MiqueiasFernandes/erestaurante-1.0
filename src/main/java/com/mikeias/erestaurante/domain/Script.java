package com.mikeias.erestaurante.domain;

public class Script {

    private String id;
    private boolean  texto;
    private String request;
    private String    target;
    private String   arquivo;
    private long comanda;
    private int status;
    private boolean observavel;
    private int sequenciavel;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean isTexto() {
        return texto;
    }

    public void setTexto(boolean texto) {
        this.texto = texto;
    }

    public String getRequest() {
        return request;
    }

    public void setRequest(String request) {
        this.request = request;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public String getArquivo() {
        if (isObservavel() && arquivo.contains("{{OBSERVACAO}}")) {
            setArquivo(arquivo.replace("{{OBSERVACAO}}", ""));
        }
        return arquivo;
    }

    public void setArquivo(String arquivo) {
        this.arquivo = arquivo;
    }

    public long getComanda() {
        return comanda;
    }

    public void setComanda(long comanda) {
        this.comanda = comanda;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public boolean isObservavel() {
        return observavel;
    }

    public void setObservavel(boolean observavel) {
        this.observavel = observavel;
    }

    public int getSequenciavel() {
        return sequenciavel;
    }

    public void setSequenciavel(int sequenciavel) {
        this.sequenciavel = sequenciavel;
    }
}
