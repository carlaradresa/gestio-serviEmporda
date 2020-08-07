package com.serviemporda.gestioclients.service;

import com.serviemporda.gestioclients.domain.*;
import com.serviemporda.gestioclients.domain.enumeration.Estat;
import com.serviemporda.gestioclients.repository.AuthorityRepository;
import com.serviemporda.gestioclients.repository.FeinaRepository;
import com.serviemporda.gestioclients.repository.PlantillaFeinaRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.WeekFields;
import java.util.*;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class FeinaService {

    private final Logger log = LoggerFactory.getLogger(FeinaService.class);

    private final FeinaRepository feinaRepository;

    private final PlantillaFeinaRepository plantillaFeinaRepository;

    private final CacheManager cacheManager;

    private final AuthorityRepository authorityRepository;

    List<Feina> feinesNoves;               //si generem més d'una feina
    List<Feina> getAllFeines;
    List<PlantillaFeina> getAllPlantilles;

    Duration duration;

    public FeinaService(FeinaRepository feinaRepository, PlantillaFeinaRepository plantillaFeinaRepository, CacheManager cacheManager, AuthorityRepository authorityRepository) {
        this.feinaRepository = feinaRepository;
        this.plantillaFeinaRepository = plantillaFeinaRepository;
        this.cacheManager = cacheManager;
        this.authorityRepository = authorityRepository;
    }

   /* public void deleteFeinesFromPf(Long id_plantillaFeina){

        List<Feina> feines;
        feines = feinaRepository.findAllWithEagerRelationships();

        for (int i = 0; i < feines.size(); i ++){
            if ((feines.get(i).getPlantillaFeina().getId().equals(id_plantillaFeina)) && (!(feines.get(i).getEstat().equals("FINALITZAT")) && !(feines.get(i).getEstat().equals("FINALIZADO"))
                && !(feines.get(i).getEstat().equals("COMPLETED")))){
                feinaRepository.delete(feines.get(i));
            }
        }
        plantillaFeinaRepository.deleteById(id_plantillaFeina);
    }*/

   public void deleteFeinesFromPf(Long id_plantillaFeina){

       List<Feina> feines;
       feines = feinaRepository.findAllWithEagerRelationships();

       for (int i = 0; i < feines.size(); i ++){
           if (feines.get(i).getPlantillaFeina().getId().equals(id_plantillaFeina)) {
               if (feines.get(i).getEstat().ordinal() != 2) {
                   Feina f = feines.get(i);
                   feinaRepository.delete(f);
               }
           }
       }
   }
    public void createFeina(PlantillaFeina result) {

        Feina feinaNova = new Feina();
        feinesNoves = new ArrayList<>();
        feinesNoves.clear();

        //VALORS IGUALS PER TOTES LES FEINES
        LocalDate start = result.getSetmanaInicial();
        LocalDate end = result.getSetmanaFinal();

        Integer freqPeriod = result.getPeriodicitatConfigurable().getFrequencia();
        String period = result.getPeriodicitatConfigurable().getPeriodicitat().name();

        LocalTime hora_inici = result.getHoraInici();
        LocalTime hora_final = result.getHoraFinal();

        Set<Treballador> treballadors = result.getTreballadors();

        //Temps previst per la feina

        duration = Duration.between(hora_inici, hora_final);

        //Comprovem si només es 1 feina o més
        if (start.compareTo(end) == 0){

          //  Iterator<Treballador> it = treballadors.iterator();
          //  while (it.hasNext()){
                saveFeina(result.getSetmanaInicial(),result,duration,treballadors);
          //  }

        }else{

            ArrayList<String> diesSetmana = new ArrayList<>();
            boolean isQualsevol = false;

            Set<PeriodicitatSetmanal> periodSet = result.getPeriodicitatSetmanals();
            Iterator<PeriodicitatSetmanal> it = periodSet.iterator();
            while (it.hasNext()){
             /*   if (it.next().getDiaSetmana().toString().equalsIgnoreCase("QUALSEVOL")){
                    isQualsevol = true;
                }else{*/
                String diaAdd = convertCatalaInEnglish(it.next().getDiaSetmana().toString());
                diesSetmana.add(diaAdd);
               // }
            }

            if ((diesSetmana.size() == 1) /*|| isQualsevol*/) {
            //Només ha seleccionat 1 dia, per tant mirem periodconfiguracio

                boolean trobat = false;
                LocalDate dateToCompare;
             //   Iterator<Treballador> iteratorTreballador = treballadors.iterator();

                while (!trobat){
                    dateToCompare = start;

                    //Mirem si ha escollit qualsevol dia
                  //  if (isQualsevol){
/*
                    //CREA FEINES AMB QUALSEVOL DIA
                        creaFeinesDiaQualsevol(dateToCompare,result,duration);
                        saveFeina(dateToCompare,result,duration);
                        if (period.equalsIgnoreCase("SETMANA")){
                            dateToCompare = dateToCompare.plusDays(freqPeriod);

                        }
*/
                  //  }
                    if (dateToCompare.getDayOfWeek().toString().equals(diesSetmana.get(0))){
                        //mirem la periodicitat configurable i creem les feines
                      //  while (iteratorTreballador.hasNext()) {
                            saveFeina(dateToCompare, result, duration, treballadors);
                     //   }
                        if (period.equalsIgnoreCase("DIA")){
                            dateToCompare = dateToCompare.plusDays(freqPeriod);
                            while ((dateToCompare.isBefore(end)) || (dateToCompare.compareTo(end) == 0)){
                         //       Iterator<Treballador> iteratorTreballador2 = treballadors.iterator();
                          //      while (iteratorTreballador2.hasNext()) {
                                    saveFeina(dateToCompare, result, duration, treballadors);
                          //      }
                                dateToCompare = dateToCompare.plusDays(freqPeriod);
                            }
                        }else{

                            if(period.equalsIgnoreCase("SETMANA")){
                                dateToCompare = dateToCompare.plusWeeks(freqPeriod);
                                while ((dateToCompare.isBefore(end)) || (dateToCompare.compareTo(end) == 0)){
                            //        while (iteratorTreballador.hasNext()) {
                                        saveFeina(dateToCompare,result,duration, treballadors);
                             //       }
                                    dateToCompare = dateToCompare.plusWeeks(freqPeriod);
                                }
                            }else{
                                if (period.equalsIgnoreCase("QUINZENAL")){
                                    dateToCompare = dateToCompare.plusDays(15*freqPeriod);
                                    while ((dateToCompare.isBefore(end)) || (dateToCompare.compareTo(end) == 0)){
                                 //       while (iteratorTreballador.hasNext()) {
                                            saveFeina(dateToCompare, result, duration, treballadors);
                                 //       }
                                        dateToCompare = dateToCompare.plusDays(15*freqPeriod);
                                    }
                                }else {
                                    if (period.equalsIgnoreCase("MES")){
                                        dateToCompare = dateToCompare.plusMonths(freqPeriod);
                                        while ((dateToCompare.isBefore(end)) || (dateToCompare.compareTo(end) == 0)){
                                     //       while (iteratorTreballador.hasNext()) {
                                                saveFeina(dateToCompare, result, duration, treballadors);
                                      //      }
                                            dateToCompare = dateToCompare.plusMonths(freqPeriod);
                                        }
                                    }else{
                                        dateToCompare = dateToCompare.plusYears(freqPeriod);
                                        while ((dateToCompare.isBefore(end)) || (dateToCompare.compareTo(end) == 0)){
                                    //        while (iteratorTreballador.hasNext()) {
                                                saveFeina(dateToCompare, result, duration, treballadors);
                                     //       }
                                            dateToCompare = dateToCompare.plusYears(freqPeriod);
                                        }
                                    }
                                }
                            }
                        }
                        trobat = true;
                       // break;
                    }
                    dateToCompare = dateToCompare.plusDays(1);
                }
            }else{ //ha seleccionat més d'1 dia, per tant no fa falta mirar periodConfig

                LocalDate dateToCompare = start;
             //   Iterator<Treballador> iteratorTreballador = treballadors.iterator();

                //Mirem si ha escollit SETMANA si ha escollit 1 o més per sumar-lis.
                WeekFields weekFields = WeekFields.of(Locale.getDefault());
                int weekNumber = dateToCompare.get(weekFields.weekOfWeekBasedYear());
                int weekNumber2 = 0;

                while ((dateToCompare.isBefore(end)) || (dateToCompare.compareTo(end) == 0)){
                    for (String dayOfWeek : diesSetmana) {
                        if (dateToCompare.getDayOfWeek().toString().equals(dayOfWeek)){
                       //     while (iteratorTreballador.hasNext()) {
                                saveFeina(dateToCompare, result, duration, treballadors);
                       //     }
                        }
                    }
                    dateToCompare = dateToCompare.plusDays(1);
                    weekFields = WeekFields.of(Locale.getDefault());
                    weekNumber2 = dateToCompare.get(weekFields.weekOfWeekBasedYear());

                    if (weekNumber<weekNumber2 && period.equalsIgnoreCase("SETMANA")){
                        dateToCompare = dateToCompare.plusWeeks(freqPeriod-1);
                        weekFields = WeekFields.of(Locale.getDefault());
                        weekNumber = dateToCompare.get(weekFields.weekOfWeekBasedYear());
                        weekNumber2 = weekNumber;
                    }

                }
            }
        }
       // this.clearUserCaches(user);
        log.debug("Created Information for Feina: {}", feinaNova);
    }

    private String convertCatalaInEnglish(String dayInEnglish) {
        String dayChanged = "";
        if (dayInEnglish.equalsIgnoreCase("DILLUNS")){
            dayChanged = "MONDAY";
        }else{
            if (dayInEnglish.equalsIgnoreCase("DIMARTS")){
                dayChanged = "TUESDAY";
            }else{
                if (dayInEnglish.equalsIgnoreCase("DIMECRES")){
                    dayChanged = "WEDNESDAY";
                }else{
                    if (dayInEnglish.equalsIgnoreCase("DIJOUS")){
                        dayChanged = "THURSDAY";
                    }else{
                        if (dayInEnglish.equalsIgnoreCase("DIVENDRES")){
                            dayChanged = "FRIDAY";
                        }else{
                            if (dayInEnglish.equalsIgnoreCase("DISSABTE")){
                                dayChanged = "SATURDAY";
                            }else{
                                if (dayInEnglish.equalsIgnoreCase("DIUMENGE")){
                                    dayChanged = "SUNDAY";
                                }
                            }
                        }
                    }
                }
            }
        }
        return dayChanged;
    }

    private void saveFeina(LocalDate start, PlantillaFeina result, Duration duration, Set<Treballador> treballadors) {

            Feina feinaNova = new Feina();
            Integer numeroControl = 0;
            String descripcio = "";

            feinaNova.setTreballadors(treballadors);
            feinaNova.setNom(result.getNom());
            feinaNova.setDescripcio(result.getObservacions());
            feinaNova.setSetmana(start);
            //feinaNova.setTempsPrevist(result.getTempsPrevist());
            feinaNova.setIntervalControl(numeroControl);
            feinaNova.setFacturacioAutomatica(result.isFacturacioAutomatica());
            feinaNova.setPlantillaFeina(result);
            feinaNova.setObservacions(result.getObservacions());
            feinaNova.setEstat(Estat.INACTIU);
            //feinaNova.setUbicacios(null);
            feinaNova.setCategoria(result.getCategoria());
            feinaNova.setClient(result.getClient());
            feinesNoves.add(feinaNova);
            feinaRepository.save(feinaNova);
        }

    public void updateFeines(PlantillaFeina plantillaFeina) {

       Long id_plantilla = plantillaFeina.getId();
       int id_plantillaFeina = 0;
       getAllFeines = feinaRepository.findAllWithEagerRelationships();
       getAllPlantilles = plantillaFeinaRepository.findAllWithEagerRelationships();
       boolean plantillaTrobada = false;
       boolean crearNovesFeines = false;

       //CONDICIONS NECESSÀRIES
        boolean setmanaFinalChanged = false;
        boolean periodicitatConfChanged = false;
        boolean periodicitatSetChanged = false;

        for (int a = 0; a < getAllPlantilles.size() && !plantillaTrobada; a ++){
            if (getAllPlantilles.get(a).getId() == id_plantilla){
                if (!plantillaFeina.getSetmanaFinal().equals(getAllPlantilles.get(a).getSetmanaFinal())){
                    setmanaFinalChanged = true;
                }
                if (!plantillaFeina.getPeriodicitatConfigurable().equals(getAllPlantilles.get(a).getPeriodicitatConfigurable())){
                    periodicitatConfChanged = true;
                } if (!plantillaFeina.getPeriodicitatSetmanals().equals(getAllPlantilles.get(a).getPeriodicitatSetmanals())){
                    periodicitatSetChanged = true;
                }
                plantillaTrobada = true;
                id_plantillaFeina = a;
            }
        }
        //CONTROLEM CADA UNA DE LES CONDICIONS NECESSÀRIES:
        //Si no hi ha cap canvi dels 3
        if (!setmanaFinalChanged && !periodicitatConfChanged && !periodicitatSetChanged){
            for (int i = 0; i < getAllFeines.size(); i++) {
                if (getAllFeines.get(i).getPlantillaFeina().getId().equals(id_plantilla)) {
                    if (getAllFeines.get(i).getEstat().ordinal() != 0 && getAllFeines.get(i).getEstat().ordinal() != 2) {
                        updateFeinaFromPlantilla(getAllFeines.get(i), plantillaFeina);
                    }
                }
            }
        }else{
            if (setmanaFinalChanged && !periodicitatConfChanged && !periodicitatSetChanged){
                if (plantillaFeina.getSetmanaFinal().isBefore(getAllPlantilles.get(id_plantillaFeina).getSetmanaFinal())) {
                    //Borrar les feines posteriors a plantillaFeina.getSetmanaFinal() fins getAllPlantilles.get(id_plantillaFeina).getSetmanaFinal()
                    for (int b = 0; b < getAllFeines.size(); b ++){
                        if (getAllFeines.get(b).getSetmana().isAfter(plantillaFeina.getSetmanaFinal())) {
                            feinaRepository.delete(getAllFeines.get(b));
                        }
                    }
                }else{
                    boolean ultimaFeina = false;
                    int indexF = 0;
                    for (int c = 0; c < getAllFeines.size(); c ++) {
                        if (!getAllFeines.get(getAllFeines.size() - 1).getSetmana().isAfter(plantillaFeina.getSetmanaFinal())){
                            ultimaFeina = true;
                            indexF = c;
                        }
                    }
                //Afegir les feines posteriors a getAllPlantilles.get(id_plantillaFeina).getSetmanaFinal() fins plantillaFeina.getSetmanaFinal()
                }
                //modificar totes les altres feines
          /*  if (!setmanaFinalChanged && periodicitatConfChanged && !periodicitatSetChanged){
                //control de totes les feines que no siguin ord() = 0 i 2

            }
            if (!setmanaFinalChanged && !periodicitatConfChanged && periodicitatSetChanged){

            }*/

                //Hi han tots els canvis

            }/*else{
                for (int b = 0; b < getAllFeines.size(); b++) {
                    if (getAllFeines.get(b).getEstat().ordinal() != 0 || getAllFeines.get(b).getEstat().ordinal() != 2) {
                        Long id_feina = Long.valueOf(b);
                        feinaRepository.deleteById(id_feina);
                    }
                }
                createFeina(plantillaFeina);
            }*/
        }
/*

        // CONTROLEM SI S'HA CANVIAT LA SETMANA FINAL DE REALITZAR LES FEINES
       for (int i = 0; (i < getAllPlantilles.size() && !plantillaTrobada); i ++){
           if (getAllPlantilles.get(i).getId() == id_plantilla){
               if (!plantillaFeina.getPeriodicitatConfigurable().getObservacions().equalsIgnoreCase(getAllPlantilles.get(i).getPeriodicitatConfigurable().getObservacions())){
                   for (int k = 0; k < getAllFeines.size(); i ++){
                       if (getAllFeines.get(i).getEstat().ordinal() != 0 || getAllFeines.get(i).getEstat().ordinal() != 2){
                           Long id_feina = Long.valueOf(i);
                           feinaRepository.deleteById(id_feina);
                       }
                   }
                   createFeina(plantillaFeina);
               }else{
                   if (!getAllPlantilles.get(i).getSetmanaFinal().equals(plantillaFeina.getSetmanaFinal())){
                       crearNovesFeines = controlSetmanaFinal(getAllPlantilles.get(i), plantillaFeina, id_plantilla);
                   }
               }
               plantillaTrobada = true;
           }
       }

       //EN CAS QUE S'HAGIN DE TORNAR A CREAR LES FEINES
       if (crearNovesFeines){
           createFeina(plantillaFeina);
       }else {
           //SI NOMES S'HAN BORRAT ALGUNES FEINES I S'HAN D'ACTUALITZAR
           for (int i = 0; i < getAllFeines.size(); i++) {
               if (getAllFeines.get(i).getPlantillaFeina().getId().equals(id_plantilla)) {
                   if (getAllFeines.get(i).getEstat().ordinal() != 0 && getAllFeines.get(i).getEstat().ordinal() != 2) {
                       updateFeinaFromPlantilla(getAllFeines.get(i), plantillaFeina);
                   }
               }
           }
       }*/
    }

    private boolean controlSetmanaFinal(PlantillaFeina plantillaFeinaAntiga, PlantillaFeina plantillaFeinaNova, Long id_plantillaFeina) {

       boolean crearNovesFeines = false;

         for (int i = 0; i < getAllFeines.size(); i ++){
             if ((getAllFeines.get(i).getPlantillaFeina().getId() == id_plantillaFeina) && (getAllFeines.get(i).getEstat().ordinal() != 2)){
                 if (plantillaFeinaNova.getSetmanaFinal().isBefore(plantillaFeinaAntiga.getSetmanaFinal())) {
                     if (getAllFeines.get(i).getSetmana().isAfter(plantillaFeinaNova.getSetmanaFinal())) {
                         feinaRepository.delete(getAllFeines.get(i));
                     }
                 }else{
                     feinaRepository.delete(getAllFeines.get(i));
                     crearNovesFeines = true;
                 }
             }
         }
         return crearNovesFeines;
   }

    private void updateFeinaFromPlantilla(Feina feina, PlantillaFeina plantillaFeina) {
        feina.setNom(plantillaFeina.getNom());
        feina.setDescripcio(plantillaFeina.getObservacions());
        feina.setTempsPrevist(plantillaFeina.getTempsPrevist());
        feina.setIntervalControl(plantillaFeina.getNumeroControl());
        feina.setFacturacioAutomatica(plantillaFeina.getFacturacioAutomatica());
        feina.setCategoria(plantillaFeina.getCategoria());
        feina.setClient(plantillaFeina.getClient());
        feina.setTreballadors(plantillaFeina.getTreballadors());
    }
}
