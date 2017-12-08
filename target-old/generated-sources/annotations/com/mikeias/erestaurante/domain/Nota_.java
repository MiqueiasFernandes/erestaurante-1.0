package com.mikeias.erestaurante.domain;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Nota.class)
public abstract class Nota_ {

	public static volatile SingularAttribute<Nota, String> qrcode;
	public static volatile SingularAttribute<Nota, String> qrcodeImageContentType;
	public static volatile SingularAttribute<Nota, String> nfNotaInfoEmitente;
	public static volatile SingularAttribute<Nota, String> xml;
	public static volatile SingularAttribute<Nota, Long> id;
	public static volatile SingularAttribute<Nota, String> nfNotaInfoTotal;
	public static volatile SingularAttribute<Nota, String> nfNotaInfoCompra;
	public static volatile SingularAttribute<Nota, String> nfNotaInfoCobranca;
	public static volatile SingularAttribute<Nota, String> codigo;
	public static volatile SingularAttribute<Nota, String> nfNotaInfoDestinatario;
	public static volatile SingularAttribute<Nota, String> itens;
	public static volatile SingularAttribute<Nota, String> nfNotaInfoAvulsa;
	public static volatile SingularAttribute<Nota, Imposto> imposto;
	public static volatile SingularAttribute<Nota, String> nfNotaInfoCana;
	public static volatile SingularAttribute<Nota, String> nfNotaInfoLocal;
	public static volatile SingularAttribute<Nota, byte[]> qrcodeImage;
	public static volatile SingularAttribute<Nota, String> nfPessoaAutorizadaDownloadNFe;
	public static volatile SingularAttribute<Nota, String> nfNotaInfoPagamento;
	public static volatile SingularAttribute<Nota, String> nfNotaInfoInformacoesAdicionais;
	public static volatile SingularAttribute<Nota, String> nfNotaInfoExportacao;
	public static volatile SingularAttribute<Nota, String> nfIDENT;
	public static volatile SingularAttribute<Nota, String> nfNotaInfoIdentificacao;
	public static volatile SingularAttribute<Nota, String> nfNotaInfoTransporte;
	public static volatile SingularAttribute<Nota, String> versao;
	public static volatile SingularAttribute<Nota, String> danfe;
	public static volatile SingularAttribute<Nota, String> identificador;

}

