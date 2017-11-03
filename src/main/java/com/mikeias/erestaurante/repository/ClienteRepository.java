package com.mikeias.erestaurante.repository;

import com.mikeias.erestaurante.domain.Cliente;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Cliente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {


    Cliente findOneByNome(@Param("nome") String nome);

}
