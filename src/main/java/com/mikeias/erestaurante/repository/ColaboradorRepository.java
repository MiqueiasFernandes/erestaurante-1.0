package com.mikeias.erestaurante.repository;

import com.mikeias.erestaurante.domain.Colaborador;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Colaborador entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ColaboradorRepository extends JpaRepository<Colaborador, Long> {
    @Query("select distinct colaborador from Colaborador colaborador left join fetch colaborador.cargos")
    List<Colaborador> findAllWithEagerRelationships();

    @Query("select colaborador from Colaborador colaborador left join fetch colaborador.cargos where colaborador.id =:id")
    Colaborador findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select colaborador from Colaborador colaborador left join fetch colaborador.cargos where colaborador.usuario.login = ?#{principal.username}")
    Colaborador findByUsuarioIsCurrentUser();


}
