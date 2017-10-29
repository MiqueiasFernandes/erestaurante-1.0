package com.mikeias.erestaurante.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.mikeias.erestaurante.domain.enumeration.Status;

/**
 * A Comanda.
 */
@Entity
@Table(name = "comanda")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Comanda implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "total")
    private Double total;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status;

    @Column(name = "gorjeta")
    private Double gorjeta;

    @OneToOne
    @JoinColumn(unique = true)
    private Nota nota;

    @OneToMany(mappedBy = "comanda")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Lancamento> lancamentos = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    private Cliente pagador;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @NotNull
    @JoinTable(name = "comanda_mesas",
               joinColumns = @JoinColumn(name="comandas_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="mesas_id", referencedColumnName="id"))
    private Set<Mesa> mesas = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @NotNull
    @JoinTable(name = "comanda_colaboradores",
               joinColumns = @JoinColumn(name="comandas_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="colaboradores_id", referencedColumnName="id"))
    private Set<Colaborador> colaboradores = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public Comanda codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Double getTotal() {
        return total;
    }

    public Comanda total(Double total) {
        this.total = total;
        return this;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public Status getStatus() {
        return status;
    }

    public Comanda status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Double getGorjeta() {
        return gorjeta;
    }

    public Comanda gorjeta(Double gorjeta) {
        this.gorjeta = gorjeta;
        return this;
    }

    public void setGorjeta(Double gorjeta) {
        this.gorjeta = gorjeta;
    }

    public Nota getNota() {
        return nota;
    }

    public Comanda nota(Nota nota) {
        this.nota = nota;
        return this;
    }

    public void setNota(Nota nota) {
        this.nota = nota;
    }

    public Set<Lancamento> getLancamentos() {
        return lancamentos;
    }

    public Comanda lancamentos(Set<Lancamento> lancamentos) {
        this.lancamentos = lancamentos;
        return this;
    }

    public Comanda addLancamento(Lancamento lancamento) {
        this.lancamentos.add(lancamento);
        lancamento.setComanda(this);
        return this;
    }

    public Comanda removeLancamento(Lancamento lancamento) {
        this.lancamentos.remove(lancamento);
        lancamento.setComanda(null);
        return this;
    }

    public void setLancamentos(Set<Lancamento> lancamentos) {
        this.lancamentos = lancamentos;
    }

    public Cliente getPagador() {
        return pagador;
    }

    public Comanda pagador(Cliente cliente) {
        this.pagador = cliente;
        return this;
    }

    public void setPagador(Cliente cliente) {
        this.pagador = cliente;
    }

    public Set<Mesa> getMesas() {
        return mesas;
    }

    public Comanda mesas(Set<Mesa> mesas) {
        this.mesas = mesas;
        return this;
    }

    public Comanda addMesas(Mesa mesa) {
        this.mesas.add(mesa);
        return this;
    }

    public Comanda removeMesas(Mesa mesa) {
        this.mesas.remove(mesa);
        return this;
    }

    public void setMesas(Set<Mesa> mesas) {
        this.mesas = mesas;
    }

    public Set<Colaborador> getColaboradores() {
        return colaboradores;
    }

    public Comanda colaboradores(Set<Colaborador> colaboradors) {
        this.colaboradores = colaboradors;
        return this;
    }

    public Comanda addColaboradores(Colaborador colaborador) {
        this.colaboradores.add(colaborador);
        return this;
    }

    public Comanda removeColaboradores(Colaborador colaborador) {
        this.colaboradores.remove(colaborador);
        return this;
    }

    public void setColaboradores(Set<Colaborador> colaboradors) {
        this.colaboradores = colaboradors;
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
        Comanda comanda = (Comanda) o;
        if (comanda.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), comanda.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Comanda{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", total='" + getTotal() + "'" +
            ", status='" + getStatus() + "'" +
            ", gorjeta='" + getGorjeta() + "'" +
            "}";
    }
}
