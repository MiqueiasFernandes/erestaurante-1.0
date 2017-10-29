package com.mikeias.erestaurante.repository;

import com.mikeias.erestaurante.domain.Restaurante;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Restaurante entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RestauranteRepository extends JpaRepository<Restaurante, Long> {
    @Query("select distinct restaurante from Restaurante restaurante left join fetch restaurante.proprietarios")
    List<Restaurante> findAllWithEagerRelationships();

    @Query("select restaurante from Restaurante restaurante left join fetch restaurante.proprietarios where restaurante.id =:id")
    Restaurante findOneWithEagerRelationships(@Param("id") Long id);

}
