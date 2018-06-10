package br.com.unifacisa.jurisfacile.repository;

import br.com.unifacisa.jurisfacile.domain.Disciplina;
import br.com.unifacisa.jurisfacile.domain.Tema;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;


/**
 * Spring Data JPA repository for the Tema entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TemaRepository extends JpaRepository<Tema, Long> {
	
  
}
