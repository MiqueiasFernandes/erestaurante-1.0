package com.mikeias.erestaurante.service;

import com.mikeias.erestaurante.domain.Cargo;
import com.mikeias.erestaurante.repository.CargoRepository;
import java.util.List;

public class PrivilegioService {


    public static boolean hasPermissao(CargoRepository cargoRepository, String entidade, int nivel) {

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