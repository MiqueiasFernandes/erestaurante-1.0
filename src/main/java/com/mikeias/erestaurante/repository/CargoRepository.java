package com.mikeias.erestaurante.repository;

import com.mikeias.erestaurante.domain.Cargo;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Cargo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CargoRepository extends JpaRepository<Cargo, Long> {
   ///find cargo from current user

    @Query("select colaborador.cargos from Colaborador colaborador where colaborador.usuario.login = ?#{principal.username}")
    List<Cargo> getCargosOfCurrentUser();

}
