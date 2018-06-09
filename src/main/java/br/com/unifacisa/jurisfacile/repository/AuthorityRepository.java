package br.com.unifacisa.jurisfacile.repository;

import br.com.unifacisa.jurisfacile.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
