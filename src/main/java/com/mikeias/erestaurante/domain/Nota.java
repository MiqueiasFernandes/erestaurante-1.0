package com.mikeias.erestaurante.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Nota.
 */
@Entity
@Table(name = "nota")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Nota implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nf_ident")
    private String nfIDENT;

    @Column(name = "qrcode")
    private String qrcode;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "identificador")
    private String identificador;

    @Column(name = "versao")
    private String versao;

    @Column(name = "nf_nota_info_identificacao")
    private String nfNotaInfoIdentificacao;

    @Column(name = "nf_nota_info_emitente")
    private String nfNotaInfoEmitente;

    @Column(name = "nf_nota_info_avulsa")
    private String nfNotaInfoAvulsa;

    @Column(name = "nf_nota_info_destinatario")
    private String nfNotaInfoDestinatario;

    @Column(name = "nf_nota_info_local")
    private String nfNotaInfoLocal;

    @Column(name = "nf_pessoa_autorizada_download_n_fe")
    private String nfPessoaAutorizadaDownloadNFe;

    @Column(name = "itens")
    private String itens;

    @Column(name = "nf_nota_info_total")
    private String nfNotaInfoTotal;

    @Column(name = "nf_nota_info_transporte")
    private String nfNotaInfoTransporte;

    @Column(name = "nf_nota_info_cobranca")
    private String nfNotaInfoCobranca;

    @Column(name = "nf_nota_info_pagamento")
    private String nfNotaInfoPagamento;

    @Column(name = "nf_nota_info_informacoes_adicionais")
    private String nfNotaInfoInformacoesAdicionais;

    @Column(name = "nf_nota_info_exportacao")
    private String nfNotaInfoExportacao;

    @Column(name = "nf_nota_info_compra")
    private String nfNotaInfoCompra;

    @Column(name = "nf_nota_info_cana")
    private String nfNotaInfoCana;

    @Lob
    @Column(name = "xml")
    private String xml;

    @Lob
    @Column(name = "danfe")
    private String danfe;

    @Lob
    @Column(name = "qrcode_image")
    private byte[] qrcodeImage;

    @Column(name = "qrcode_image_content_type")
    private String qrcodeImageContentType;

    @ManyToOne
    private Imposto imposto;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNfIDENT() {
        return nfIDENT;
    }

    public Nota nfIDENT(String nfIDENT) {
        this.nfIDENT = nfIDENT;
        return this;
    }

    public void setNfIDENT(String nfIDENT) {
        this.nfIDENT = nfIDENT;
    }

    public String getQrcode() {
        return qrcode;
    }

    public Nota qrcode(String qrcode) {
        this.qrcode = qrcode;
        return this;
    }

    public void setQrcode(String qrcode) {
        this.qrcode = qrcode;
    }

    public String getCodigo() {
        return codigo;
    }

    public Nota codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getIdentificador() {
        return identificador;
    }

    public Nota identificador(String identificador) {
        this.identificador = identificador;
        return this;
    }

    public void setIdentificador(String identificador) {
        this.identificador = identificador;
    }

    public String getVersao() {
        return versao;
    }

    public Nota versao(String versao) {
        this.versao = versao;
        return this;
    }

    public void setVersao(String versao) {
        this.versao = versao;
    }

    public String getNfNotaInfoIdentificacao() {
        return nfNotaInfoIdentificacao;
    }

    public Nota nfNotaInfoIdentificacao(String nfNotaInfoIdentificacao) {
        this.nfNotaInfoIdentificacao = nfNotaInfoIdentificacao;
        return this;
    }

    public void setNfNotaInfoIdentificacao(String nfNotaInfoIdentificacao) {
        this.nfNotaInfoIdentificacao = nfNotaInfoIdentificacao;
    }

    public String getNfNotaInfoEmitente() {
        return nfNotaInfoEmitente;
    }

    public Nota nfNotaInfoEmitente(String nfNotaInfoEmitente) {
        this.nfNotaInfoEmitente = nfNotaInfoEmitente;
        return this;
    }

    public void setNfNotaInfoEmitente(String nfNotaInfoEmitente) {
        this.nfNotaInfoEmitente = nfNotaInfoEmitente;
    }

    public String getNfNotaInfoAvulsa() {
        return nfNotaInfoAvulsa;
    }

    public Nota nfNotaInfoAvulsa(String nfNotaInfoAvulsa) {
        this.nfNotaInfoAvulsa = nfNotaInfoAvulsa;
        return this;
    }

    public void setNfNotaInfoAvulsa(String nfNotaInfoAvulsa) {
        this.nfNotaInfoAvulsa = nfNotaInfoAvulsa;
    }

    public String getNfNotaInfoDestinatario() {
        return nfNotaInfoDestinatario;
    }

    public Nota nfNotaInfoDestinatario(String nfNotaInfoDestinatario) {
        this.nfNotaInfoDestinatario = nfNotaInfoDestinatario;
        return this;
    }

    public void setNfNotaInfoDestinatario(String nfNotaInfoDestinatario) {
        this.nfNotaInfoDestinatario = nfNotaInfoDestinatario;
    }

    public String getNfNotaInfoLocal() {
        return nfNotaInfoLocal;
    }

    public Nota nfNotaInfoLocal(String nfNotaInfoLocal) {
        this.nfNotaInfoLocal = nfNotaInfoLocal;
        return this;
    }

    public void setNfNotaInfoLocal(String nfNotaInfoLocal) {
        this.nfNotaInfoLocal = nfNotaInfoLocal;
    }

    public String getNfPessoaAutorizadaDownloadNFe() {
        return nfPessoaAutorizadaDownloadNFe;
    }

    public Nota nfPessoaAutorizadaDownloadNFe(String nfPessoaAutorizadaDownloadNFe) {
        this.nfPessoaAutorizadaDownloadNFe = nfPessoaAutorizadaDownloadNFe;
        return this;
    }

    public void setNfPessoaAutorizadaDownloadNFe(String nfPessoaAutorizadaDownloadNFe) {
        this.nfPessoaAutorizadaDownloadNFe = nfPessoaAutorizadaDownloadNFe;
    }

    public String getItens() {
        return itens;
    }

    public Nota itens(String itens) {
        this.itens = itens;
        return this;
    }

    public void setItens(String itens) {
        this.itens = itens;
    }

    public String getNfNotaInfoTotal() {
        return nfNotaInfoTotal;
    }

    public Nota nfNotaInfoTotal(String nfNotaInfoTotal) {
        this.nfNotaInfoTotal = nfNotaInfoTotal;
        return this;
    }

    public void setNfNotaInfoTotal(String nfNotaInfoTotal) {
        this.nfNotaInfoTotal = nfNotaInfoTotal;
    }

    public String getNfNotaInfoTransporte() {
        return nfNotaInfoTransporte;
    }

    public Nota nfNotaInfoTransporte(String nfNotaInfoTransporte) {
        this.nfNotaInfoTransporte = nfNotaInfoTransporte;
        return this;
    }

    public void setNfNotaInfoTransporte(String nfNotaInfoTransporte) {
        this.nfNotaInfoTransporte = nfNotaInfoTransporte;
    }

    public String getNfNotaInfoCobranca() {
        return nfNotaInfoCobranca;
    }

    public Nota nfNotaInfoCobranca(String nfNotaInfoCobranca) {
        this.nfNotaInfoCobranca = nfNotaInfoCobranca;
        return this;
    }

    public void setNfNotaInfoCobranca(String nfNotaInfoCobranca) {
        this.nfNotaInfoCobranca = nfNotaInfoCobranca;
    }

    public String getNfNotaInfoPagamento() {
        return nfNotaInfoPagamento;
    }

    public Nota nfNotaInfoPagamento(String nfNotaInfoPagamento) {
        this.nfNotaInfoPagamento = nfNotaInfoPagamento;
        return this;
    }

    public void setNfNotaInfoPagamento(String nfNotaInfoPagamento) {
        this.nfNotaInfoPagamento = nfNotaInfoPagamento;
    }

    public String getNfNotaInfoInformacoesAdicionais() {
        return nfNotaInfoInformacoesAdicionais;
    }

    public Nota nfNotaInfoInformacoesAdicionais(String nfNotaInfoInformacoesAdicionais) {
        this.nfNotaInfoInformacoesAdicionais = nfNotaInfoInformacoesAdicionais;
        return this;
    }

    public void setNfNotaInfoInformacoesAdicionais(String nfNotaInfoInformacoesAdicionais) {
        this.nfNotaInfoInformacoesAdicionais = nfNotaInfoInformacoesAdicionais;
    }

    public String getNfNotaInfoExportacao() {
        return nfNotaInfoExportacao;
    }

    public Nota nfNotaInfoExportacao(String nfNotaInfoExportacao) {
        this.nfNotaInfoExportacao = nfNotaInfoExportacao;
        return this;
    }

    public void setNfNotaInfoExportacao(String nfNotaInfoExportacao) {
        this.nfNotaInfoExportacao = nfNotaInfoExportacao;
    }

    public String getNfNotaInfoCompra() {
        return nfNotaInfoCompra;
    }

    public Nota nfNotaInfoCompra(String nfNotaInfoCompra) {
        this.nfNotaInfoCompra = nfNotaInfoCompra;
        return this;
    }

    public void setNfNotaInfoCompra(String nfNotaInfoCompra) {
        this.nfNotaInfoCompra = nfNotaInfoCompra;
    }

    public String getNfNotaInfoCana() {
        return nfNotaInfoCana;
    }

    public Nota nfNotaInfoCana(String nfNotaInfoCana) {
        this.nfNotaInfoCana = nfNotaInfoCana;
        return this;
    }

    public void setNfNotaInfoCana(String nfNotaInfoCana) {
        this.nfNotaInfoCana = nfNotaInfoCana;
    }

    public String getXml() {
        return xml;
    }

    public Nota xml(String xml) {
        this.xml = xml;
        return this;
    }

    public void setXml(String xml) {
        this.xml = xml;
    }

    public String getDanfe() {
        return danfe;
    }

    public Nota danfe(String danfe) {
        this.danfe = danfe;
        return this;
    }

    public void setDanfe(String danfe) {
        this.danfe = danfe;
    }

    public byte[] getQrcodeImage() {
        return qrcodeImage;
    }

    public Nota qrcodeImage(byte[] qrcodeImage) {
        this.qrcodeImage = qrcodeImage;
        return this;
    }

    public void setQrcodeImage(byte[] qrcodeImage) {
        this.qrcodeImage = qrcodeImage;
    }

    public String getQrcodeImageContentType() {
        return qrcodeImageContentType;
    }

    public Nota qrcodeImageContentType(String qrcodeImageContentType) {
        this.qrcodeImageContentType = qrcodeImageContentType;
        return this;
    }

    public void setQrcodeImageContentType(String qrcodeImageContentType) {
        this.qrcodeImageContentType = qrcodeImageContentType;
    }

    public Imposto getImposto() {
        return imposto;
    }

    public Nota imposto(Imposto imposto) {
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
        Nota nota = (Nota) o;
        if (nota.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), nota.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Nota{" +
            "id=" + getId() +
            ", nfIDENT='" + getNfIDENT() + "'" +
            ", qrcode='" + getQrcode() + "'" +
            ", codigo='" + getCodigo() + "'" +
            ", identificador='" + getIdentificador() + "'" +
            ", versao='" + getVersao() + "'" +
            ", nfNotaInfoIdentificacao='" + getNfNotaInfoIdentificacao() + "'" +
            ", nfNotaInfoEmitente='" + getNfNotaInfoEmitente() + "'" +
            ", nfNotaInfoAvulsa='" + getNfNotaInfoAvulsa() + "'" +
            ", nfNotaInfoDestinatario='" + getNfNotaInfoDestinatario() + "'" +
            ", nfNotaInfoLocal='" + getNfNotaInfoLocal() + "'" +
            ", nfPessoaAutorizadaDownloadNFe='" + getNfPessoaAutorizadaDownloadNFe() + "'" +
            ", itens='" + getItens() + "'" +
            ", nfNotaInfoTotal='" + getNfNotaInfoTotal() + "'" +
            ", nfNotaInfoTransporte='" + getNfNotaInfoTransporte() + "'" +
            ", nfNotaInfoCobranca='" + getNfNotaInfoCobranca() + "'" +
            ", nfNotaInfoPagamento='" + getNfNotaInfoPagamento() + "'" +
            ", nfNotaInfoInformacoesAdicionais='" + getNfNotaInfoInformacoesAdicionais() + "'" +
            ", nfNotaInfoExportacao='" + getNfNotaInfoExportacao() + "'" +
            ", nfNotaInfoCompra='" + getNfNotaInfoCompra() + "'" +
            ", nfNotaInfoCana='" + getNfNotaInfoCana() + "'" +
            ", xml='" + getXml() + "'" +
            ", danfe='" + getDanfe() + "'" +
            ", qrcodeImage='" + getQrcodeImage() + "'" +
            ", qrcodeImageContentType='" + qrcodeImageContentType + "'" +
            "}";
    }
}
