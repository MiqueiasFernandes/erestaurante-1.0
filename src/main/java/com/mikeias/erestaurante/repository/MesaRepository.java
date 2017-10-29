package com.mikeias.erestaurante.repository;

import com.mikeias.erestaurante.domain.Mesa;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Mesa entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MesaRepository extends JpaRepository<Mesa, Long> {

    Mesa findOneByCodigo(String codigo);
}
