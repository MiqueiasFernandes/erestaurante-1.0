package com.mikeias.erestaurante.repository;

import com.mikeias.erestaurante.domain.Imposto;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Imposto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImpostoRepository extends JpaRepository<Imposto, Long> {

}
