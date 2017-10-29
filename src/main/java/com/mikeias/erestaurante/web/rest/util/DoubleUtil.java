package com.mikeias.erestaurante.web.rest.util;

import com.mikeias.erestaurante.domain.*;

public class DoubleUtil {

    public static Venda handleVenda(Venda venda) {
        venda.setDesconto(zerarDouble(venda.getDesconto()));
        venda.setQuantidade(zerarDouble(venda.getQuantidade()));
        venda.setValorizacao(zerarDouble(venda.getValorizacao()));
        return venda;
    }

    public static Comanda handleComanda(Comanda comanda) {
       comanda.setTotal(zerarDouble(comanda.getTotal()));
       comanda.setGorjeta(zerarDouble(comanda.getGorjeta()));
       return comanda;
    }

    public static Produto handleProduto(Produto produto) {
        produto.setEstoque(zerarDouble(produto.getEstoque()));
        produto.setPreco(zerarDouble(produto.getPreco()));
        produto.setValor(zerarDouble(produto.getValor()));
        return produto;
    }

    public static Cargo handleCargo(Cargo cargo) {
        cargo.setSalario(zerarDouble(cargo.getSalario()));
        cargo.setComissao(zerarDouble(cargo.getComissao()));
        return cargo;
    }

    public static Lancamento handleLancamento(Lancamento lancamento) {
        lancamento.setValor(zerarDouble(lancamento.getValor()));
        return lancamento;
    }


    public static Imposto handleImposto(Imposto imposto) {

        imposto.setiCOFINS(zerarDouble(imposto.getiCOFINS()));
        imposto.setiCOFINSST(zerarDouble(imposto.getiCOFINSST()));
        imposto.setiICMS(zerarDouble(imposto.getiICMS()));
        imposto.setiICMSUFDest(zerarDouble(imposto.getiICMSUFDest()));
        imposto.setiII(zerarDouble(imposto.getiII()));
        imposto.setiIPI(zerarDouble(imposto.getiIPI()));
        imposto.setiISSQN(zerarDouble(imposto.getiISSQN()));
        imposto.setiPIS(zerarDouble(imposto.getiPIS()));
        imposto.setiPISST(zerarDouble(imposto.getiPISST()));
        imposto.setIvTotTrib(zerarDouble(imposto.getIvTotTrib()));

        return imposto;
    }


    public static Double zerarDouble(Double doub) {
        if (doub == null || doub.isNaN() || doub.isInfinite())
            return 0.0;
        return doub;
    }
}
