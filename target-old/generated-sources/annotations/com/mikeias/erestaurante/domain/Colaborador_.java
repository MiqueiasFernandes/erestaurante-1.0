package com.mikeias.erestaurante.domain;

import java.time.ZonedDateTime;
import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Colaborador.class)
public abstract class Colaborador_ {

	public static volatile SingularAttribute<Colaborador, ZonedDateTime> nascimento;
	public static volatile SingularAttribute<Colaborador, String> telefone;
	public static volatile SingularAttribute<Colaborador, String> horario;
	public static volatile SingularAttribute<Colaborador, Endereco> endereco;
	public static volatile SingularAttribute<Colaborador, String> documento;
	public static volatile SingularAttribute<Colaborador, String> nome;
	public static volatile SetAttribute<Colaborador, Cargo> cargos;
	public static volatile SetAttribute<Colaborador, Lancamento> lancamentos;
	public static volatile SingularAttribute<Colaborador, Boolean> sexomasculino;
	public static volatile SingularAttribute<Colaborador, String> preferencia;
	public static volatile SingularAttribute<Colaborador, User> usuario;
	public static volatile SingularAttribute<Colaborador, Long> id;
	public static volatile SingularAttribute<Colaborador, String> email;

}

