package com.mikeias.erestaurante.domain;

import java.time.ZonedDateTime;
import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Restaurante.class)
public abstract class Restaurante_ {

	public static volatile SingularAttribute<Restaurante, String> pagina;
	public static volatile SingularAttribute<Restaurante, String> localhost;
	public static volatile SingularAttribute<Restaurante, String> telefone;
	public static volatile SingularAttribute<Restaurante, String> codigo;
	public static volatile SingularAttribute<Restaurante, Endereco> endereco;
	public static volatile SingularAttribute<Restaurante, String> cnpj;
	public static volatile SetAttribute<Restaurante, Colaborador> proprietarios;
	public static volatile SingularAttribute<Restaurante, String> site;
	public static volatile SingularAttribute<Restaurante, String> nomeFantasia;
	public static volatile SingularAttribute<Restaurante, ZonedDateTime> funcadao;
	public static volatile SingularAttribute<Restaurante, String> celular;
	public static volatile SingularAttribute<Restaurante, byte[]> logo;
	public static volatile SingularAttribute<Restaurante, String> logoContentType;
	public static volatile SingularAttribute<Restaurante, String> codigoSegContribuinte;
	public static volatile SingularAttribute<Restaurante, Long> id;
	public static volatile SingularAttribute<Restaurante, String> razaoSocial;
	public static volatile SingularAttribute<Restaurante, String> licenca;
	public static volatile SingularAttribute<Restaurante, String> email;

}

