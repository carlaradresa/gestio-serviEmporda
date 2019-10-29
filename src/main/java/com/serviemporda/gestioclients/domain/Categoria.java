package com.serviemporda.gestioclients.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Categoria.
 */
@Entity
@Table(name = "categoria")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Categoria implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom_categoria")
    private String nomCategoria;

    @OneToMany(mappedBy = "categoria")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Feina> feinas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomCategoria() {
        return nomCategoria;
    }

    public Categoria nomCategoria(String nomCategoria) {
        this.nomCategoria = nomCategoria;
        return this;
    }

    public void setNomCategoria(String nomCategoria) {
        this.nomCategoria = nomCategoria;
    }

    public Set<Feina> getFeinas() {
        return feinas;
    }

    public Categoria feinas(Set<Feina> feinas) {
        this.feinas = feinas;
        return this;
    }

    public Categoria addFeina(Feina feina) {
        this.feinas.add(feina);
        feina.setCategoria(this);
        return this;
    }

    public Categoria removeFeina(Feina feina) {
        this.feinas.remove(feina);
        feina.setCategoria(null);
        return this;
    }

    public void setFeinas(Set<Feina> feinas) {
        this.feinas = feinas;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Categoria)) {
            return false;
        }
        return id != null && id.equals(((Categoria) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Categoria{" +
            "id=" + getId() +
            ", nomCategoria='" + getNomCategoria() + "'" +
            "}";
    }
}
