package br.com.unifacisa.jurisfacile.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Termo.
 */
@Entity
@Table(name = "termo")
public class Termo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "titulo", nullable = false)
    private String titulo;

    @NotNull
    @Lob
    @Column(name = "texto", nullable = false)
    private String texto;

    @ManyToOne
    private Tema tema;

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

    public Termo titulo(String titulo) {
        this.titulo = titulo;
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getTexto() {
        return texto;
    }

    public Termo texto(String texto) {
        this.texto = texto;
        return this;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public Tema getTema() {
        return tema;
    }

    public Termo tema(Tema tema) {
        this.tema = tema;
        return this;
    }

    public void setTema(Tema tema) {
        this.tema = tema;
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
        Termo termo = (Termo) o;
        if (termo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), termo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Termo{" +
            "id=" + getId() +
            ", titulo='" + getTitulo() + "'" +
            ", texto='" + getTexto() + "'" +
            "}";
    }
}
