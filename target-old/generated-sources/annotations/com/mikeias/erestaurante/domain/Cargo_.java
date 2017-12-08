package com.mikeias.erestaurante.domain;

import com.mikeias.erestaurante.domain.enumeration.CargoTipo;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Cargo.class)
public abstract class Cargo_ {

	public static volatile SingularAttribute<Cargo, CargoTipo> tipo;
	public static volatile SingularAttribute<Cargo, Double> comissao;
	public static volatile SingularAttribute<Cargo, Double> salario;
	public static volatile SingularAttribute<Cargo, String> nome;
	public static volatile SingularAttribute<Cargo, Long> id;
	public static volatile SingularAttribute<Cargo, String> permissao;

}

