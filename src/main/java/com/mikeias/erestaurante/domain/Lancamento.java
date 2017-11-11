package com.mikeias.erestaurante.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import com.mikeias.erestaurante.domain.enumeration.Natureza;

/**
 * A Lancamento.
 */
@Entity
@Table(name = "lancamento")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Lancamento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "isentrada")
    private Boolean isentrada;

    @NotNull
    @Column(name = "data", nullable = false)
    private ZonedDateTime data;

    @NotNull
    @Column(name = "vencimento", nullable = false)
    private ZonedDateTime vencimento;

    @Enumerated(EnumType.STRING)
    @Column(name = "natureza")
    private Natureza natureza;

    @Column(name = "valor")
    private Double valor;

    @Column(name = "parcelas")
    private Integer parcelas;

    @Column(name = "observacao")
    private String observacao;

    @ManyToOne
    private Comanda comanda;

    @ManyToOne
    private Colaborador colaborador;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isIsentrada() {
        return isentrada;
    }

    public Lancamento isentrada(Boolean isentrada) {
        this.isentrada = isentrada;
        return this;
    }

    public void setIsentrada(Boolean isentrada) {
        this.isentrada = isentrada;
    }

    public ZonedDateTime getData() {
        return data;
    }

    public Lancamento data(ZonedDateTime data) {
        this.data = data;
        return this;
    }

    public void setData(ZonedDateTime data) {
        this.data = data;
    }

    public ZonedDateTime getVencimento() {
        return vencimento;
    }

    public Lancamento vencimento(ZonedDateTime vencimento) {
        this.vencimento = vencimento;
        return this;
    }

    public void setVencimento(ZonedDateTime vencimento) {
        this.vencimento = vencimento;
    }

    public Natureza getNatureza() {
        return natureza;
    }

    public Lancamento natureza(Natureza natureza) {
        this.natureza = natureza;
        return this;
    }

    public void setNatureza(Natureza natureza) {
        this.natureza = natureza;
    }

    public Double getValor() {
        return valor;
    }

    public Lancamento valor(Double valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public Integer getParcelas() {
        return parcelas;
    }

    public Lancamento parcelas(Integer parcelas) {
        this.parcelas = parcelas;
        return this;
    }

    public void setParcelas(Integer parcelas) {
        this.parcelas = parcelas;
    }

    public String getObservacao() {
        return observacao;
    }

    public Lancamento observacao(String observacao) {
        this.observacao = observacao;
        return this;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public Comanda getComanda() {
        return comanda;
    }

    public Lancamento comanda(Comanda comanda) {
        this.comanda = comanda;
        return this;
    }

    public void setComanda(Comanda comanda) {
        this.comanda = comanda;
    }

    public Colaborador getColaborador() {
        return colaborador;
    }

    public Lancamento colaborador(Colaborador colaborador) {
        this.colaborador = colaborador;
        return this;
    }

    public void setColaborador(Colaborador colaborador) {
        this.colaborador = colaborador;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Lancamento lancamento = (Lancamento) o;
        if (lancamento.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), lancamento.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Lancamento{" +
            "id=" + getId() +
            ", isentrada='" + isIsentrada() + "'" +
            ", data='" + getData() + "'" +
            ", vencimento='" + getVencimento() + "'" +
            ", natureza='" + getNatureza() + "'" +
            ", valor='" + getValor() + "'" +
            ", parcelas='" + getParcelas() + "'" +
            ", observacao='" + getObservacao() + "'" +
            "}";
    }

    public Double getDesconto() {
        if (this.getObservacao().contains(",\"desconto\":")){
           return Double.valueOf(this.getObservacao().replaceAll(".*desconto.{2}", "").split(",")[0]);
        }
        return 0.0;
    }
}
