package com.mikeias.erestaurante.web.rest;

import com.mikeias.erestaurante.ERestauranteApp;

import com.mikeias.erestaurante.domain.Impressora;
import com.mikeias.erestaurante.repository.CargoRepository;
import com.mikeias.erestaurante.repository.ImpressoraRepository;
import com.mikeias.erestaurante.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mikeias.erestaurante.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ImpressoraResource REST controller.
 *
 * @see ImpressoraResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ERestauranteApp.class)
public class ImpressoraResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final Integer DEFAULT_PRIORIDADE = 1;
    private static final Integer UPDATED_PRIORIDADE = 2;

    private static final String DEFAULT_SCRIPT = "AAAAAAAAAA";
    private static final String UPDATED_SCRIPT = "BBBBBBBBBB";

    private static final String DEFAULT_LOCAL = "AAAAAAAAAA";
    private static final String UPDATED_LOCAL = "BBBBBBBBBB";

    @Autowired
    private ImpressoraRepository impressoraRepository;
    @Autowired
    private CargoRepository cargoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restImpressoraMockMvc;

    private Impressora impressora;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ImpressoraResource impressoraResource = new ImpressoraResource(impressoraRepository,cargoRepository);
        this.restImpressoraMockMvc = MockMvcBuilders.standaloneSetup(impressoraResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Impressora createEntity(EntityManager em) {
        Impressora impressora = new Impressora()
            .nome(DEFAULT_NOME)
            .codigo(DEFAULT_CODIGO)
            .prioridade(DEFAULT_PRIORIDADE)
            .script(DEFAULT_SCRIPT)
            .local(DEFAULT_LOCAL);
        return impressora;
    }

    @Before
    public void initTest() {
        impressora = createEntity(em);
    }

    @Test
    @Transactional
    public void createImpressora() throws Exception {
        int databaseSizeBeforeCreate = impressoraRepository.findAll().size();

        // Create the Impressora
        restImpressoraMockMvc.perform(post("/api/impressoras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(impressora)))
            .andExpect(status().isCreated());

        // Validate the Impressora in the database
        List<Impressora> impressoraList = impressoraRepository.findAll();
        assertThat(impressoraList).hasSize(databaseSizeBeforeCreate + 1);
        Impressora testImpressora = impressoraList.get(impressoraList.size() - 1);
        assertThat(testImpressora.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testImpressora.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testImpressora.getPrioridade()).isEqualTo(DEFAULT_PRIORIDADE);
        assertThat(testImpressora.getScript()).isEqualTo(DEFAULT_SCRIPT);
        assertThat(testImpressora.getLocal()).isEqualTo(DEFAULT_LOCAL);
    }

    @Test
    @Transactional
    public void createImpressoraWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = impressoraRepository.findAll().size();

        // Create the Impressora with an existing ID
        impressora.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restImpressoraMockMvc.perform(post("/api/impressoras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(impressora)))
            .andExpect(status().isBadRequest());

        // Validate the Impressora in the database
        List<Impressora> impressoraList = impressoraRepository.findAll();
        assertThat(impressoraList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllImpressoras() throws Exception {
        // Initialize the database
        impressoraRepository.saveAndFlush(impressora);

        // Get all the impressoraList
        restImpressoraMockMvc.perform(get("/api/impressoras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(impressora.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].prioridade").value(hasItem(DEFAULT_PRIORIDADE)))
            .andExpect(jsonPath("$.[*].script").value(hasItem(DEFAULT_SCRIPT.toString())))
            .andExpect(jsonPath("$.[*].local").value(hasItem(DEFAULT_LOCAL.toString())));
    }

    @Test
    @Transactional
    public void getImpressora() throws Exception {
        // Initialize the database
        impressoraRepository.saveAndFlush(impressora);

        // Get the impressora
        restImpressoraMockMvc.perform(get("/api/impressoras/{id}", impressora.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(impressora.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.prioridade").value(DEFAULT_PRIORIDADE))
            .andExpect(jsonPath("$.script").value(DEFAULT_SCRIPT.toString()))
            .andExpect(jsonPath("$.local").value(DEFAULT_LOCAL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingImpressora() throws Exception {
        // Get the impressora
        restImpressoraMockMvc.perform(get("/api/impressoras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateImpressora() throws Exception {
        // Initialize the database
        impressoraRepository.saveAndFlush(impressora);
        int databaseSizeBeforeUpdate = impressoraRepository.findAll().size();

        // Update the impressora
        Impressora updatedImpressora = impressoraRepository.findOne(impressora.getId());
        updatedImpressora
            .nome(UPDATED_NOME)
            .codigo(UPDATED_CODIGO)
            .prioridade(UPDATED_PRIORIDADE)
            .script(UPDATED_SCRIPT)
            .local(UPDATED_LOCAL);

        restImpressoraMockMvc.perform(put("/api/impressoras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedImpressora)))
            .andExpect(status().isOk());

        // Validate the Impressora in the database
        List<Impressora> impressoraList = impressoraRepository.findAll();
        assertThat(impressoraList).hasSize(databaseSizeBeforeUpdate);
        Impressora testImpressora = impressoraList.get(impressoraList.size() - 1);
        assertThat(testImpressora.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testImpressora.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testImpressora.getPrioridade()).isEqualTo(UPDATED_PRIORIDADE);
        assertThat(testImpressora.getScript()).isEqualTo(UPDATED_SCRIPT);
        assertThat(testImpressora.getLocal()).isEqualTo(UPDATED_LOCAL);
    }

    @Test
    @Transactional
    public void updateNonExistingImpressora() throws Exception {
        int databaseSizeBeforeUpdate = impressoraRepository.findAll().size();

        // Create the Impressora

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restImpressoraMockMvc.perform(put("/api/impressoras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(impressora)))
            .andExpect(status().isCreated());

        // Validate the Impressora in the database
        List<Impressora> impressoraList = impressoraRepository.findAll();
        assertThat(impressoraList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteImpressora() throws Exception {
        // Initialize the database
        impressoraRepository.saveAndFlush(impressora);
        int databaseSizeBeforeDelete = impressoraRepository.findAll().size();

        // Get the impressora
        restImpressoraMockMvc.perform(delete("/api/impressoras/{id}", impressora.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Impressora> impressoraList = impressoraRepository.findAll();
        assertThat(impressoraList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Impressora.class);
        Impressora impressora1 = new Impressora();
        impressora1.setId(1L);
        Impressora impressora2 = new Impressora();
        impressora2.setId(impressora1.getId());
        assertThat(impressora1).isEqualTo(impressora2);
        impressora2.setId(2L);
        assertThat(impressora1).isNotEqualTo(impressora2);
        impressora1.setId(null);
        assertThat(impressora1).isNotEqualTo(impressora2);
    }
}
