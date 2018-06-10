package br.com.unifacisa.jurisfacile.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.unifacisa.jurisfacile.domain.Termo;

import br.com.unifacisa.jurisfacile.repository.TermoRepository;
import br.com.unifacisa.jurisfacile.web.rest.errors.BadRequestAlertException;
import br.com.unifacisa.jurisfacile.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Termo.
 */
@RestController
@RequestMapping("/api")
public class TermoResource {

	private final Logger log = LoggerFactory.getLogger(TermoResource.class);

	private static final String ENTITY_NAME = "termo";

	private final TermoRepository termoRepository;

	public TermoResource(TermoRepository termoRepository) {
		this.termoRepository = termoRepository;
	}

	/**
	 * POST /termos : Create a new termo.
	 *
	 * @param termo
	 *            the termo to create
	 * @return the ResponseEntity with status 201 (Created) and with body the new
	 *         termo, or with status 400 (Bad Request) if the termo has already an
	 *         ID
	 * @throws URISyntaxException
	 *             if the Location URI syntax is incorrect
	 */
	@PostMapping("/termos")
	@Timed
	public ResponseEntity<Termo> createTermo(@Valid @RequestBody Termo termo) throws URISyntaxException {
		log.debug("REST request to save Termo : {}", termo);
		if (termo.getId() != null) {
			throw new BadRequestAlertException("A new termo cannot already have an ID", ENTITY_NAME, "idexists");
		}
		Termo result = termoRepository.save(termo);
		return ResponseEntity.created(new URI("/api/termos/" + result.getId()))
				.headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
	}

	/**
	 * PUT /termos : Updates an existing termo.
	 *
	 * @param termo
	 *            the termo to update
	 * @return the ResponseEntity with status 200 (OK) and with body the updated
	 *         termo, or with status 400 (Bad Request) if the termo is not valid, or
	 *         with status 500 (Internal Server Error) if the termo couldn't be
	 *         updated
	 * @throws URISyntaxException
	 *             if the Location URI syntax is incorrect
	 */
	@PutMapping("/termos")
	@Timed
	public ResponseEntity<Termo> updateTermo(@Valid @RequestBody Termo termo) throws URISyntaxException {
		log.debug("REST request to update Termo : {}", termo);
		if (termo.getId() == null) {
			return createTermo(termo);
		}
		Termo result = termoRepository.save(termo);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, termo.getId().toString()))
				.body(result);
	}

	/**
	 * GET /termos : get all the termos.
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of termos in
	 *         body
	 */
	@GetMapping("/termos")
	@Timed
	public List<Termo> getAllTermos() {
		log.debug("REST request to get all Termos");
		return termoRepository.findAll();
	}

	/**
	 * GET /termos : get all the termos.
	 *
	 * @return the ResponseEntity with status 200 (OK) and the list of termos in
	 *         body
	 */
	@GetMapping("/termos/tema/{id}")
	@Timed
	public List<Termo> getAllTermosByTema(@PathVariable Long id) {
		log.debug("REST request to get all Termos by tema");
		return termoRepository.findAllByTema(id);
	}

	/**
	 * GET /termos/:id : get the "id" termo.
	 *
	 * @param id
	 *            the id of the termo to retrieve
	 * @return the ResponseEntity with status 200 (OK) and with body the termo, or
	 *         with status 404 (Not Found)
	 */
	@GetMapping("/termos/{id}")
	@Timed
	public ResponseEntity<Termo> getTermo(@PathVariable Long id) {
		log.debug("REST request to get Termo : {}", id);
		Termo termo = termoRepository.findOne(id);
		return ResponseUtil.wrapOrNotFound(Optional.ofNullable(termo));
	}

	/**
	 * DELETE /termos/:id : delete the "id" termo.
	 *
	 * @param id
	 *            the id of the termo to delete
	 * @return the ResponseEntity with status 200 (OK)
	 */
	@DeleteMapping("/termos/{id}")
	@Timed
	public ResponseEntity<Void> deleteTermo(@PathVariable Long id) {
		log.debug("REST request to delete Termo : {}", id);
		termoRepository.delete(id);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
	}
}
