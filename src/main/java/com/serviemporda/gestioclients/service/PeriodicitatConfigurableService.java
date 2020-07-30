package com.serviemporda.gestioclients.service;

import com.serviemporda.gestioclients.domain.*;
import com.serviemporda.gestioclients.domain.enumeration.Estat;
import com.serviemporda.gestioclients.domain.enumeration.Periodicitat;
import com.serviemporda.gestioclients.repository.AuthorityRepository;
import com.serviemporda.gestioclients.repository.FeinaRepository;
import com.serviemporda.gestioclients.repository.PeriodicitatConfigurableRepository;
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
public class PeriodicitatConfigurableService {

    private final Logger log = LoggerFactory.getLogger(com.serviemporda.gestioclients.service.PeriodicitatConfigurableService.class);

    private final PeriodicitatConfigurableRepository periodicitatConfigurableRepository;

    private final CacheManager cacheManager;

    private final AuthorityRepository authorityRepository;


    public PeriodicitatConfigurableService(PeriodicitatConfigurableRepository periodicitatConfigurableRepository, CacheManager cacheManager, AuthorityRepository authorityRepository) {
        this.periodicitatConfigurableRepository = periodicitatConfigurableRepository;
        this.cacheManager = cacheManager;
        this.authorityRepository = authorityRepository;
    }

    public PeriodicitatConfigurable createName(PeriodicitatConfigurable pc){

        PeriodicitatConfigurable pc_create = new PeriodicitatConfigurable();
        Integer frequencia = pc.getFrequencia();
        String periodicitat = pc.getPeriodicitat().toString();
        String periodicitat_plural = "";

        if (frequencia == 1){
            pc_create.setObservacions("CADA "+pc.getPeriodicitat().toString());
        }else{
            switch(periodicitat) {
                case "DIA":
                    periodicitat_plural = "DIES";
                    break;
                case "SETMANA":
                    periodicitat_plural = "SETMANES";
                    break;
                case "QUINZENAL":
                    periodicitat_plural = "QUINZENES";
                    break;
                case "MES":
                    periodicitat_plural = "MESOS";
                    break;
                case "ANY":
                    periodicitat_plural = "ANYS";
                    break;
                default:
            }
            pc_create.setObservacions("CADA " + frequencia + " "+periodicitat_plural);
        }

        return pc_create;
    }
}
