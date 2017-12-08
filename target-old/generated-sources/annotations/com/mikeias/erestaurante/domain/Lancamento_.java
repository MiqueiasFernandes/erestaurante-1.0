package com.mikeias.erestaurante.domain;

import com.mikeias.erestaurante.domain.enumeration.Natureza;
import java.time.ZonedDateTime;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Lancamento.class)
public abstract class Lancamento_ {

	public static volatile SingularAttribute<Lancamento, Integer> parcelas;
	public static volatile SingularAttribute<Lancamento, Colaborador> colaborador;
	public static volatile SingularAttribute<Lancamento, String> observacao;
	public static volatile SingularAttribute<Lancamento, ZonedDateTime> data;
	public static volatile SingularAttribute<Lancamento, Boolean> isentrada;
	public static volatile SingularAttribute<Lancamento, Double> valor;
	public static volatile SingularAttribute<Lancamento, Long> id;
	public static volatile SingularAttribute<Lancamento, Natureza> natureza;
	public static volatile SingularAttribute<Lancamento, Comanda> comanda;
	public static volatile SingularAttribute<Lancamento, ZonedDateTime> vencimento;

}

