package br.com.unifacisa.jurisfacile.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.unifacisa.jurisfacile.domain.Tema;

import br.com.unifacisa.jurisfacile.repository.TemaRepository;
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
 * REST controller for managing Tema.
 */
@RestController
@RequestMapping("/api")
public class TemaResource {

    private final Logger log = LoggerFactory.getLogger(TemaResource.class);

    private static final String ENTITY_NAME = "tema";

    private final TemaRepository temaRepository;

    public TemaResource(TemaRepository temaRepository) {
        this.temaRepository = temaRepository;
    }

    /**
     * POST  /temas : Create a new tema.
     *
     * @param tema the tema to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tema, or with status 400 (Bad Request) if the tema has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/temas")
    @Timed
    public ResponseEntity<Tema> createTema(@Valid @RequestBody Tema tema) throws URISyntaxException {
        log.debug("REST request to save Tema : {}", tema);
        if (tema.getId() != null) {
            throw new BadRequestAlertException("A new tema cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tema result = temaRepository.save(tema);
        return ResponseEntity.created(new URI("/api/temas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /temas : Updates an existing tema.
     *
     * @param tema the tema to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tema,
     * or with status 400 (Bad Request) if the tema is not valid,
     * or with status 500 (Internal Server Error) if the tema couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/temas")
    @Timed
    public ResponseEntity<Tema> updateTema(@Valid @RequestBody Tema tema) throws URISyntaxException {
        log.debug("REST request to update Tema : {}", tema);
        if (tema.getId() == null) {
            return createTema(tema);
        }
        Tema result = temaRepository.save(tema);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tema.getId().toString()))
            .body(result);
    }

    /**
     * GET  /temas : get all the temas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of temas in body
     */
    @GetMapping("/temas")
    @Timed
    public List<Tema> getAllTemas() {
        log.debug("REST request to get all Temas");
        return temaRepository.findAll();
        }

    /**
     * GET  /temas/:id : get the "id" tema.
     *
     * @param id the id of the tema to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tema, or with status 404 (Not Found)
     */
    @GetMapping("/temas/{id}")
    @Timed
    public ResponseEntity<Tema> getTema(@PathVariable Long id) {
        log.debug("REST request to get Tema : {}", id);
        Tema tema = temaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tema));
    }

    /**
     * DELETE  /temas/:id : delete the "id" tema.
     *
     * @param id the id of the tema to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/temas/{id}")
    @Timed
    public ResponseEntity<Void> deleteTema(@PathVariable Long id) {
        log.debug("REST request to delete Tema : {}", id);
        temaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
