package br.com.unifacisa.jurisfacile.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Curso.
 */
@Entity
@Table(name = "curso")
public class Curso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "titulo", nullable = false)
    private String titulo;

    @Column(name = "url")
    private String url;

    @ManyToMany
    @JoinTable(name = "curso_disciplina",
               joinColumns = @JoinColumn(name="cursos_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="disciplinas_id", referencedColumnName="id"))
    private Set<Disciplina> disciplinas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public Curso titulo(String titulo) {
        this.titulo = titulo;
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getUrl() {
        return url;
    }

    public Curso url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Set<Disciplina> getDisciplinas() {
        return disciplinas;
    }

    public Curso disciplinas(Set<Disciplina> disciplinas) {
        this.disciplinas = disciplinas;
        return this;
    }

    public Curso addDisciplina(Disciplina disciplina) {
        this.disciplinas.add(disciplina);
        disciplina.getCursos().add(this);
        return this;
    }

    public Curso removeDisciplina(Disciplina disciplina) {
        this.disciplinas.remove(disciplina);
        disciplina.getCursos().remove(this);
        return this;
    }

    public void setDisciplinas(Set<Disciplina> disciplinas) {
        this.disciplinas = disciplinas;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Curso curso = (Curso) o;
        if (curso.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), curso.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Curso{" +
            "id=" + getId() +
            ", titulo='" + getTitulo() + "'" +
            ", url='" + getUrl() + "'" +
            "}";
    }
}
