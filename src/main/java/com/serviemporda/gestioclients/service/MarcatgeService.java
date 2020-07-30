package com.serviemporda.gestioclients.service;

import com.serviemporda.gestioclients.domain.Marcatge;
import com.serviemporda.gestioclients.domain.Treballador;
import com.serviemporda.gestioclients.domain.Treballador_;
import com.serviemporda.gestioclients.repository.AuthorityRepository;
import com.serviemporda.gestioclients.repository.MarcatgeRepository;
import com.serviemporda.gestioclients.repository.PeriodicitatConfigurableRepository;
import com.serviemporda.gestioclients.repository.TreballadorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;


/**
 * Service class for managing users.
 */
@Service
@Transactional
public class MarcatgeService {

    private final Logger log = LoggerFactory.getLogger(com.serviemporda.gestioclients.service.MarcatgeService.class);

    private final MarcatgeRepository marcatgeRepository;

    private final TreballadorRepository treballadorRepository;

    private final CacheManager cacheManager;

    private final AuthorityRepository authorityRepository;

    private List<Treballador> treballadors;


    public MarcatgeService(MarcatgeRepository marcatgeRepository, TreballadorRepository treballadorRepository, CacheManager cacheManager, AuthorityRepository authorityRepository) {
        this.marcatgeRepository = marcatgeRepository;
        this.treballadorRepository = treballadorRepository;
        this.cacheManager = cacheManager;
        this.authorityRepository = authorityRepository;
    }

   /* public void addHoursToEmployee(Marcatge result) {

        Instant hora_entrada = result.getHoraEntrada();
        Instant hora_sortida = result.getHoraSortida();

        Duration duration = Duration.between(hora_entrada,hora_sortida);
        Duration duration_total;

        treballadors = treballadorRepository.findAll();

        Treballador treballador = findTreballadorMarcatge(result,treballadors);
        duration_total = treballador.getCarregaHores();
        duration_total.plus(duration);
        treballador.setCarregaHores(duration_total);
        treballadorRepository.save(treballador);
    }*/

    public Treballador findTreballadorMarcatge(Marcatge marcatge, List<Treballador> treballadorList){

        Treballador treballador = new Treballador();
        Treballador treballador_cerca = new Treballador();
        Boolean trobat = false;

        for (int i = 0; i < treballadorList.size() && !trobat; i ++){
            treballador_cerca = marcatge.getTreballador();
            if (treballador_cerca.getId().equals(treballadorList.get(i).getId())){
                treballador = treballador_cerca;
                trobat = true;
            }
        }
        return  treballador;
    }
}
