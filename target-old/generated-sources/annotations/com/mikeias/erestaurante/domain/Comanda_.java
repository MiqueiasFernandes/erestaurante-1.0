package com.mikeias.erestaurante.domain;

import com.mikeias.erestaurante.domain.enumeration.Status;
import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Comanda.class)
public abstract class Comanda_ {

	public static volatile SetAttribute<Comanda, Colaborador> colaboradores;
	public static volatile SingularAttribute<Comanda, Double> gorjeta;
	public static volatile SingularAttribute<Comanda, String> codigo;
	public static volatile SingularAttribute<Comanda, Double> total;
	public static volatile SetAttribute<Comanda, Lancamento> lancamentos;
	public static volatile SetAttribute<Comanda, Mesa> mesas;
	public static volatile SingularAttribute<Comanda, Cliente> pagador;
	public static volatile SingularAttribute<Comanda, Long> id;
	public static volatile SingularAttribute<Comanda, Nota> nota;
	public static volatile SingularAttribute<Comanda, Status> status;

}

