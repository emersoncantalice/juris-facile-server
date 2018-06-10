package br.com.unifacisa.jurisfacile.repository;

import br.com.unifacisa.jurisfacile.domain.Curso;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Curso entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {
    @Query("select distinct curso from Curso curso left join fetch curso.disciplinas")
    List<Curso> findAllWithEagerRelationships();

    @Query("select curso from Curso curso left join fetch curso.disciplinas where curso.id =:id")
    Curso findOneWithEagerRelationships(@Param("id") Long id);

}
