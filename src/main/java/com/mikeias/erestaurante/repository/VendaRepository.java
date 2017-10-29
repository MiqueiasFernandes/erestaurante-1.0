package com.mikeias.erestaurante.repository;

import com.mikeias.erestaurante.domain.Venda;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Venda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VendaRepository extends JpaRepository<Venda, Long> {

    List<Venda> findAllByComandaId(@Param("id") Long id);

}
