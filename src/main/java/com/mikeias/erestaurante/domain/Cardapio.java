package com.mikeias.erestaurante.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.mikeias.erestaurante.domain.enumeration.Dia;

/**
 * A Cardapio.
 */
@Entity
@Table(name = "cardapio")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cardapio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Enumerated(EnumType.STRING)
    @Column(name = "dia")
    private Dia dia;

    @Column(name = "periodo")
    private String periodo;

    @Column(name = "disposicao")
    private String disposicao;

    @Lob
    @Column(name = "html")
    private String html;

    @Column(name = "habilitar")
    private Boolean habilitar;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "cardapio_produtos",
               joinColumns = @JoinColumn(name="cardapios_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="produtos_id", referencedColumnName="id"))
    private Set<Produto> produtos = new HashSet<>();

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

    public Cardapio nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Dia getDia() {
        return dia;
    }

    public Cardapio dia(Dia dia) {
        this.dia = dia;
        return this;
    }

    public void setDia(Dia dia) {
        this.dia = dia;
    }

    public String getPeriodo() {
        return periodo;
    }

    public Cardapio periodo(String periodo) {
        this.periodo = periodo;
        return this;
    }

    public void setPeriodo(String periodo) {
        this.periodo = periodo;
    }

    public String getDisposicao() {
        return disposicao;
    }

    public Cardapio disposicao(String disposicao) {
        this.disposicao = disposicao;
        return this;
    }

    public void setDisposicao(String disposicao) {
        this.disposicao = disposicao;
    }

    public String getHtml() {
        return html;
    }

    public Cardapio html(String html) {
        this.html = html;
        return this;
    }

    public void setHtml(String html) {
        this.html = html;
    }

    public Boolean isHabilitar() {
        return habilitar;
    }

    public Cardapio habilitar(Boolean habilitar) {
        this.habilitar = habilitar;
        return this;
    }

    public void setHabilitar(Boolean habilitar) {
        this.habilitar = habilitar;
    }

    public Set<Produto> getProdutos() {
        return produtos;
    }

    public Cardapio produtos(Set<Produto> produtos) {
        this.produtos = produtos;
        return this;
    }

    public Cardapio addProdutos(Produto produto) {
        this.produtos.add(produto);
        return this;
    }

    public Cardapio removeProdutos(Produto produto) {
        this.produtos.remove(produto);
        return this;
    }

    public void setProdutos(Set<Produto> produtos) {
        this.produtos = produtos;
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
        Cardapio cardapio = (Cardapio) o;
        if (cardapio.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cardapio.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cardapio{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", dia='" + getDia() + "'" +
            ", periodo='" + getPeriodo() + "'" +
            ", disposicao='" + getDisposicao() + "'" +
            ", html='" + getHtml() + "'" +
            ", habilitar='" + isHabilitar() + "'" +
            "}";
    }
}
