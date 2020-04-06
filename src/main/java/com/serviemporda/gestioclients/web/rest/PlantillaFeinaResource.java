package com.serviemporda.gestioclients.web.rest;

import com.serviemporda.gestioclients.domain.*;
import com.serviemporda.gestioclients.domain.Feina;
import com.serviemporda.gestioclients.domain.enumeration.Dia;
import com.serviemporda.gestioclients.domain.enumeration.Estat;
import com.serviemporda.gestioclients.repository.FeinaRepository;
import com.serviemporda.gestioclients.repository.PlantillaFeinaRepository;
import com.serviemporda.gestioclients.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.serviemporda.gestioclients.domain.PlantillaFeina}.
 * REST controller for managing {@link com.serviemporda.gestioclients.domain.Feina}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PlantillaFeinaResource {

    private final Logger log = LoggerFactory.getLogger(PlantillaFeinaResource.class);

    private static final String ENTITY_NAME = "plantillaFeina";


    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    private final PlantillaFeinaRepository plantillaFeinaRepository;
    private FeinaRepository feinaRepository;
    private FeinaResource feinaResource;

    public PlantillaFeinaResource(PlantillaFeinaRepository plantillaFeinaRepository) {
        this.plantillaFeinaRepository = plantillaFeinaRepository;
    }

    /**
     * {@code POST  /plantilla-feinas} : Create a new plantillaFeina.
     *
     * @param plantillaFeina the plantillaFeina to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new plantillaFeina, or with status {@code 400 (Bad Request)} if the plantillaFeina has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/plantilla-feinas")
    public ResponseEntity<PlantillaFeina> createPlantillaFeina(@RequestBody PlantillaFeina plantillaFeina) throws URISyntaxException {
        log.debug("REST request to save PlantillaFeina : {}", plantillaFeina);
        if (plantillaFeina.getId() != null) {
            throw new BadRequestAlertException("A new plantillaFeina cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlantillaFeina result = plantillaFeinaRepository.save(plantillaFeina);
        //CREEM TOTES LES FEINES A PARTIR DE LA PLANTILLA:

        //Obtenim les variables que necessitem per crear les noves feines:
        LocalDate start = result.getSetmanaInicial();
        LocalDate end = result.getSetmanaFinal();
        String startDay = start.getDayOfWeek().name();
        LocalTime hora_inici = result.getHoraInici();
        LocalTime hora_final = result.getHoraFinal();

        //Obtenim el temps previst de la feina
        Duration duration = Duration.between(hora_inici, hora_final);

        //Creem una nova feina amb l'informacio de la plantilla
        Feina feinaNova = new Feina();
        feinaNova.setNom("FALTA POSAR-HO");
        feinaNova.setDescripcio("FALTA POSAR-HO");
        //INICI S'HA DE CANVIAR
        feinaNova.setSetmana(result.getSetmanaInicial());
        //FI S'HA DE CANVIAR
        feinaNova.setTempsPrevist((result.setTempsPrevist((int)duration.toMinutes())));
        feinaNova.setIntervalControl(result.getNumeroControl());
        feinaNova.setFacturacioAutomatica(result.isFacturacioAutomatica());
        feinaNova.setPlantillaFeina(result);
        //FALTA CATEGORIA, CLIENT, TREBALLADOR, UBICACIO


//        feinaResource.createFeina(feinaNova);
        //Comprovem el que ha seleccionat l'usuari en periodicitat configurable

  /*      String periodicitatDiaSetmana = result.getPeriodicitatConfigurable().getPeriodicitat().name(); //SETMANA, ANY, DIA,...
        Integer frequenciaPeriodicitat = result.getPeriodicitatConfigurable().getFrequencia(); //

        List<LocalDate> totalFeines = new ArrayList<>();

        LocalDate dateToCompare = start;

        int dayplus = 0;
        while (!dateToCompare.isAfter(end)) {

            if (startDay.equalsIgnoreCase(dateToCompare.getDayOfWeek().name())){

                totalFeines.add(start);

                if (frequenciaPeriodicitat == 1){

                }
            }

            dateToCompare = start.plusDays(1 + dayplus);

            dayplus ++;
            if (start.getDayOfWeek().name().equalsIgnoreCase("DILLUNS")){
                if (frequenciaPeriodicitat != 1){

                }
            }
        }

        for (int i = 0; i < totalFeines.size(); i ++){
            System.out.println("FEINA:            "+totalFeines.get(i).toString());
        }
        System.out.println(totalFeines);
*/
        /*    Categoria c = new Categoria();
            c.setNomCategoria("Neteja");
            Client cl = new Client();
            cl.setNom("Carla");
            Treballador t = new Treballador();
            Ubicacio u = new Ubicacio();

            Feina feina = new Feina("nom", result.getObservacions(), result.getSetmanaInicial(), result.getTempsPrevist(), result.getTempsPrevist(), Estat.INACTIU, result.getNumeroControl(),result.isFacturacioAutomatica(), result.getObservacions(), "comentarisTreballador", plantillaFeina, c, cl, t, u);

            feinaResource.createFeina(feina);*/
             return ResponseEntity.created(new URI("/api/plantilla-feinas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /plantilla-feinas} : Updates an existing plantillaFeina.
     *
     * @param plantillaFeina the plantillaFeina to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated plantillaFeina,
     * or with status {@code 400 (Bad Request)} if the plantillaFeina is not valid,
     * or with status {@code 500 (Internal Server Error)} if the plantillaFeina couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/plantilla-feinas")
    public ResponseEntity<PlantillaFeina> updatePlantillaFeina(@RequestBody PlantillaFeina plantillaFeina) throws URISyntaxException {
        log.debug("REST request to update PlantillaFeina : {}", plantillaFeina);
        if (plantillaFeina.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PlantillaFeina result = plantillaFeinaRepository.save(plantillaFeina);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, plantillaFeina.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /plantilla-feinas} : get all the plantillaFeinas.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of plantillaFeinas in body.
     */
    @GetMapping("/plantilla-feinas")
    public List<PlantillaFeina> getAllPlantillaFeinas(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all PlantillaFeinas");
        return plantillaFeinaRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /plantilla-feinas/:id} : get the "id" plantillaFeina.
     *
     * @param id the id of the plantillaFeina to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the plantillaFeina, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/plantilla-feinas/{id}")
    public ResponseEntity<PlantillaFeina> getPlantillaFeina(@PathVariable Long id) {
        log.debug("REST request to get PlantillaFeina : {}", id);
        Optional<PlantillaFeina> plantillaFeina = plantillaFeinaRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(plantillaFeina);
    }

    /**
     * {@code DELETE  /plantilla-feinas/:id} : delete the "id" plantillaFeina.
     *
     * @param id the id of the plantillaFeina to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/plantilla-feinas/{id}")
    public ResponseEntity<Void> deletePlantillaFeina(@PathVariable Long id) {
        log.debug("REST request to delete PlantillaFeina : {}", id);
        plantillaFeinaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
