package com.serviemporda.gestioclients.repository;

import com.serviemporda.gestioclients.domain.PlantillaFeina;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the PlantillaFeina entity.
 */
@Repository
public interface PlantillaFeinaRepository extends JpaRepository<PlantillaFeina, Long> {

    @Query(value = "select distinct plantillaFeina from PlantillaFeina plantillaFeina left join fetch plantillaFeina.treballadors left join fetch plantillaFeina.periodicitatSetmanals where plantillaFeina.borrat = false",
        countQuery = "select count(distinct plantillaFeina) from PlantillaFeina plantillaFeina")
    Page<PlantillaFeina> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct plantillaFeina from PlantillaFeina plantillaFeina left join fetch plantillaFeina.treballadors left join fetch plantillaFeina.periodicitatSetmanals where plantillaFeina.borrat = false")
    List<PlantillaFeina> findAllWithEagerRelationships();

    @Query("select plantillaFeina from PlantillaFeina plantillaFeina left join fetch plantillaFeina.treballadors left join fetch plantillaFeina.periodicitatSetmanals where plantillaFeina.id =:id and plantillaFeina.borrat = false")
    Optional<PlantillaFeina> findOneWithEagerRelationships(@Param("id") Long id);

}
