package br.com.unifacisa.jurisfacile.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Disciplina.
 */
@Entity
@Table(name = "disciplina")
public class Disciplina implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "titulo", nullable = false)
    private String titulo;

    @ManyToMany
    @JoinTable(name = "disciplina_tema",
               joinColumns = @JoinColumn(name="disciplinas_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="temas_id", referencedColumnName="id"))
    private Set<Tema> temas = new HashSet<>();

    @ManyToMany(mappedBy = "disciplinas")
    @JsonIgnore
    private Set<Curso> cursos = new HashSet<>();

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

    public Disciplina titulo(String titulo) {
        this.titulo = titulo;
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Set<Tema> getTemas() {
        return temas;
    }

    public Disciplina temas(Set<Tema> temas) {
        this.temas = temas;
        return this;
    }

    public Disciplina addTema(Tema tema) {
        this.temas.add(tema);
        tema.getDisciplinas().add(this);
        return this;
    }

    public Disciplina removeTema(Tema tema) {
        this.temas.remove(tema);
        tema.getDisciplinas().remove(this);
        return this;
    }

    public void setTemas(Set<Tema> temas) {
        this.temas = temas;
    }

    public Set<Curso> getCursos() {
        return cursos;
    }

    public Disciplina cursos(Set<Curso> cursos) {
        this.cursos = cursos;
        return this;
    }

    public Disciplina addCurso(Curso curso) {
        this.cursos.add(curso);
        curso.getDisciplinas().add(this);
        return this;
    }

    public Disciplina removeCurso(Curso curso) {
        this.cursos.remove(curso);
        curso.getDisciplinas().remove(this);
        return this;
    }

    public void setCursos(Set<Curso> cursos) {
        this.cursos = cursos;
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
        Disciplina disciplina = (Disciplina) o;
        if (disciplina.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), disciplina.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Disciplina{" +
            "id=" + getId() +
            ", titulo='" + getTitulo() + "'" +
            "}";
    }
}
