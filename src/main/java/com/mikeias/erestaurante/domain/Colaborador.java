package com.mikeias.erestaurante.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
 * A Colaborador.
 */
@Entity
@Table(name = "colaborador")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Colaborador implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "nascimento")
    private ZonedDateTime nascimento;

    @Column(name = "sexomasculino")
    private Boolean sexomasculino;

    @Column(name = "documento")
    private String documento;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "email")
    private String email;

    @Column(name = "horario")
    private String horario;

    @Lob
    @Column(name = "preferencia")
    private String preferencia;

    @OneToOne(optional = false)
    @NotNull
    @JoinColumn(unique = true)
    private User usuario;

    @OneToOne
    @JoinColumn(unique = true)
    private Endereco endereco;

    @OneToMany(mappedBy = "colaborador")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Lancamento> lancamentos = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @NotNull
    @JoinTable(name = "colaborador_cargos",
               joinColumns = @JoinColumn(name="colaboradors_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="cargos_id", referencedColumnName="id"))
    private Set<Cargo> cargos = new HashSet<>();

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

    public Colaborador nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public ZonedDateTime getNascimento() {
        return nascimento;
    }

    public Colaborador nascimento(ZonedDateTime nascimento) {
        this.nascimento = nascimento;
        return this;
    }

    public void setNascimento(ZonedDateTime nascimento) {
        this.nascimento = nascimento;
    }

    public Boolean isSexomasculino() {
        return sexomasculino;
    }

    public Colaborador sexomasculino(Boolean sexomasculino) {
        this.sexomasculino = sexomasculino;
        return this;
    }

    public void setSexomasculino(Boolean sexomasculino) {
        this.sexomasculino = sexomasculino;
    }

    public String getDocumento() {
        return documento;
    }

    public Colaborador documento(String documento) {
        this.documento = documento;
        return this;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getTelefone() {
        return telefone;
    }

    public Colaborador telefone(String telefone) {
        this.telefone = telefone;
        return this;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public Colaborador email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getHorario() {
        return horario;
    }

    public Colaborador horario(String horario) {
        this.horario = horario;
        return this;
    }

    public void setHorario(String horario) {
        this.horario = horario;
    }

    public String getPreferencia() {
        return preferencia;
    }

    public Colaborador preferencia(String preferencia) {
        this.preferencia = preferencia;
        return this;
    }

    public void setPreferencia(String preferencia) {
        this.preferencia = preferencia;
    }

    public User getUsuario() {
        return usuario;
    }

    public Colaborador usuario(User user) {
        this.usuario = user;
        return this;
    }

    public void setUsuario(User user) {
        this.usuario = user;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public Colaborador endereco(Endereco endereco) {
        this.endereco = endereco;
        return this;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public Set<Lancamento> getLancamentos() {
        return lancamentos;
    }

    public Colaborador lancamentos(Set<Lancamento> lancamentos) {
        this.lancamentos = lancamentos;
        return this;
    }

    public Colaborador addLancamento(Lancamento lancamento) {
        this.lancamentos.add(lancamento);
        lancamento.setColaborador(this);
        return this;
    }

    public Colaborador removeLancamento(Lancamento lancamento) {
        this.lancamentos.remove(lancamento);
        lancamento.setColaborador(null);
        return this;
    }

    public void setLancamentos(Set<Lancamento> lancamentos) {
        this.lancamentos = lancamentos;
    }

    public Set<Cargo> getCargos() {
        return cargos;
    }

    public Colaborador cargos(Set<Cargo> cargos) {
        this.cargos = cargos;
        return this;
    }

    public Colaborador addCargos(Cargo cargo) {
        this.cargos.add(cargo);
        return this;
    }

    public Colaborador removeCargos(Cargo cargo) {
        this.cargos.remove(cargo);
        return this;
    }

    public void setCargos(Set<Cargo> cargos) {
        this.cargos = cargos;
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
        Colaborador colaborador = (Colaborador) o;
        if (colaborador.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), colaborador.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Colaborador{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", nascimento='" + getNascimento() + "'" +
            ", sexomasculino='" + isSexomasculino() + "'" +
            ", documento='" + getDocumento() + "'" +
            ", telefone='" + getTelefone() + "'" +
            ", email='" + getEmail() + "'" +
            ", horario='" + getHorario() + "'" +
            ", preferencia='" + getPreferencia() + "'" +
            "}";
    }
}
