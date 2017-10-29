package com.mikeias.erestaurante.repository;

import com.mikeias.erestaurante.domain.Comanda;
import com.mikeias.erestaurante.domain.enumeration.Status;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Comanda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComandaRepository extends JpaRepository<Comanda, Long> {
    @Query("select distinct comanda from Comanda comanda left join fetch comanda.mesas left join fetch comanda.colaboradores")
    List<Comanda> findAllWithEagerRelationships();

    @Query("select comanda from Comanda comanda left join fetch comanda.mesas left join fetch comanda.colaboradores where comanda.id =:id")
    Comanda findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select distinct comanda from Comanda comanda left join fetch comanda.mesas left join fetch comanda.colaboradores where comanda.codigo = 'comanda-de-pedido-avulco'")
    List<Comanda> findAllWithEagerRelationshipsAvulco();

    @Query("select distinct comanda from Comanda comanda left join fetch comanda.mesas left join fetch comanda.colaboradores where comanda.status =:status")
    List<Comanda> findAllWithEagerRelationshipByStatus(@Param("status") Status status);

}
