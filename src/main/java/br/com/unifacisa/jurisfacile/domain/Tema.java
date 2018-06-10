package br.com.unifacisa.jurisfacile.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Tema.
 */
@Entity
@Table(name = "tema")
public class Tema implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "titulo", nullable = false)
    private String titulo;

    @OneToMany(mappedBy = "tema")
    @JsonIgnore
    private Set<Termo> termos = new HashSet<>();

    @ManyToMany(mappedBy = "temas")
    @JsonIgnore
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

    public Tema titulo(String titulo) {
        this.titulo = titulo;
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public Set<Termo> getTermos() {
        return termos;
    }

    public Tema termos(Set<Termo> termos) {
        this.termos = termos;
        return this;
    }

    public Tema addTermo(Termo termo) {
        this.termos.add(termo);
        termo.setTema(this);
        return this;
    }

    public Tema removeTermo(Termo termo) {
        this.termos.remove(termo);
        termo.setTema(null);
        return this;
    }

    public void setTermos(Set<Termo> termos) {
        this.termos = termos;
    }

    public Set<Disciplina> getDisciplinas() {
        return disciplinas;
    }

    public Tema disciplinas(Set<Disciplina> disciplinas) {
        this.disciplinas = disciplinas;
        return this;
    }

    public Tema addDisciplina(Disciplina disciplina) {
        this.disciplinas.add(disciplina);
        disciplina.getTemas().add(this);
        return this;
    }

    public Tema removeDisciplina(Disciplina disciplina) {
        this.disciplinas.remove(disciplina);
        disciplina.getTemas().remove(this);
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
        Tema tema = (Tema) o;
        if (tema.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tema.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Tema{" +
            "id=" + getId() +
            ", titulo='" + getTitulo() + "'" +
            "}";
    }
}
