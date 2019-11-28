package com.serviemporda.gestioclients.repository;
import com.serviemporda.gestioclients.domain.RepeticioTascaSetmanal;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the RepeticioTascaSetmanal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RepeticioTascaSetmanalRepository extends JpaRepository<RepeticioTascaSetmanal, Long> {

}
