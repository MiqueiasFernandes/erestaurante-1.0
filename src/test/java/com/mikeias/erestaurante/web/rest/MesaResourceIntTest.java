package com.mikeias.erestaurante.web.rest;

import com.mikeias.erestaurante.repository.CargoRepository;

import com.mikeias.erestaurante.ERestauranteApp;

import com.mikeias.erestaurante.domain.Mesa;
import com.mikeias.erestaurante.repository.MesaRepository;
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
 * Test class for the MesaResource REST controller.
 *
 * @see MesaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ERestauranteApp.class)
public class MesaResourceIntTest {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final Integer DEFAULT_LOCAL = 1;
    private static final Integer UPDATED_LOCAL = 2;

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final byte[] DEFAULT_QRCODE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_QRCODE = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_QRCODE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_QRCODE_CONTENT_TYPE = "image/png";

    @Autowired
    private CargoRepository cargoRepository;

     @Autowired
    private MesaRepository mesaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMesaMockMvc;

    private Mesa mesa;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MesaResource mesaResource = new MesaResource(mesaRepository,cargoRepository);
        this.restMesaMockMvc = MockMvcBuilders.standaloneSetup(mesaResource)
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
    public static Mesa createEntity(EntityManager em) {
        Mesa mesa = new Mesa()
            .codigo(DEFAULT_CODIGO)
            .local(DEFAULT_LOCAL)
            .descricao(DEFAULT_DESCRICAO)
            .qrcode(DEFAULT_QRCODE)
            .qrcodeContentType(DEFAULT_QRCODE_CONTENT_TYPE);
        return mesa;
    }

    @Before
    public void initTest() {
        mesa = createEntity(em);
    }

    @Test
    @Transactional
    public void createMesa() throws Exception {
        int databaseSizeBeforeCreate = mesaRepository.findAll().size();

        // Create the Mesa
        restMesaMockMvc.perform(post("/api/mesas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mesa)))
            .andExpect(status().isCreated());

        // Validate the Mesa in the database
        List<Mesa> mesaList = mesaRepository.findAll();
        assertThat(mesaList).hasSize(databaseSizeBeforeCreate + 1);
        Mesa testMesa = mesaList.get(mesaList.size() - 1);
        assertThat(testMesa.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testMesa.getLocal()).isEqualTo(DEFAULT_LOCAL);
        assertThat(testMesa.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testMesa.getQrcode()).isEqualTo(DEFAULT_QRCODE);
        assertThat(testMesa.getQrcodeContentType()).isEqualTo(DEFAULT_QRCODE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createMesaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mesaRepository.findAll().size();

        // Create the Mesa with an existing ID
        mesa.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMesaMockMvc.perform(post("/api/mesas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mesa)))
            .andExpect(status().isBadRequest());

        // Validate the Mesa in the database
        List<Mesa> mesaList = mesaRepository.findAll();
        assertThat(mesaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMesas() throws Exception {
        // Initialize the database
        mesaRepository.saveAndFlush(mesa);

        // Get all the mesaList
        restMesaMockMvc.perform(get("/api/mesas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mesa.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].local").value(hasItem(DEFAULT_LOCAL)))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())))
            .andExpect(jsonPath("$.[*].qrcodeContentType").value(hasItem(DEFAULT_QRCODE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].qrcode").value(hasItem(Base64Utils.encodeToString(DEFAULT_QRCODE))));
    }

    @Test
    @Transactional
    public void getMesa() throws Exception {
        // Initialize the database
        mesaRepository.saveAndFlush(mesa);

        // Get the mesa
        restMesaMockMvc.perform(get("/api/mesas/{id}", mesa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mesa.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.local").value(DEFAULT_LOCAL))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()))
            .andExpect(jsonPath("$.qrcodeContentType").value(DEFAULT_QRCODE_CONTENT_TYPE))
            .andExpect(jsonPath("$.qrcode").value(Base64Utils.encodeToString(DEFAULT_QRCODE)));
    }

    @Test
    @Transactional
    public void getNonExistingMesa() throws Exception {
        // Get the mesa
        restMesaMockMvc.perform(get("/api/mesas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMesa() throws Exception {
        // Initialize the database
        mesaRepository.saveAndFlush(mesa);
        int databaseSizeBeforeUpdate = mesaRepository.findAll().size();

        // Update the mesa
        Mesa updatedMesa = mesaRepository.findOne(mesa.getId());
        updatedMesa
            .codigo(UPDATED_CODIGO)
            .local(UPDATED_LOCAL)
            .descricao(UPDATED_DESCRICAO)
            .qrcode(UPDATED_QRCODE)
            .qrcodeContentType(UPDATED_QRCODE_CONTENT_TYPE);

        restMesaMockMvc.perform(put("/api/mesas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMesa)))
            .andExpect(status().isOk());

        // Validate the Mesa in the database
        List<Mesa> mesaList = mesaRepository.findAll();
        assertThat(mesaList).hasSize(databaseSizeBeforeUpdate);
        Mesa testMesa = mesaList.get(mesaList.size() - 1);
        assertThat(testMesa.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testMesa.getLocal()).isEqualTo(UPDATED_LOCAL);
        assertThat(testMesa.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testMesa.getQrcode()).isEqualTo(UPDATED_QRCODE);
        assertThat(testMesa.getQrcodeContentType()).isEqualTo(UPDATED_QRCODE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingMesa() throws Exception {
        int databaseSizeBeforeUpdate = mesaRepository.findAll().size();

        // Create the Mesa

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMesaMockMvc.perform(put("/api/mesas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mesa)))
            .andExpect(status().isCreated());

        // Validate the Mesa in the database
        List<Mesa> mesaList = mesaRepository.findAll();
        assertThat(mesaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMesa() throws Exception {
        // Initialize the database
        mesaRepository.saveAndFlush(mesa);
        int databaseSizeBeforeDelete = mesaRepository.findAll().size();

        // Get the mesa
        restMesaMockMvc.perform(delete("/api/mesas/{id}", mesa.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Mesa> mesaList = mesaRepository.findAll();
        assertThat(mesaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mesa.class);
        Mesa mesa1 = new Mesa();
        mesa1.setId(1L);
        Mesa mesa2 = new Mesa();
        mesa2.setId(mesa1.getId());
        assertThat(mesa1).isEqualTo(mesa2);
        mesa2.setId(2L);
        assertThat(mesa1).isNotEqualTo(mesa2);
        mesa1.setId(null);
        assertThat(mesa1).isNotEqualTo(mesa2);
    }
}
