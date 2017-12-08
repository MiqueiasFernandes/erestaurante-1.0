package com.mikeias.erestaurante.domain;

import com.mikeias.erestaurante.domain.enumeration.VendaStatus;
import java.time.ZonedDateTime;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Venda.class)
public abstract class Venda_ {

	public static volatile SingularAttribute<Venda, Double> valorizacao;
	public static volatile SingularAttribute<Venda, ZonedDateTime> data;
	public static volatile SingularAttribute<Venda, Double> desconto;
	public static volatile SingularAttribute<Venda, Produto> produto;
	public static volatile SingularAttribute<Venda, Long> id;
	public static volatile SingularAttribute<Venda, Comanda> comanda;
	public static volatile SingularAttribute<Venda, Double> quantidade;
	public static volatile SingularAttribute<Venda, VendaStatus> status;

}

