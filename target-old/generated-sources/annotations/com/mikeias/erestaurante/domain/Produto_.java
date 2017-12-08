package com.mikeias.erestaurante.domain;

import com.mikeias.erestaurante.domain.enumeration.Unidade;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Produto.class)
public abstract class Produto_ {

	public static volatile SingularAttribute<Produto, String> codigo;
	public static volatile SingularAttribute<Produto, String> observacao;
	public static volatile SingularAttribute<Produto, Imposto> imposto;
	public static volatile SingularAttribute<Produto, Double> valor;
	public static volatile SingularAttribute<Produto, String> nome;
	public static volatile SingularAttribute<Produto, Unidade> unidade;
	public static volatile SingularAttribute<Produto, String> adicional;
	public static volatile SingularAttribute<Produto, String> descricao;
	public static volatile SingularAttribute<Produto, Double> preco;
	public static volatile SingularAttribute<Produto, Double> estoque;
	public static volatile SingularAttribute<Produto, byte[]> foto;
	public static volatile SingularAttribute<Produto, String> opcional;
	public static volatile SingularAttribute<Produto, String> html;
	public static volatile SingularAttribute<Produto, Long> id;
	public static volatile SingularAttribute<Produto, String> fornecedor;
	public static volatile SingularAttribute<Produto, String> fotoContentType;

}

