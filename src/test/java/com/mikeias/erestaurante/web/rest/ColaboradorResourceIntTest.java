package com.mikeias.erestaurante.web.rest;

import com.mikeias.erestaurante.repository.CargoRepository;

import com.mikeias.erestaurante.ERestauranteApp;

import com.mikeias.erestaurante.domain.Colaborador;
import com.mikeias.erestaurante.domain.User;
import com.mikeias.erestaurante.domain.Cargo;
import com.mikeias.erestaurante.repository.ColaboradorRepository;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.mikeias.erestaurante.web.rest.TestUtil.sameInstant;
import static com.mikeias.erestaurante.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ColaboradorResource REST controller.
 *
 * @see ColaboradorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ERestauranteApp.class)
public class ColaboradorResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_NASCIMENTO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_NASCIMENTO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Boolean DEFAULT_SEXOMASCULINO = false;
    private static final Boolean UPDATED_SEXOMASCULINO = true;

    private static final String DEFAULT_DOCUMENTO = "AAAAAAAAAA";
    private static final String UPDATED_DOCUMENTO = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONE = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_HORARIO = "AAAAAAAAAA";
    private static final String UPDATED_HORARIO = "BBBBBBBBBB";

    private static final String DEFAULT_PREFERENCIA = "AAAAAAAAAA";
    private static final String UPDATED_PREFERENCIA = "BBBBBBBBBB";

    @Autowired
    private CargoRepository cargoRepository;

     @Autowired
    private ColaboradorRepository colaboradorRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restColaboradorMockMvc;

    private Colaborador colaborador;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ColaboradorResource colaboradorResource = new ColaboradorResource(colaboradorRepository,cargoRepository);
        this.restColaboradorMockMvc = MockMvcBuilders.standaloneSetup(colaboradorResource)
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
    public static Colaborador createEntity(EntityManager em) {
        Colaborador colaborador = new Colaborador()
            .nome(DEFAULT_NOME)
            .nascimento(DEFAULT_NASCIMENTO)
            .sexomasculino(DEFAULT_SEXOMASCULINO)
            .documento(DEFAULT_DOCUMENTO)
            .telefone(DEFAULT_TELEFONE)
            .email(DEFAULT_EMAIL)
            .horario(DEFAULT_HORARIO)
            .preferencia(DEFAULT_PREFERENCIA);
        // Add required entity
        User usuario = UserResourceIntTest.createEntity(em);
        em.persist(usuario);
        em.flush();
        colaborador.setUsuario(usuario);
        // Add required entity
        Cargo cargos = CargoResourceIntTest.createEntity(em);
        em.persist(cargos);
        em.flush();
        colaborador.getCargos().add(cargos);
        return colaborador;
    }

    @Before
    public void initTest() {
        colaborador = createEntity(em);
    }

    @Test
    @Transactional
    public void createColaborador() throws Exception {
        int databaseSizeBeforeCreate = colaboradorRepository.findAll().size();

        // Create the Colaborador
        restColaboradorMockMvc.perform(post("/api/colaboradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colaborador)))
            .andExpect(status().isCreated());

        // Validate the Colaborador in the database
        List<Colaborador> colaboradorList = colaboradorRepository.findAll();
        assertThat(colaboradorList).hasSize(databaseSizeBeforeCreate + 1);
        Colaborador testColaborador = colaboradorList.get(colaboradorList.size() - 1);
        assertThat(testColaborador.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testColaborador.getNascimento()).isEqualTo(DEFAULT_NASCIMENTO);
        assertThat(testColaborador.isSexomasculino()).isEqualTo(DEFAULT_SEXOMASCULINO);
        assertThat(testColaborador.getDocumento()).isEqualTo(DEFAULT_DOCUMENTO);
        assertThat(testColaborador.getTelefone()).isEqualTo(DEFAULT_TELEFONE);
        assertThat(testColaborador.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testColaborador.getHorario()).isEqualTo(DEFAULT_HORARIO);
        assertThat(testColaborador.getPreferencia()).isEqualTo(DEFAULT_PREFERENCIA);
    }

    @Test
    @Transactional
    public void createColaboradorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = colaboradorRepository.findAll().size();

        // Create the Colaborador with an existing ID
        colaborador.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restColaboradorMockMvc.perform(post("/api/colaboradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colaborador)))
            .andExpect(status().isBadRequest());

        // Validate the Colaborador in the database
        List<Colaborador> colaboradorList = colaboradorRepository.findAll();
        assertThat(colaboradorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = colaboradorRepository.findAll().size();
        // set the field null
        colaborador.setNome(null);

        // Create the Colaborador, which fails.

        restColaboradorMockMvc.perform(post("/api/colaboradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colaborador)))
            .andExpect(status().isBadRequest());

        List<Colaborador> colaboradorList = colaboradorRepository.findAll();
        assertThat(colaboradorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllColaboradors() throws Exception {
        // Initialize the database
        colaboradorRepository.saveAndFlush(colaborador);

        // Get all the colaboradorList
        restColaboradorMockMvc.perform(get("/api/colaboradors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(colaborador.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].nascimento").value(hasItem(sameInstant(DEFAULT_NASCIMENTO))))
            .andExpect(jsonPath("$.[*].sexomasculino").value(hasItem(DEFAULT_SEXOMASCULINO.booleanValue())))
            .andExpect(jsonPath("$.[*].documento").value(hasItem(DEFAULT_DOCUMENTO.toString())))
            .andExpect(jsonPath("$.[*].telefone").value(hasItem(DEFAULT_TELEFONE.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].horario").value(hasItem(DEFAULT_HORARIO.toString())))
            .andExpect(jsonPath("$.[*].preferencia").value(hasItem(DEFAULT_PREFERENCIA.toString())));
    }

    @Test
    @Transactional
    public void getColaborador() throws Exception {
        // Initialize the database
        colaboradorRepository.saveAndFlush(colaborador);

        // Get the colaborador
        restColaboradorMockMvc.perform(get("/api/colaboradors/{id}", colaborador.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(colaborador.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.nascimento").value(sameInstant(DEFAULT_NASCIMENTO)))
            .andExpect(jsonPath("$.sexomasculino").value(DEFAULT_SEXOMASCULINO.booleanValue()))
            .andExpect(jsonPath("$.documento").value(DEFAULT_DOCUMENTO.toString()))
            .andExpect(jsonPath("$.telefone").value(DEFAULT_TELEFONE.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.horario").value(DEFAULT_HORARIO.toString()))
            .andExpect(jsonPath("$.preferencia").value(DEFAULT_PREFERENCIA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingColaborador() throws Exception {
        // Get the colaborador
        restColaboradorMockMvc.perform(get("/api/colaboradors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateColaborador() throws Exception {
        // Initialize the database
        colaboradorRepository.saveAndFlush(colaborador);
        int databaseSizeBeforeUpdate = colaboradorRepository.findAll().size();

        // Update the colaborador
        Colaborador updatedColaborador = colaboradorRepository.findOne(colaborador.getId());
        updatedColaborador
            .nome(UPDATED_NOME)
            .nascimento(UPDATED_NASCIMENTO)
            .sexomasculino(UPDATED_SEXOMASCULINO)
            .documento(UPDATED_DOCUMENTO)
            .telefone(UPDATED_TELEFONE)
            .email(UPDATED_EMAIL)
            .horario(UPDATED_HORARIO)
            .preferencia(UPDATED_PREFERENCIA);

        restColaboradorMockMvc.perform(put("/api/colaboradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedColaborador)))
            .andExpect(status().isOk());

        // Validate the Colaborador in the database
        List<Colaborador> colaboradorList = colaboradorRepository.findAll();
        assertThat(colaboradorList).hasSize(databaseSizeBeforeUpdate);
        Colaborador testColaborador = colaboradorList.get(colaboradorList.size() - 1);
        assertThat(testColaborador.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testColaborador.getNascimento()).isEqualTo(UPDATED_NASCIMENTO);
        assertThat(testColaborador.isSexomasculino()).isEqualTo(UPDATED_SEXOMASCULINO);
        assertThat(testColaborador.getDocumento()).isEqualTo(UPDATED_DOCUMENTO);
        assertThat(testColaborador.getTelefone()).isEqualTo(UPDATED_TELEFONE);
        assertThat(testColaborador.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testColaborador.getHorario()).isEqualTo(UPDATED_HORARIO);
        assertThat(testColaborador.getPreferencia()).isEqualTo(UPDATED_PREFERENCIA);
    }

    @Test
    @Transactional
    public void updateNonExistingColaborador() throws Exception {
        int databaseSizeBeforeUpdate = colaboradorRepository.findAll().size();

        // Create the Colaborador

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restColaboradorMockMvc.perform(put("/api/colaboradors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(colaborador)))
            .andExpect(status().isCreated());

        // Validate the Colaborador in the database
        List<Colaborador> colaboradorList = colaboradorRepository.findAll();
        assertThat(colaboradorList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteColaborador() throws Exception {
        // Initialize the database
        colaboradorRepository.saveAndFlush(colaborador);
        int databaseSizeBeforeDelete = colaboradorRepository.findAll().size();

        // Get the colaborador
        restColaboradorMockMvc.perform(delete("/api/colaboradors/{id}", colaborador.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Colaborador> colaboradorList = colaboradorRepository.findAll();
        assertThat(colaboradorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Colaborador.class);
        Colaborador colaborador1 = new Colaborador();
        colaborador1.setId(1L);
        Colaborador colaborador2 = new Colaborador();
        colaborador2.setId(colaborador1.getId());
        assertThat(colaborador1).isEqualTo(colaborador2);
        colaborador2.setId(2L);
        assertThat(colaborador1).isNotEqualTo(colaborador2);
        colaborador1.setId(null);
        assertThat(colaborador1).isNotEqualTo(colaborador2);
    }
}
