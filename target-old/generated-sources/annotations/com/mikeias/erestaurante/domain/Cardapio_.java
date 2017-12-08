package com.mikeias.erestaurante.domain;

import com.mikeias.erestaurante.domain.enumeration.Dia;
import javax.annotation.Generated;
import javax.persistence.metamodel.SetAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Cardapio.class)
public abstract class Cardapio_ {

	public static volatile SingularAttribute<Cardapio, String> periodo;
	public static volatile SetAttribute<Cardapio, Produto> produtos;
	public static volatile SingularAttribute<Cardapio, String> nome;
	public static volatile SingularAttribute<Cardapio, String> html;
	public static volatile SingularAttribute<Cardapio, Boolean> habilitar;
	public static volatile SingularAttribute<Cardapio, Long> id;
	public static volatile SingularAttribute<Cardapio, String> disposicao;
	public static volatile SingularAttribute<Cardapio, Dia> dia;

}

