package com.mikeias.erestaurante.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Restaurante.
 */
@Entity
@Table(name = "restaurante")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Restaurante implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "razao_social")
    private String razaoSocial;

    @Column(name = "nome_fantasia")
    private String nomeFantasia;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "celular")
    private String celular;

    @Column(name = "email")
    private String email;

    @Column(name = "site")
    private String site;

    @Column(name = "cnpj")
    private String cnpj;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "codigo_seg_contribuinte")
    private String codigoSegContribuinte;

    @Column(name = "licenca")
    private String licenca;

    @Column(name = "funcadao")
    private ZonedDateTime funcadao;

    @Lob
    @Column(name = "logo")
    private byte[] logo;

    @Column(name = "logo_content_type")
    private String logoContentType;

    @Lob
    @Column(name = "pagina")
    private String pagina;

    @Column(name = "localhost")
    private String localhost;

    @OneToOne
    @JoinColumn(unique = true)
    private Endereco endereco;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @NotNull
    @JoinTable(name = "restaurante_proprietario",
               joinColumns = @JoinColumn(name="restaurantes_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="proprietarios_id", referencedColumnName="id"))
    private Set<Colaborador> proprietarios = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRazaoSocial() {
        return razaoSocial;
    }

    public Restaurante razaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
        return this;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public String getNomeFantasia() {
        return nomeFantasia;
    }

    public Restaurante nomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
        return this;
    }

    public void setNomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
    }

    public String getTelefone() {
        return telefone;
    }

    public Restaurante telefone(String telefone) {
        this.telefone = telefone;
        return this;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getCelular() {
        return celular;
    }

    public Restaurante celular(String celular) {
        this.celular = celular;
        return this;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public String getEmail() {
        return email;
    }

    public Restaurante email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSite() {
        return site;
    }

    public Restaurante site(String site) {
        this.site = site;
        return this;
    }

    public void setSite(String site) {
        this.site = site;
    }

    public String getCnpj() {
        return cnpj;
    }

    public Restaurante cnpj(String cnpj) {
        this.cnpj = cnpj;
        return this;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getCodigo() {
        return codigo;
    }

    public Restaurante codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getCodigoSegContribuinte() {
        return codigoSegContribuinte;
    }

    public Restaurante codigoSegContribuinte(String codigoSegContribuinte) {
        this.codigoSegContribuinte = codigoSegContribuinte;
        return this;
    }

    public void setCodigoSegContribuinte(String codigoSegContribuinte) {
        this.codigoSegContribuinte = codigoSegContribuinte;
    }

    public String getLicenca() {
        return licenca;
    }

    public Restaurante licenca(String licenca) {
        this.licenca = licenca;
        return this;
    }

    public void setLicenca(String licenca) {
        this.licenca = licenca;
    }

    public ZonedDateTime getFuncadao() {
        return funcadao;
    }

    public Restaurante funcadao(ZonedDateTime funcadao) {
        this.funcadao = funcadao;
        return this;
    }

    public void setFuncadao(ZonedDateTime funcadao) {
        this.funcadao = funcadao;
    }

    public byte[] getLogo() {
        return logo;
    }

    public Restaurante logo(byte[] logo) {
        this.logo = logo;
        return this;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    public String getLogoContentType() {
        return logoContentType;
    }

    public Restaurante logoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
        return this;
    }

    public void setLogoContentType(String logoContentType) {
        this.logoContentType = logoContentType;
    }

    public String getPagina() {
        return pagina;
    }

    public Restaurante pagina(String pagina) {
        this.pagina = pagina;
        return this;
    }

    public void setPagina(String pagina) {
        this.pagina = pagina;
    }

    public String getLocalhost() {
        return localhost;
    }

    public Restaurante localhost(String localhost) {
        this.localhost = localhost;
        return this;
    }

    public void setLocalhost(String localhost) {
        this.localhost = localhost;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public Restaurante endereco(Endereco endereco) {
        this.endereco = endereco;
        return this;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public Set<Colaborador> getProprietarios() {
        return proprietarios;
    }

    public Restaurante proprietarios(Set<Colaborador> colaboradors) {
        this.proprietarios = colaboradors;
        return this;
    }

    public Restaurante addProprietario(Colaborador colaborador) {
        this.proprietarios.add(colaborador);
        return this;
    }

    public Restaurante removeProprietario(Colaborador colaborador) {
        this.proprietarios.remove(colaborador);
        return this;
    }

    public void setProprietarios(Set<Colaborador> colaboradors) {
        this.proprietarios = colaboradors;
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
        Restaurante restaurante = (Restaurante) o;
        if (restaurante.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), restaurante.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Restaurante{" +
            "id=" + getId() +
            ", razaoSocial='" + getRazaoSocial() + "'" +
            ", nomeFantasia='" + getNomeFantasia() + "'" +
            ", telefone='" + getTelefone() + "'" +
            ", celular='" + getCelular() + "'" +
            ", email='" + getEmail() + "'" +
            ", site='" + getSite() + "'" +
            ", cnpj='" + getCnpj() + "'" +
            ", codigo='" + getCodigo() + "'" +
            ", codigoSegContribuinte='" + getCodigoSegContribuinte() + "'" +
            ", licenca='" + getLicenca() + "'" +
            ", funcadao='" + getFuncadao() + "'" +
            ", logo='" + getLogo() + "'" +
            ", logoContentType='" + logoContentType + "'" +
            ", pagina='" + getPagina() + "'" +
            ", localhost='" + getLocalhost() + "'" +
            "}";
    }
}
