package com.serviemporda.gestioclients.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.Duration;
import java.util.HashSet;
import java.util.Set;

/**
 * A Feina.
 */
@Entity
@Table(name = "feina")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Feina implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero")
    private Integer numero;

    @Column(name = "nom")
    private String nom;

    @Column(name = "descripcio")
    private String descripcio;

    @Column(name = "setmana")
    private LocalDate setmana;

    @Column(name = "temps_previst")
    private Duration tempsPrevist;

    @Column(name = "temps_real")
    private Duration tempsReal;

    @Column(name = "estat")
    private Boolean estat;

    @Column(name = "interval_control")
    private Integer intervalControl;

    @Column(name = "facturacio_automatica")
    private Boolean facturacioAutomatica;

    @Column(name = "observacions")
    private String observacions;

    @Column(name = "comentaris_treballador")
    private String comentarisTreballador;

    @ManyToOne
    @JsonIgnoreProperties("feinas")
    private PlantillaFeina plantillaFeina;

    @ManyToOne
    @JsonIgnoreProperties("feinas")
    private Categoria categoria;

    @ManyToOne
    @JsonIgnoreProperties("feinas")
    private Client client;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "feina_treballador",
               joinColumns = @JoinColumn(name = "feina_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "treballador_id", referencedColumnName = "id"))
    private Set<Treballador> treballadors = new HashSet<>();

    @OneToMany(mappedBy = "feina")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RepeticioTascaSetmanal> repeticios = new HashSet<>();

    @OneToMany(mappedBy = "feina")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Marcatge> marcatges = new HashSet<>();

    @OneToMany(mappedBy = "feina")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Control> revisionsRebudes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumero() {
        return numero;
    }

    public Feina numero(Integer numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public String getNom() {
        return nom;
    }

    public Feina nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescripcio() {
        return descripcio;
    }

    public Feina descripcio(String descripcio) {
        this.descripcio = descripcio;
        return this;
    }

    public void setDescripcio(String descripcio) {
        this.descripcio = descripcio;
    }

    public LocalDate getSetmana() {
        return setmana;
    }

    public Feina setmana(LocalDate setmana) {
        this.setmana = setmana;
        return this;
    }

    public void setSetmana(LocalDate setmana) {
        this.setmana = setmana;
    }

    public Duration getTempsPrevist() {
        return tempsPrevist;
    }

    public Feina tempsPrevist(Duration tempsPrevist) {
        this.tempsPrevist = tempsPrevist;
        return this;
    }

    public void setTempsPrevist(Duration tempsPrevist) {
        this.tempsPrevist = tempsPrevist;
    }

    public Duration getTempsReal() {
        return tempsReal;
    }

    public Feina tempsReal(Duration tempsReal) {
        this.tempsReal = tempsReal;
        return this;
    }

    public void setTempsReal(Duration tempsReal) {
        this.tempsReal = tempsReal;
    }

    public Boolean isEstat() {
        return estat;
    }

    public Feina estat(Boolean estat) {
        this.estat = estat;
        return this;
    }

    public void setEstat(Boolean estat) {
        this.estat = estat;
    }

    public Integer getIntervalControl() {
        return intervalControl;
    }

    public Feina intervalControl(Integer intervalControl) {
        this.intervalControl = intervalControl;
        return this;
    }

    public void setIntervalControl(Integer intervalControl) {
        this.intervalControl = intervalControl;
    }

    public Boolean isFacturacioAutomatica() {
        return facturacioAutomatica;
    }

    public Feina facturacioAutomatica(Boolean facturacioAutomatica) {
        this.facturacioAutomatica = facturacioAutomatica;
        return this;
    }

    public void setFacturacioAutomatica(Boolean facturacioAutomatica) {
        this.facturacioAutomatica = facturacioAutomatica;
    }

    public String getObservacions() {
        return observacions;
    }

    public Feina observacions(String observacions) {
        this.observacions = observacions;
        return this;
    }

    public void setObservacions(String observacions) {
        this.observacions = observacions;
    }

    public String getComentarisTreballador() {
        return comentarisTreballador;
    }

    public Feina comentarisTreballador(String comentarisTreballador) {
        this.comentarisTreballador = comentarisTreballador;
        return this;
    }

    public void setComentarisTreballador(String comentarisTreballador) {
        this.comentarisTreballador = comentarisTreballador;
    }

    public PlantillaFeina getPlantillaFeina() {
        return plantillaFeina;
    }

    public Feina plantillaFeina(PlantillaFeina plantillaFeina) {
        this.plantillaFeina = plantillaFeina;
        return this;
    }

    public void setPlantillaFeina(PlantillaFeina plantillaFeina) {
        this.plantillaFeina = plantillaFeina;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public Feina categoria(Categoria categoria) {
        this.categoria = categoria;
        return this;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Client getClient() {
        return client;
    }

    public Feina client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Set<Treballador> getTreballadors() {
        return treballadors;
    }

    public Feina treballadors(Set<Treballador> treballadors) {
        this.treballadors = treballadors;
        return this;
    }

    public Feina addTreballador(Treballador treballador) {
        this.treballadors.add(treballador);
        treballador.getFeinas().add(this);
        return this;
    }

    public Feina removeTreballador(Treballador treballador) {
        this.treballadors.remove(treballador);
        treballador.getFeinas().remove(this);
        return this;
    }

    public void setTreballadors(Set<Treballador> treballadors) {
        this.treballadors = treballadors;
    }

    public Set<RepeticioTascaSetmanal> getRepeticios() {
        return repeticios;
    }

    public Feina repeticios(Set<RepeticioTascaSetmanal> repeticioTascaSetmanals) {
        this.repeticios = repeticioTascaSetmanals;
        return this;
    }

    public Feina addRepeticio(RepeticioTascaSetmanal repeticioTascaSetmanal) {
        this.repeticios.add(repeticioTascaSetmanal);
        repeticioTascaSetmanal.setFeina(this);
        return this;
    }

    public Feina removeRepeticio(RepeticioTascaSetmanal repeticioTascaSetmanal) {
        this.repeticios.remove(repeticioTascaSetmanal);
        repeticioTascaSetmanal.setFeina(null);
        return this;
    }

    public void setRepeticios(Set<RepeticioTascaSetmanal> repeticioTascaSetmanals) {
        this.repeticios = repeticioTascaSetmanals;
    }

    public Set<Marcatge> getMarcatges() {
        return marcatges;
    }

    public Feina marcatges(Set<Marcatge> marcatges) {
        this.marcatges = marcatges;
        return this;
    }

    public Feina addMarcatge(Marcatge marcatge) {
        this.marcatges.add(marcatge);
        marcatge.setFeina(this);
        return this;
    }

    public Feina removeMarcatge(Marcatge marcatge) {
        this.marcatges.remove(marcatge);
        marcatge.setFeina(null);
        return this;
    }

    public void setMarcatges(Set<Marcatge> marcatges) {
        this.marcatges = marcatges;
    }

    public Set<Control> getRevisionsRebudes() {
        return revisionsRebudes;
    }

    public Feina revisionsRebudes(Set<Control> controls) {
        this.revisionsRebudes = controls;
        return this;
    }

    public Feina addRevisionsRebudes(Control control) {
        this.revisionsRebudes.add(control);
        control.setFeina(this);
        return this;
    }

    public Feina removeRevisionsRebudes(Control control) {
        this.revisionsRebudes.remove(control);
        control.setFeina(null);
        return this;
    }

    public void setRevisionsRebudes(Set<Control> controls) {
        this.revisionsRebudes = controls;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Feina)) {
            return false;
        }
        return id != null && id.equals(((Feina) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Feina{" +
            "id=" + getId() +
            ", numero=" + getNumero() +
            ", nom='" + getNom() + "'" +
            ", descripcio='" + getDescripcio() + "'" +
            ", setmana='" + getSetmana() + "'" +
            ", tempsPrevist='" + getTempsPrevist() + "'" +
            ", tempsReal='" + getTempsReal() + "'" +
            ", estat='" + isEstat() + "'" +
            ", intervalControl=" + getIntervalControl() +
            ", facturacioAutomatica='" + isFacturacioAutomatica() + "'" +
            ", observacions='" + getObservacions() + "'" +
            ", comentarisTreballador='" + getComentarisTreballador() + "'" +
            "}";
    }
}
