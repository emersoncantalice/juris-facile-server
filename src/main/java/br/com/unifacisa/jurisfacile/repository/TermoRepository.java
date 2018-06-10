package br.com.unifacisa.jurisfacile.repository;

import br.com.unifacisa.jurisfacile.domain.Disciplina;
import br.com.unifacisa.jurisfacile.domain.Termo;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data JPA repository for the Termo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TermoRepository extends JpaRepository<Termo, Long> {

	@Query("select distinct termo from Termo termo where termo.tema.id = :id")
	List<Termo> findAllByTema(@Param("id") Long id);

}
