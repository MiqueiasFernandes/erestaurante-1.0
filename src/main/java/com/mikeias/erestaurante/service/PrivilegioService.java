package com.mikeias.erestaurante.service;

import com.mikeias.erestaurante.domain.Cargo;
import com.mikeias.erestaurante.repository.CargoRepository;
import com.mikeias.erestaurante.repository.RestauranteRepository;

import java.util.List;

public class PrivilegioService {


    public static boolean hasPermissao(CargoRepository cargoRepository, String entidade, int nivel) {

        if (cargoRepository.countCargos() < 3) {
            for (int i=0; i < 100; i++) {
                System.out.println("ATENÇÃO É NECESARIO CADASTRAR 3 CARGOS PARA O SISTEMA ESTAR SEGURURO!");
                System.err.println("ATENÇÃO É NECESARIO CADASTRAR 3 CARGOS PARA O SISTEMA ESTAR SEGURURO!");
            }
            return true;
        }

        List<Cargo> cgs = cargoRepository.getCargosOfCurrentUser();
        for (Cargo c : cgs) {

            if (c.getPermissao() != null &&
                    !c.getPermissao().isEmpty() &&
                    c.getPermissao().contains(entidade + "-" + getNivel(nivel)))
                return true;

        }

        return false;
    }


    public static String getNivel(int nivel) {
        switch (nivel) {
            case 1:
                return "visualizar";
            case 2:
                return "adicionar";
            case 3:
                return "editar";
            case 4:
                return "deletar";
        }
        return null;
    }


    public static boolean podeVer(CargoRepository cargoRepository, String entidade) {
        return hasPermissao(cargoRepository, entidade, 1);
    }

    public static boolean podeCriar(CargoRepository cargoRepository, String entidade) {
        return hasPermissao(cargoRepository, entidade, 2);
    }

    public static boolean podeEditar(CargoRepository cargoRepository, String entidade) {
        return hasPermissao(cargoRepository, entidade, 3);
    }

    public static boolean podeDeletar(CargoRepository cargoRepository, String entidade) {
        return hasPermissao(cargoRepository, entidade, 4);
    }


}
