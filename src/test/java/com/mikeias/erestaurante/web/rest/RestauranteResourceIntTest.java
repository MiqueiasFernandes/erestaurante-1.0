package com.mikeias.erestaurante.web.rest;

import com.mikeias.erestaurante.repository.CargoRepository;

import com.mikeias.erestaurante.ERestauranteApp;

import com.mikeias.erestaurante.domain.Restaurante;
import com.mikeias.erestaurante.domain.Colaborador;
import com.mikeias.erestaurante.repository.RestauranteRepository;
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
 * Test class for the RestauranteResource REST controller.
 *
 * @see RestauranteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ERestauranteApp.class)
public class RestauranteResourceIntTest {

    private static final String DEFAULT_RAZAO_SOCIAL = "AAAAAAAAAA";
    private static final String UPDATED_RAZAO_SOCIAL = "BBBBBBBBBB";

    private static final String DEFAULT_NOME_FANTASIA = "AAAAAAAAAA";
    private static final String UPDATED_NOME_FANTASIA = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONE = "BBBBBBBBBB";

    private static final String DEFAULT_CELULAR = "AAAAAAAAAA";
    private static final String UPDATED_CELULAR = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_SITE = "AAAAAAAAAA";
    private static final String UPDATED_SITE = "BBBBBBBBBB";

    private static final String DEFAULT_CNPJ = "AAAAAAAAAA";
    private static final String UPDATED_CNPJ = "BBBBBBBBBB";

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_CODIGO_SEG_CONTRIBUINTE = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO_SEG_CONTRIBUINTE = "BBBBBBBBBB";

    private static final String DEFAULT_LICENCA = "AAAAAAAAAA";
    private static final String UPDATED_LICENCA = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_FUNCADAO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FUNCADAO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final byte[] DEFAULT_LOGO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_LOGO = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_LOGO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_LOGO_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_PAGINA = "AAAAAAAAAA";
    private static final String UPDATED_PAGINA = "BBBBBBBBBB";

    private static final String DEFAULT_LOCALHOST = "AAAAAAAAAA";
    private static final String UPDATED_LOCALHOST = "BBBBBBBBBB";

    @Autowired
    private CargoRepository cargoRepository;

     @Autowired
    private RestauranteRepository restauranteRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRestauranteMockMvc;

    private Restaurante restaurante;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RestauranteResource restauranteResource = new RestauranteResource(restauranteRepository,cargoRepository);
        this.restRestauranteMockMvc = MockMvcBuilders.standaloneSetup(restauranteResource)
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
    public static Restaurante createEntity(EntityManager em) {
        Restaurante restaurante = new Restaurante()
            .razaoSocial(DEFAULT_RAZAO_SOCIAL)
            .nomeFantasia(DEFAULT_NOME_FANTASIA)
            .telefone(DEFAULT_TELEFONE)
            .celular(DEFAULT_CELULAR)
            .email(DEFAULT_EMAIL)
            .site(DEFAULT_SITE)
            .cnpj(DEFAULT_CNPJ)
            .codigo(DEFAULT_CODIGO)
            .codigoSegContribuinte(DEFAULT_CODIGO_SEG_CONTRIBUINTE)
            .licenca(DEFAULT_LICENCA)
            .funcadao(DEFAULT_FUNCADAO)
            .logo(DEFAULT_LOGO)
            .logoContentType(DEFAULT_LOGO_CONTENT_TYPE)
            .pagina(DEFAULT_PAGINA)
            .localhost(DEFAULT_LOCALHOST);
        // Add required entity
        Colaborador proprietario = ColaboradorResourceIntTest.createEntity(em);
        em.persist(proprietario);
        em.flush();
        restaurante.getProprietarios().add(proprietario);
        return restaurante;
    }

    @Before
    public void initTest() {
        restaurante = createEntity(em);
    }

    @Test
    @Transactional
    public void createRestaurante() throws Exception {
        int databaseSizeBeforeCreate = restauranteRepository.findAll().size();

        // Create the Restaurante
        restRestauranteMockMvc.perform(post("/api/restaurantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restaurante)))
            .andExpect(status().isCreated());

        // Validate the Restaurante in the database
        List<Restaurante> restauranteList = restauranteRepository.findAll();
        assertThat(restauranteList).hasSize(databaseSizeBeforeCreate + 1);
        Restaurante testRestaurante = restauranteList.get(restauranteList.size() - 1);
        assertThat(testRestaurante.getRazaoSocial()).isEqualTo(DEFAULT_RAZAO_SOCIAL);
        assertThat(testRestaurante.getNomeFantasia()).isEqualTo(DEFAULT_NOME_FANTASIA);
        assertThat(testRestaurante.getTelefone()).isEqualTo(DEFAULT_TELEFONE);
        assertThat(testRestaurante.getCelular()).isEqualTo(DEFAULT_CELULAR);
        assertThat(testRestaurante.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testRestaurante.getSite()).isEqualTo(DEFAULT_SITE);
        assertThat(testRestaurante.getCnpj()).isEqualTo(DEFAULT_CNPJ);
        assertThat(testRestaurante.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testRestaurante.getCodigoSegContribuinte()).isEqualTo(DEFAULT_CODIGO_SEG_CONTRIBUINTE);
        assertThat(testRestaurante.getLicenca()).isEqualTo(DEFAULT_LICENCA);
        assertThat(testRestaurante.getFuncadao()).isEqualTo(DEFAULT_FUNCADAO);
        assertThat(testRestaurante.getLogo()).isEqualTo(DEFAULT_LOGO);
        assertThat(testRestaurante.getLogoContentType()).isEqualTo(DEFAULT_LOGO_CONTENT_TYPE);
        assertThat(testRestaurante.getPagina()).isEqualTo(DEFAULT_PAGINA);
        assertThat(testRestaurante.getLocalhost()).isEqualTo(DEFAULT_LOCALHOST);
    }

    @Test
    @Transactional
    public void createRestauranteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = restauranteRepository.findAll().size();

        // Create the Restaurante with an existing ID
        restaurante.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRestauranteMockMvc.perform(post("/api/restaurantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restaurante)))
            .andExpect(status().isBadRequest());

        // Validate the Restaurante in the database
        List<Restaurante> restauranteList = restauranteRepository.findAll();
        assertThat(restauranteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRestaurantes() throws Exception {
        // Initialize the database
        restauranteRepository.saveAndFlush(restaurante);

        // Get all the restauranteList
        restRestauranteMockMvc.perform(get("/api/restaurantes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(restaurante.getId().intValue())))
            .andExpect(jsonPath("$.[*].razaoSocial").value(hasItem(DEFAULT_RAZAO_SOCIAL.toString())))
            .andExpect(jsonPath("$.[*].nomeFantasia").value(hasItem(DEFAULT_NOME_FANTASIA.toString())))
            .andExpect(jsonPath("$.[*].telefone").value(hasItem(DEFAULT_TELEFONE.toString())))
            .andExpect(jsonPath("$.[*].celular").value(hasItem(DEFAULT_CELULAR.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].site").value(hasItem(DEFAULT_SITE.toString())))
            .andExpect(jsonPath("$.[*].cnpj").value(hasItem(DEFAULT_CNPJ.toString())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].codigoSegContribuinte").value(hasItem(DEFAULT_CODIGO_SEG_CONTRIBUINTE.toString())))
            .andExpect(jsonPath("$.[*].licenca").value(hasItem(DEFAULT_LICENCA.toString())))
            .andExpect(jsonPath("$.[*].funcadao").value(hasItem(sameInstant(DEFAULT_FUNCADAO))))
            .andExpect(jsonPath("$.[*].logoContentType").value(hasItem(DEFAULT_LOGO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].logo").value(hasItem(Base64Utils.encodeToString(DEFAULT_LOGO))))
            .andExpect(jsonPath("$.[*].pagina").value(hasItem(DEFAULT_PAGINA.toString())))
            .andExpect(jsonPath("$.[*].localhost").value(hasItem(DEFAULT_LOCALHOST.toString())));
    }

    @Test
    @Transactional
    public void getRestaurante() throws Exception {
        // Initialize the database
        restauranteRepository.saveAndFlush(restaurante);

        // Get the restaurante
        restRestauranteMockMvc.perform(get("/api/restaurantes/{id}", restaurante.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(restaurante.getId().intValue()))
            .andExpect(jsonPath("$.razaoSocial").value(DEFAULT_RAZAO_SOCIAL.toString()))
            .andExpect(jsonPath("$.nomeFantasia").value(DEFAULT_NOME_FANTASIA.toString()))
            .andExpect(jsonPath("$.telefone").value(DEFAULT_TELEFONE.toString()))
            .andExpect(jsonPath("$.celular").value(DEFAULT_CELULAR.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.site").value(DEFAULT_SITE.toString()))
            .andExpect(jsonPath("$.cnpj").value(DEFAULT_CNPJ.toString()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.codigoSegContribuinte").value(DEFAULT_CODIGO_SEG_CONTRIBUINTE.toString()))
            .andExpect(jsonPath("$.licenca").value(DEFAULT_LICENCA.toString()))
            .andExpect(jsonPath("$.funcadao").value(sameInstant(DEFAULT_FUNCADAO)))
            .andExpect(jsonPath("$.logoContentType").value(DEFAULT_LOGO_CONTENT_TYPE))
            .andExpect(jsonPath("$.logo").value(Base64Utils.encodeToString(DEFAULT_LOGO)))
            .andExpect(jsonPath("$.pagina").value(DEFAULT_PAGINA.toString()))
            .andExpect(jsonPath("$.localhost").value(DEFAULT_LOCALHOST.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRestaurante() throws Exception {
        // Get the restaurante
        restRestauranteMockMvc.perform(get("/api/restaurantes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRestaurante() throws Exception {
        // Initialize the database
        restauranteRepository.saveAndFlush(restaurante);
        int databaseSizeBeforeUpdate = restauranteRepository.findAll().size();

        // Update the restaurante
        Restaurante updatedRestaurante = restauranteRepository.findOne(restaurante.getId());
        updatedRestaurante
            .razaoSocial(UPDATED_RAZAO_SOCIAL)
            .nomeFantasia(UPDATED_NOME_FANTASIA)
            .telefone(UPDATED_TELEFONE)
            .celular(UPDATED_CELULAR)
            .email(UPDATED_EMAIL)
            .site(UPDATED_SITE)
            .cnpj(UPDATED_CNPJ)
            .codigo(UPDATED_CODIGO)
            .codigoSegContribuinte(UPDATED_CODIGO_SEG_CONTRIBUINTE)
            .licenca(UPDATED_LICENCA)
            .funcadao(UPDATED_FUNCADAO)
            .logo(UPDATED_LOGO)
            .logoContentType(UPDATED_LOGO_CONTENT_TYPE)
            .pagina(UPDATED_PAGINA)
            .localhost(UPDATED_LOCALHOST);

        restRestauranteMockMvc.perform(put("/api/restaurantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRestaurante)))
            .andExpect(status().isOk());

        // Validate the Restaurante in the database
        List<Restaurante> restauranteList = restauranteRepository.findAll();
        assertThat(restauranteList).hasSize(databaseSizeBeforeUpdate);
        Restaurante testRestaurante = restauranteList.get(restauranteList.size() - 1);
        assertThat(testRestaurante.getRazaoSocial()).isEqualTo(UPDATED_RAZAO_SOCIAL);
        assertThat(testRestaurante.getNomeFantasia()).isEqualTo(UPDATED_NOME_FANTASIA);
        assertThat(testRestaurante.getTelefone()).isEqualTo(UPDATED_TELEFONE);
        assertThat(testRestaurante.getCelular()).isEqualTo(UPDATED_CELULAR);
        assertThat(testRestaurante.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testRestaurante.getSite()).isEqualTo(UPDATED_SITE);
        assertThat(testRestaurante.getCnpj()).isEqualTo(UPDATED_CNPJ);
        assertThat(testRestaurante.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testRestaurante.getCodigoSegContribuinte()).isEqualTo(UPDATED_CODIGO_SEG_CONTRIBUINTE);
        assertThat(testRestaurante.getLicenca()).isEqualTo(UPDATED_LICENCA);
        assertThat(testRestaurante.getFuncadao()).isEqualTo(UPDATED_FUNCADAO);
        assertThat(testRestaurante.getLogo()).isEqualTo(UPDATED_LOGO);
        assertThat(testRestaurante.getLogoContentType()).isEqualTo(UPDATED_LOGO_CONTENT_TYPE);
        assertThat(testRestaurante.getPagina()).isEqualTo(UPDATED_PAGINA);
        assertThat(testRestaurante.getLocalhost()).isEqualTo(UPDATED_LOCALHOST);
    }

    @Test
    @Transactional
    public void updateNonExistingRestaurante() throws Exception {
        int databaseSizeBeforeUpdate = restauranteRepository.findAll().size();

        // Create the Restaurante

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRestauranteMockMvc.perform(put("/api/restaurantes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(restaurante)))
            .andExpect(status().isCreated());

        // Validate the Restaurante in the database
        List<Restaurante> restauranteList = restauranteRepository.findAll();
        assertThat(restauranteList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRestaurante() throws Exception {
        // Initialize the database
        restauranteRepository.saveAndFlush(restaurante);
        int databaseSizeBeforeDelete = restauranteRepository.findAll().size();

        // Get the restaurante
        restRestauranteMockMvc.perform(delete("/api/restaurantes/{id}", restaurante.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Restaurante> restauranteList = restauranteRepository.findAll();
        assertThat(restauranteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Restaurante.class);
        Restaurante restaurante1 = new Restaurante();
        restaurante1.setId(1L);
        Restaurante restaurante2 = new Restaurante();
        restaurante2.setId(restaurante1.getId());
        assertThat(restaurante1).isEqualTo(restaurante2);
        restaurante2.setId(2L);
        assertThat(restaurante1).isNotEqualTo(restaurante2);
        restaurante1.setId(null);
        assertThat(restaurante1).isNotEqualTo(restaurante2);
    }
}
