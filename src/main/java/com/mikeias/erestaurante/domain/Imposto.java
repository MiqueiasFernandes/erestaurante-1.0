package com.mikeias.erestaurante.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Imposto.
 */
@Entity
@Table(name = "imposto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Imposto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "iv_tot_trib")
    private Double ivTotTrib;

    @Column(name = "i_icms")
    private Double iICMS;

    @Column(name = "i_ipi")
    private Double iIPI;

    @Column(name = "i_ii")
    private Double iII;

    @Column(name = "i_issqn")
    private Double iISSQN;

    @Column(name = "i_pis")
    private Double iPIS;

    @Column(name = "i_pisst")
    private Double iPISST;

    @Column(name = "i_cofins")
    private Double iCOFINS;

    @Column(name = "i_cofinsst")
    private Double iCOFINSST;

    @Column(name = "i_icmsuf_dest")
    private Double iICMSUFDest;

    @Column(name = "ioutros")
    private String ioutros;

    @Column(name = "configurar")
    private String configurar;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public Imposto descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getIvTotTrib() {
        return ivTotTrib;
    }

    public Imposto ivTotTrib(Double ivTotTrib) {
        this.ivTotTrib = ivTotTrib;
        return this;
    }

    public void setIvTotTrib(Double ivTotTrib) {
        this.ivTotTrib = ivTotTrib;
    }

    public Double getiICMS() {
        return iICMS;
    }

    public Imposto iICMS(Double iICMS) {
        this.iICMS = iICMS;
        return this;
    }

    public void setiICMS(Double iICMS) {
        this.iICMS = iICMS;
    }

    public Double getiIPI() {
        return iIPI;
    }

    public Imposto iIPI(Double iIPI) {
        this.iIPI = iIPI;
        return this;
    }

    public void setiIPI(Double iIPI) {
        this.iIPI = iIPI;
    }

    public Double getiII() {
        return iII;
    }

    public Imposto iII(Double iII) {
        this.iII = iII;
        return this;
    }

    public void setiII(Double iII) {
        this.iII = iII;
    }

    public Double getiISSQN() {
        return iISSQN;
    }

    public Imposto iISSQN(Double iISSQN) {
        this.iISSQN = iISSQN;
        return this;
    }

    public void setiISSQN(Double iISSQN) {
        this.iISSQN = iISSQN;
    }

    public Double getiPIS() {
        return iPIS;
    }

    public Imposto iPIS(Double iPIS) {
        this.iPIS = iPIS;
        return this;
    }

    public void setiPIS(Double iPIS) {
        this.iPIS = iPIS;
    }

    public Double getiPISST() {
        return iPISST;
    }

    public Imposto iPISST(Double iPISST) {
        this.iPISST = iPISST;
        return this;
    }

    public void setiPISST(Double iPISST) {
        this.iPISST = iPISST;
    }

    public Double getiCOFINS() {
        return iCOFINS;
    }

    public Imposto iCOFINS(Double iCOFINS) {
        this.iCOFINS = iCOFINS;
        return this;
    }

    public void setiCOFINS(Double iCOFINS) {
        this.iCOFINS = iCOFINS;
    }

    public Double getiCOFINSST() {
        return iCOFINSST;
    }

    public Imposto iCOFINSST(Double iCOFINSST) {
        this.iCOFINSST = iCOFINSST;
        return this;
    }

    public void setiCOFINSST(Double iCOFINSST) {
        this.iCOFINSST = iCOFINSST;
    }

    public Double getiICMSUFDest() {
        return iICMSUFDest;
    }

    public Imposto iICMSUFDest(Double iICMSUFDest) {
        this.iICMSUFDest = iICMSUFDest;
        return this;
    }

    public void setiICMSUFDest(Double iICMSUFDest) {
        this.iICMSUFDest = iICMSUFDest;
    }

    public String getIoutros() {
        return ioutros;
    }

    public Imposto ioutros(String ioutros) {
        this.ioutros = ioutros;
        return this;
    }

    public void setIoutros(String ioutros) {
        this.ioutros = ioutros;
    }

    public String getConfigurar() {
        return configurar;
    }

    public Imposto configurar(String configurar) {
        this.configurar = configurar;
        return this;
    }

    public void setConfigurar(String configurar) {
        this.configurar = configurar;
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
        Imposto imposto = (Imposto) o;
        if (imposto.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), imposto.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Imposto{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", ivTotTrib='" + getIvTotTrib() + "'" +
            ", iICMS='" + getiICMS() + "'" +
            ", iIPI='" + getiIPI() + "'" +
            ", iII='" + getiII() + "'" +
            ", iISSQN='" + getiISSQN() + "'" +
            ", iPIS='" + getiPIS() + "'" +
            ", iPISST='" + getiPISST() + "'" +
            ", iCOFINS='" + getiCOFINS() + "'" +
            ", iCOFINSST='" + getiCOFINSST() + "'" +
            ", iICMSUFDest='" + getiICMSUFDest() + "'" +
            ", ioutros='" + getIoutros() + "'" +
            ", configurar='" + getConfigurar() + "'" +
            "}";
    }
}
