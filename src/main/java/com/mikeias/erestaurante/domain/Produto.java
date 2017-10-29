package com.mikeias.erestaurante.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

import com.mikeias.erestaurante.domain.enumeration.Unidade;

/**
 * NOVO ESQUEMA ERESTAURANTE
 */
@ApiModel(description = "NOVO ESQUEMA ERESTAURANTE")
@Entity
@Table(name = "produto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Produto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "nome")
    private String nome;

    @Column(name = "fornecedor")
    private String fornecedor;

    @Column(name = "estoque")
    private Double estoque;

    @Column(name = "valor")
    private Double valor;

    @Column(name = "preco")
    private Double preco;

    @Lob
    @Column(name = "foto")
    private byte[] foto;

    @Column(name = "foto_content_type")
    private String fotoContentType;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "html")
    private String html;

    @Column(name = "observacao")
    private String observacao;

    @Column(name = "opcional")
    private String opcional;

    @Column(name = "adicional")
    private String adicional;

    @Enumerated(EnumType.STRING)
    @Column(name = "unidade")
    private Unidade unidade;

    @ManyToOne
    private Imposto imposto;

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

    public Produto codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNome() {
        return nome;
    }

    public Produto nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getFornecedor() {
        return fornecedor;
    }

    public Produto fornecedor(String fornecedor) {
        this.fornecedor = fornecedor;
        return this;
    }

    public void setFornecedor(String fornecedor) {
        this.fornecedor = fornecedor;
    }

    public Double getEstoque() {
        return estoque;
    }

    public Produto estoque(Double estoque) {
        this.estoque = estoque;
        return this;
    }

    public void setEstoque(Double estoque) {
        this.estoque = estoque;
    }

    public Double getValor() {
        return valor;
    }

    public Produto valor(Double valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public Double getPreco() {
        return preco;
    }

    public Produto preco(Double preco) {
        this.preco = preco;
        return this;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public byte[] getFoto() {
        return foto;
    }

    public Produto foto(byte[] foto) {
        this.foto = foto;
        return this;
    }

    public void setFoto(byte[] foto) {
        this.foto = foto;
    }

    public String getFotoContentType() {
        return fotoContentType;
    }

    public Produto fotoContentType(String fotoContentType) {
        this.fotoContentType = fotoContentType;
        return this;
    }

    public void setFotoContentType(String fotoContentType) {
        this.fotoContentType = fotoContentType;
    }

    public String getDescricao() {
        return descricao;
    }

    public Produto descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getHtml() {
        return html;
    }

    public Produto html(String html) {
        this.html = html;
        return this;
    }

    public void setHtml(String html) {
        this.html = html;
    }

    public String getObservacao() {
        return observacao;
    }

    public Produto observacao(String observacao) {
        this.observacao = observacao;
        return this;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public String getOpcional() {
        return opcional;
    }

    public Produto opcional(String opcional) {
        this.opcional = opcional;
        return this;
    }

    public void setOpcional(String opcional) {
        this.opcional = opcional;
    }

    public String getAdicional() {
        return adicional;
    }

    public Produto adicional(String adicional) {
        this.adicional = adicional;
        return this;
    }

    public void setAdicional(String adicional) {
        this.adicional = adicional;
    }

    public Unidade getUnidade() {
        return unidade;
    }

    public Produto unidade(Unidade unidade) {
        this.unidade = unidade;
        return this;
    }

    public void setUnidade(Unidade unidade) {
        this.unidade = unidade;
    }

    public Imposto getImposto() {
        return imposto;
    }

    public Produto imposto(Imposto imposto) {
        this.imposto = imposto;
        return this;
    }

    public void setImposto(Imposto imposto) {
        this.imposto = imposto;
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
        Produto produto = (Produto) o;
        if (produto.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), produto.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Produto{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", nome='" + getNome() + "'" +
            ", fornecedor='" + getFornecedor() + "'" +
            ", estoque='" + getEstoque() + "'" +
            ", valor='" + getValor() + "'" +
            ", preco='" + getPreco() + "'" +
            ", foto='" + getFoto() + "'" +
            ", fotoContentType='" + fotoContentType + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", html='" + getHtml() + "'" +
            ", observacao='" + getObservacao() + "'" +
            ", opcional='" + getOpcional() + "'" +
            ", adicional='" + getAdicional() + "'" +
            ", unidade='" + getUnidade() + "'" +
            "}";
    }
}
