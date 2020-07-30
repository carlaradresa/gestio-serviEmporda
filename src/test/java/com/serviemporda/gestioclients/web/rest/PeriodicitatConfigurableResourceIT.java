package com.serviemporda.gestioclients.web.rest;

import com.serviemporda.gestioclients.GestioClientsApp;
import com.serviemporda.gestioclients.domain.PeriodicitatConfigurable;
import com.serviemporda.gestioclients.repository.PeriodicitatConfigurableRepository;
import com.serviemporda.gestioclients.service.PeriodicitatConfigurableService;
import com.serviemporda.gestioclients.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.serviemporda.gestioclients.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.serviemporda.gestioclients.domain.enumeration.Periodicitat;
/**
 * Integration tests for the {@link PeriodicitatConfigurableResource} REST controller.
 */
@SpringBootTest(classes = GestioClientsApp.class)
public class PeriodicitatConfigurableResourceIT {

    private static final Integer DEFAULT_FREQUENCIA = 1;
    private static final Integer UPDATED_FREQUENCIA = 2;

    private static final Periodicitat DEFAULT_PERIODICITAT = Periodicitat.DIA;
    private static final Periodicitat UPDATED_PERIODICITAT = Periodicitat.SETMANA;

    private static final String DEFAULT_OBSERVACIONS = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONS = "BBBBBBBBBB";

    @Autowired
    private PeriodicitatConfigurableRepository periodicitatConfigurableRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPeriodicitatConfigurableMockMvc;

    private PeriodicitatConfigurable periodicitatConfigurable;

    @Autowired
    private PeriodicitatConfigurableService periodicitatConfigurableService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PeriodicitatConfigurableResource periodicitatConfigurableResource = new PeriodicitatConfigurableResource(periodicitatConfigurableRepository, periodicitatConfigurableService);
        this.restPeriodicitatConfigurableMockMvc = MockMvcBuilders.standaloneSetup(periodicitatConfigurableResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PeriodicitatConfigurable createEntity(EntityManager em) {
        PeriodicitatConfigurable periodicitatConfigurable = new PeriodicitatConfigurable()
            .frequencia(DEFAULT_FREQUENCIA)
            .periodicitat(DEFAULT_PERIODICITAT)
            .observacions(DEFAULT_OBSERVACIONS);
        return periodicitatConfigurable;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PeriodicitatConfigurable createUpdatedEntity(EntityManager em) {
        PeriodicitatConfigurable periodicitatConfigurable = new PeriodicitatConfigurable()
            .frequencia(UPDATED_FREQUENCIA)
            .periodicitat(UPDATED_PERIODICITAT)
            .observacions(UPDATED_OBSERVACIONS);
        return periodicitatConfigurable;
    }

    @BeforeEach
    public void initTest() {
        periodicitatConfigurable = createEntity(em);
    }

    @Test
    @Transactional
    public void createPeriodicitatConfigurable() throws Exception {
        int databaseSizeBeforeCreate = periodicitatConfigurableRepository.findAll().size();

        // Create the PeriodicitatConfigurable
        restPeriodicitatConfigurableMockMvc.perform(post("/api/periodicitat-configurables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(periodicitatConfigurable)))
            .andExpect(status().isCreated());

        // Validate the PeriodicitatConfigurable in the database
        List<PeriodicitatConfigurable> periodicitatConfigurableList = periodicitatConfigurableRepository.findAll();
        assertThat(periodicitatConfigurableList).hasSize(databaseSizeBeforeCreate + 1);
        PeriodicitatConfigurable testPeriodicitatConfigurable = periodicitatConfigurableList.get(periodicitatConfigurableList.size() - 1);
        assertThat(testPeriodicitatConfigurable.getFrequencia()).isEqualTo(DEFAULT_FREQUENCIA);
        assertThat(testPeriodicitatConfigurable.getPeriodicitat()).isEqualTo(DEFAULT_PERIODICITAT);
        assertThat(testPeriodicitatConfigurable.getObservacions()).isEqualTo(DEFAULT_OBSERVACIONS);
    }

    @Test
    @Transactional
    public void createPeriodicitatConfigurableWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = periodicitatConfigurableRepository.findAll().size();

        // Create the PeriodicitatConfigurable with an existing ID
        periodicitatConfigurable.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPeriodicitatConfigurableMockMvc.perform(post("/api/periodicitat-configurables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(periodicitatConfigurable)))
            .andExpect(status().isBadRequest());

        // Validate the PeriodicitatConfigurable in the database
        List<PeriodicitatConfigurable> periodicitatConfigurableList = periodicitatConfigurableRepository.findAll();
        assertThat(periodicitatConfigurableList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPeriodicitatConfigurables() throws Exception {
        // Initialize the database
        periodicitatConfigurableRepository.saveAndFlush(periodicitatConfigurable);

        // Get all the periodicitatConfigurableList
        restPeriodicitatConfigurableMockMvc.perform(get("/api/periodicitat-configurables?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(periodicitatConfigurable.getId().intValue())))
            .andExpect(jsonPath("$.[*].frequencia").value(hasItem(DEFAULT_FREQUENCIA)))
            .andExpect(jsonPath("$.[*].periodicitat").value(hasItem(DEFAULT_PERIODICITAT.toString())))
            .andExpect(jsonPath("$.[*].observacions").value(hasItem(DEFAULT_OBSERVACIONS)));
    }

    @Test
    @Transactional
    public void getPeriodicitatConfigurable() throws Exception {
        // Initialize the database
        periodicitatConfigurableRepository.saveAndFlush(periodicitatConfigurable);

        // Get the periodicitatConfigurable
        restPeriodicitatConfigurableMockMvc.perform(get("/api/periodicitat-configurables/{id}", periodicitatConfigurable.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(periodicitatConfigurable.getId().intValue()))
            .andExpect(jsonPath("$.frequencia").value(DEFAULT_FREQUENCIA))
            .andExpect(jsonPath("$.periodicitat").value(DEFAULT_PERIODICITAT.toString()))
            .andExpect(jsonPath("$.observacions").value(DEFAULT_OBSERVACIONS));
    }

    @Test
    @Transactional
    public void getNonExistingPeriodicitatConfigurable() throws Exception {
        // Get the periodicitatConfigurable
        restPeriodicitatConfigurableMockMvc.perform(get("/api/periodicitat-configurables/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePeriodicitatConfigurable() throws Exception {
        // Initialize the database
        periodicitatConfigurableRepository.saveAndFlush(periodicitatConfigurable);

        int databaseSizeBeforeUpdate = periodicitatConfigurableRepository.findAll().size();

        // Update the periodicitatConfigurable
        PeriodicitatConfigurable updatedPeriodicitatConfigurable = periodicitatConfigurableRepository.findById(periodicitatConfigurable.getId()).get();
        // Disconnect from session so that the updates on updatedPeriodicitatConfigurable are not directly saved in db
        em.detach(updatedPeriodicitatConfigurable);
        updatedPeriodicitatConfigurable
            .frequencia(UPDATED_FREQUENCIA)
            .periodicitat(UPDATED_PERIODICITAT)
            .observacions(UPDATED_OBSERVACIONS);

        restPeriodicitatConfigurableMockMvc.perform(put("/api/periodicitat-configurables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPeriodicitatConfigurable)))
            .andExpect(status().isOk());

        // Validate the PeriodicitatConfigurable in the database
        List<PeriodicitatConfigurable> periodicitatConfigurableList = periodicitatConfigurableRepository.findAll();
        assertThat(periodicitatConfigurableList).hasSize(databaseSizeBeforeUpdate);
        PeriodicitatConfigurable testPeriodicitatConfigurable = periodicitatConfigurableList.get(periodicitatConfigurableList.size() - 1);
        assertThat(testPeriodicitatConfigurable.getFrequencia()).isEqualTo(UPDATED_FREQUENCIA);
        assertThat(testPeriodicitatConfigurable.getPeriodicitat()).isEqualTo(UPDATED_PERIODICITAT);
        assertThat(testPeriodicitatConfigurable.getObservacions()).isEqualTo(UPDATED_OBSERVACIONS);
    }

    @Test
    @Transactional
    public void updateNonExistingPeriodicitatConfigurable() throws Exception {
        int databaseSizeBeforeUpdate = periodicitatConfigurableRepository.findAll().size();

        // Create the PeriodicitatConfigurable

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPeriodicitatConfigurableMockMvc.perform(put("/api/periodicitat-configurables")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(periodicitatConfigurable)))
            .andExpect(status().isBadRequest());

        // Validate the PeriodicitatConfigurable in the database
        List<PeriodicitatConfigurable> periodicitatConfigurableList = periodicitatConfigurableRepository.findAll();
        assertThat(periodicitatConfigurableList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePeriodicitatConfigurable() throws Exception {
        // Initialize the database
        periodicitatConfigurableRepository.saveAndFlush(periodicitatConfigurable);

        int databaseSizeBeforeDelete = periodicitatConfigurableRepository.findAll().size();

        // Delete the periodicitatConfigurable
        restPeriodicitatConfigurableMockMvc.perform(delete("/api/periodicitat-configurables/{id}", periodicitatConfigurable.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PeriodicitatConfigurable> periodicitatConfigurableList = periodicitatConfigurableRepository.findAll();
        assertThat(periodicitatConfigurableList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
