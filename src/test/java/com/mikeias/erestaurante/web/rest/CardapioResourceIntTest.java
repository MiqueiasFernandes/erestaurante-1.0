package com.mikeias.erestaurante.web.rest;

import com.mikeias.erestaurante.repository.CargoRepository;

import com.mikeias.erestaurante.ERestauranteApp;

import com.mikeias.erestaurante.domain.Cardapio;
import com.mikeias.erestaurante.repository.CardapioRepository;
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

import com.mikeias.erestaurante.domain.enumeration.Dia;
/**
 * Test class for the CardapioResource REST controller.
 *
 * @see CardapioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ERestauranteApp.class)
public class CardapioResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final Dia DEFAULT_DIA = Dia.DOMINGO;
    private static final Dia UPDATED_DIA = Dia.SEGUNDA;

    private static final String DEFAULT_PERIODO = "AAAAAAAAAA";
    private static final String UPDATED_PERIODO = "BBBBBBBBBB";

    private static final String DEFAULT_DISPOSICAO = "AAAAAAAAAA";
    private static final String UPDATED_DISPOSICAO = "BBBBBBBBBB";

    private static final String DEFAULT_HTML = "AAAAAAAAAA";
    private static final String UPDATED_HTML = "BBBBBBBBBB";

    private static final Boolean DEFAULT_HABILITAR = false;
    private static final Boolean UPDATED_HABILITAR = true;

    @Autowired
    private CargoRepository cargoRepository;

     @Autowired
    private CardapioRepository cardapioRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCardapioMockMvc;

    private Cardapio cardapio;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CardapioResource cardapioResource = new CardapioResource(cardapioRepository,cargoRepository);
        this.restCardapioMockMvc = MockMvcBuilders.standaloneSetup(cardapioResource)
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
    public static Cardapio createEntity(EntityManager em) {
        Cardapio cardapio = new Cardapio()
            .nome(DEFAULT_NOME)
            .dia(DEFAULT_DIA)
            .periodo(DEFAULT_PERIODO)
            .disposicao(DEFAULT_DISPOSICAO)
            .html(DEFAULT_HTML)
            .habilitar(DEFAULT_HABILITAR);
        return cardapio;
    }

    @Before
    public void initTest() {
        cardapio = createEntity(em);
    }

    @Test
    @Transactional
    public void createCardapio() throws Exception {
        int databaseSizeBeforeCreate = cardapioRepository.findAll().size();

        // Create the Cardapio
        restCardapioMockMvc.perform(post("/api/cardapios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardapio)))
            .andExpect(status().isCreated());

        // Validate the Cardapio in the database
        List<Cardapio> cardapioList = cardapioRepository.findAll();
        assertThat(cardapioList).hasSize(databaseSizeBeforeCreate + 1);
        Cardapio testCardapio = cardapioList.get(cardapioList.size() - 1);
        assertThat(testCardapio.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testCardapio.getDia()).isEqualTo(DEFAULT_DIA);
        assertThat(testCardapio.getPeriodo()).isEqualTo(DEFAULT_PERIODO);
        assertThat(testCardapio.getDisposicao()).isEqualTo(DEFAULT_DISPOSICAO);
        assertThat(testCardapio.getHtml()).isEqualTo(DEFAULT_HTML);
        assertThat(testCardapio.isHabilitar()).isEqualTo(DEFAULT_HABILITAR);
    }

    @Test
    @Transactional
    public void createCardapioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cardapioRepository.findAll().size();

        // Create the Cardapio with an existing ID
        cardapio.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCardapioMockMvc.perform(post("/api/cardapios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardapio)))
            .andExpect(status().isBadRequest());

        // Validate the Cardapio in the database
        List<Cardapio> cardapioList = cardapioRepository.findAll();
        assertThat(cardapioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCardapios() throws Exception {
        // Initialize the database
        cardapioRepository.saveAndFlush(cardapio);

        // Get all the cardapioList
        restCardapioMockMvc.perform(get("/api/cardapios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cardapio.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].dia").value(hasItem(DEFAULT_DIA.toString())))
            .andExpect(jsonPath("$.[*].periodo").value(hasItem(DEFAULT_PERIODO.toString())))
            .andExpect(jsonPath("$.[*].disposicao").value(hasItem(DEFAULT_DISPOSICAO.toString())))
            .andExpect(jsonPath("$.[*].html").value(hasItem(DEFAULT_HTML.toString())))
            .andExpect(jsonPath("$.[*].habilitar").value(hasItem(DEFAULT_HABILITAR.booleanValue())));
    }

    @Test
    @Transactional
    public void getCardapio() throws Exception {
        // Initialize the database
        cardapioRepository.saveAndFlush(cardapio);

        // Get the cardapio
        restCardapioMockMvc.perform(get("/api/cardapios/{id}", cardapio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cardapio.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.dia").value(DEFAULT_DIA.toString()))
            .andExpect(jsonPath("$.periodo").value(DEFAULT_PERIODO.toString()))
            .andExpect(jsonPath("$.disposicao").value(DEFAULT_DISPOSICAO.toString()))
            .andExpect(jsonPath("$.html").value(DEFAULT_HTML.toString()))
            .andExpect(jsonPath("$.habilitar").value(DEFAULT_HABILITAR.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCardapio() throws Exception {
        // Get the cardapio
        restCardapioMockMvc.perform(get("/api/cardapios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCardapio() throws Exception {
        // Initialize the database
        cardapioRepository.saveAndFlush(cardapio);
        int databaseSizeBeforeUpdate = cardapioRepository.findAll().size();

        // Update the cardapio
        Cardapio updatedCardapio = cardapioRepository.findOne(cardapio.getId());
        updatedCardapio
            .nome(UPDATED_NOME)
            .dia(UPDATED_DIA)
            .periodo(UPDATED_PERIODO)
            .disposicao(UPDATED_DISPOSICAO)
            .html(UPDATED_HTML)
            .habilitar(UPDATED_HABILITAR);

        restCardapioMockMvc.perform(put("/api/cardapios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCardapio)))
            .andExpect(status().isOk());

        // Validate the Cardapio in the database
        List<Cardapio> cardapioList = cardapioRepository.findAll();
        assertThat(cardapioList).hasSize(databaseSizeBeforeUpdate);
        Cardapio testCardapio = cardapioList.get(cardapioList.size() - 1);
        assertThat(testCardapio.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testCardapio.getDia()).isEqualTo(UPDATED_DIA);
        assertThat(testCardapio.getPeriodo()).isEqualTo(UPDATED_PERIODO);
        assertThat(testCardapio.getDisposicao()).isEqualTo(UPDATED_DISPOSICAO);
        assertThat(testCardapio.getHtml()).isEqualTo(UPDATED_HTML);
        assertThat(testCardapio.isHabilitar()).isEqualTo(UPDATED_HABILITAR);
    }

    @Test
    @Transactional
    public void updateNonExistingCardapio() throws Exception {
        int databaseSizeBeforeUpdate = cardapioRepository.findAll().size();

        // Create the Cardapio

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCardapioMockMvc.perform(put("/api/cardapios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cardapio)))
            .andExpect(status().isCreated());

        // Validate the Cardapio in the database
        List<Cardapio> cardapioList = cardapioRepository.findAll();
        assertThat(cardapioList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCardapio() throws Exception {
        // Initialize the database
        cardapioRepository.saveAndFlush(cardapio);
        int databaseSizeBeforeDelete = cardapioRepository.findAll().size();

        // Get the cardapio
        restCardapioMockMvc.perform(delete("/api/cardapios/{id}", cardapio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Cardapio> cardapioList = cardapioRepository.findAll();
        assertThat(cardapioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cardapio.class);
        Cardapio cardapio1 = new Cardapio();
        cardapio1.setId(1L);
        Cardapio cardapio2 = new Cardapio();
        cardapio2.setId(cardapio1.getId());
        assertThat(cardapio1).isEqualTo(cardapio2);
        cardapio2.setId(2L);
        assertThat(cardapio1).isNotEqualTo(cardapio2);
        cardapio1.setId(null);
        assertThat(cardapio1).isNotEqualTo(cardapio2);
    }
}
