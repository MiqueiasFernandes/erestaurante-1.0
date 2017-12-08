package com.mikeias.erestaurante.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Mesa.class)
public abstract class Mesa_ {

	public static volatile SingularAttribute<Mesa, String> codigo;
	public static volatile SingularAttribute<Mesa, String> qrcodeContentType;
	public static volatile SingularAttribute<Mesa, byte[]> qrcode;
	public static volatile SingularAttribute<Mesa, Long> id;
	public static volatile SingularAttribute<Mesa, Integer> local;
	public static volatile SingularAttribute<Mesa, String> descricao;

}

