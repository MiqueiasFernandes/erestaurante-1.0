package com.mikeias.erestaurante.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

import com.mikeias.erestaurante.domain.enumeration.CargoTipo;

/**
 * A Cargo.
 */
@Entity
@Table(name = "cargo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cargo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "salario")
    private Double salario;

    @Column(name = "comissao")
    private Double comissao;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private CargoTipo tipo;

    @Lob
    @Column(name = "permissao")
    private String permissao;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Cargo nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Double getSalario() {
        return salario;
    }

    public Cargo salario(Double salario) {
        this.salario = salario;
        return this;
    }

    public void setSalario(Double salario) {
        this.salario = salario;
    }

    public Double getComissao() {
        return comissao;
    }

    public Cargo comissao(Double comissao) {
        this.comissao = comissao;
        return this;
    }

    public void setComissao(Double comissao) {
        this.comissao = comissao;
    }

    public CargoTipo getTipo() {
        return tipo;
    }

    public Cargo tipo(CargoTipo tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(CargoTipo tipo) {
        this.tipo = tipo;
    }

    public String getPermissao() {
        return permissao;
    }

    public Cargo permissao(String permissao) {
        this.permissao = permissao;
        return this;
    }

    public void setPermissao(String permissao) {
        this.permissao = permissao;
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
        Cargo cargo = (Cargo) o;
        if (cargo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cargo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cargo{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", salario='" + getSalario() + "'" +
            ", comissao='" + getComissao() + "'" +
            ", tipo='" + getTipo() + "'" +
            ", permissao='" + getPermissao() + "'" +
            "}";
    }
}
