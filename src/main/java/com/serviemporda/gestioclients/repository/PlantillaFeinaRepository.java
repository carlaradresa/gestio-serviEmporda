package com.serviemporda.gestioclients.repository;
import com.serviemporda.gestioclients.domain.PlantillaFeina;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PlantillaFeina entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlantillaFeinaRepository extends JpaRepository<PlantillaFeina, Long> {

}
