package com.mikeias.erestaurante.repository;

import com.mikeias.erestaurante.domain.Lancamento;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;

import java.util.List;


/**
 * Spring Data JPA repository for the Lancamento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LancamentoRepository extends JpaRepository<Lancamento, Long> {

    List<Lancamento> findAllByComandaId(Long id);
}
