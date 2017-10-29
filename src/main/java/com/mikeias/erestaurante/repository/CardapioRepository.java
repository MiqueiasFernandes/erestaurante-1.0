package com.mikeias.erestaurante.repository;

import com.mikeias.erestaurante.domain.Cardapio;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Cardapio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CardapioRepository extends JpaRepository<Cardapio, Long> {
    @Query("select distinct cardapio from Cardapio cardapio left join fetch cardapio.produtos")
    List<Cardapio> findAllWithEagerRelationships();

    @Query("select cardapio from Cardapio cardapio left join fetch cardapio.produtos where cardapio.id =:id")
    Cardapio findOneWithEagerRelationships(@Param("id") Long id);

}
