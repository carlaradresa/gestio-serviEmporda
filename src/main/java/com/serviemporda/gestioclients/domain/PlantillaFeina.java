package com.serviemporda.gestioclients.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.time.Instant;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.serviemporda.gestioclients.domain.enumeration.Dia;

/**
 * A PlantillaFeina.
 */
@Entity
@Table(name = "plantilla_feina")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class PlantillaFeina implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "setmana_inicial")
    private LocalDate setmanaInicial;

    @Column(name = "setmana_final")
    private LocalDate setmanaFinal;

    @Column(name = "hora_inici")
    private Instant horaInici;

    @Column(name = "hora_final")
    private Instant horaFinal;

    @Column(name = "temps_previst")
    private Instant tempsPrevist;

    @Column(name = "interval_control")
    private Integer intervalControl;

    @Enumerated(EnumType.STRING)
    @Column(name = "dia_setmana")
    private Dia diaSetmana;

    @Column(name = "facturacio_automatica")
    private Boolean facturacioAutomatica;

    @Column(name = "observacions")
    private String observacions;

    @OneToOne
    @JoinColumn(unique = true)
    private PeriodicitatConfigurable periodicitatConfigurable;

    @ManyToOne
    @JsonIgnoreProperties("plantillaFeinas")
    private Categoria categoria;

    @ManyToOne
    @JsonIgnoreProperties("plantillaFeinas")
    private Client client;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "plantilla_feina_treballador",
               joinColumns = @JoinColumn(name = "plantilla_feina_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "treballador_id", referencedColumnName = "id"))
    private Set<Treballador> treballadors = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public PlantillaFeina nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public LocalDate getSetmanaInicial() {
        return setmanaInicial;
    }

    public PlantillaFeina setmanaInicial(LocalDate setmanaInicial) {
        this.setmanaInicial = setmanaInicial;
        return this;
    }

    public void setSetmanaInicial(LocalDate setmanaInicial) {
        this.setmanaInicial = setmanaInicial;
    }

    public LocalDate getSetmanaFinal() {
        return setmanaFinal;
    }

    public PlantillaFeina setmanaFinal(LocalDate setmanaFinal) {
        this.setmanaFinal = setmanaFinal;
        return this;
    }

    public void setSetmanaFinal(LocalDate setmanaFinal) {
        this.setmanaFinal = setmanaFinal;
    }

    public Instant getHoraInici() {
        return horaInici;
    }

    public PlantillaFeina horaInici(Instant horaInici) {
        this.horaInici = horaInici;
        return this;
    }

    public void setHoraInici(Instant horaInici) {
        this.horaInici = horaInici;
    }

    public Instant getHoraFinal() {
        return horaFinal;
    }

    public PlantillaFeina horaFinal(Instant horaFinal) {
        this.horaFinal = horaFinal;
        return this;
    }

    public void setHoraFinal(Instant horaFinal) {
        this.horaFinal = horaFinal;
    }

    public Instant getTempsPrevist() {
        return tempsPrevist;
    }

    public PlantillaFeina tempsPrevist(Instant tempsPrevist) {
        this.tempsPrevist = tempsPrevist;
        return this;
    }

    public void setTempsPrevist(Instant tempsPrevist) {
        this.tempsPrevist = tempsPrevist;
    }

    public Integer getIntervalControl() {
        return intervalControl;
    }

    public PlantillaFeina intervalControl(Integer intervalControl) {
        this.intervalControl = intervalControl;
        return this;
    }

    public void setIntervalControl(Integer intervalControl) {
        this.intervalControl = intervalControl;
    }

    public Dia getDiaSetmana() {
        return diaSetmana;
    }

    public PlantillaFeina diaSetmana(Dia diaSetmana) {
        this.diaSetmana = diaSetmana;
        return this;
    }

    public void setDiaSetmana(Dia diaSetmana) {
        this.diaSetmana = diaSetmana;
    }

    public Boolean isFacturacioAutomatica() {
        return facturacioAutomatica;
    }

    public PlantillaFeina facturacioAutomatica(Boolean facturacioAutomatica) {
        this.facturacioAutomatica = facturacioAutomatica;
        return this;
    }

    public void setFacturacioAutomatica(Boolean facturacioAutomatica) {
        this.facturacioAutomatica = facturacioAutomatica;
    }

    public String getObservacions() {
        return observacions;
    }

    public PlantillaFeina observacions(String observacions) {
        this.observacions = observacions;
        return this;
    }

    public void setObservacions(String observacions) {
        this.observacions = observacions;
    }

    public PeriodicitatConfigurable getPeriodicitatConfigurable() {
        return periodicitatConfigurable;
    }

    public PlantillaFeina periodicitatConfigurable(PeriodicitatConfigurable periodicitatConfigurable) {
        this.periodicitatConfigurable = periodicitatConfigurable;
        return this;
    }

    public void setPeriodicitatConfigurable(PeriodicitatConfigurable periodicitatConfigurable) {
        this.periodicitatConfigurable = periodicitatConfigurable;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public PlantillaFeina categoria(Categoria categoria) {
        this.categoria = categoria;
        return this;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public Client getClient() {
        return client;
    }

    public PlantillaFeina client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Set<Treballador> getTreballadors() {
        return treballadors;
    }

    public PlantillaFeina treballadors(Set<Treballador> treballadors) {
        this.treballadors = treballadors;
        return this;
    }

    public PlantillaFeina addTreballador(Treballador treballador) {
        this.treballadors.add(treballador);
        treballador.getPlantillafeinas().add(this);
        return this;
    }

    public PlantillaFeina removeTreballador(Treballador treballador) {
        this.treballadors.remove(treballador);
        treballador.getPlantillafeinas().remove(this);
        return this;
    }

    public void setTreballadors(Set<Treballador> treballadors) {
        this.treballadors = treballadors;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlantillaFeina)) {
            return false;
        }
        return id != null && id.equals(((PlantillaFeina) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PlantillaFeina{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", setmanaInicial='" + getSetmanaInicial() + "'" +
            ", setmanaFinal='" + getSetmanaFinal() + "'" +
            ", horaInici='" + getHoraInici() + "'" +
            ", horaFinal='" + getHoraFinal() + "'" +
            ", tempsPrevist='" + getTempsPrevist() + "'" +
            ", intervalControl=" + getIntervalControl() +
            ", diaSetmana='" + getDiaSetmana() + "'" +
            ", facturacioAutomatica='" + isFacturacioAutomatica() + "'" +
            ", observacions='" + getObservacions() + "'" +
            "}";
    }
}
