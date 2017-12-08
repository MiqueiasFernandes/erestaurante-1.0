package com.mikeias.erestaurante.repository;

import com.mikeias.erestaurante.domain.Impressora;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Impressora entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImpressoraRepository extends JpaRepository<Impressora, Long> {

}
