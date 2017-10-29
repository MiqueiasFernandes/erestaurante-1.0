package com.mikeias.erestaurante.web.rest;

import com.mikeias.erestaurante.repository.CargoRepository;

import com.mikeias.erestaurante.ERestauranteApp;

import com.mikeias.erestaurante.domain.Imposto;
import com.mikeias.erestaurante.repository.ImpostoRepository;
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

import javax.persistence.EntityManager;
import java.util.List;

import static com.mikeias.erestaurante.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ImpostoResource REST controller.
 *
 * @see ImpostoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ERestauranteApp.class)
public class ImpostoResourceIntTest {

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final Double DEFAULT_IV_TOT_TRIB = 1D;
    private static final Double UPDATED_IV_TOT_TRIB = 2D;

    private static final Double DEFAULT_I_ICMS = 1D;
    private static final Double UPDATED_I_ICMS = 2D;

    private static final Double DEFAULT_I_IPI = 1D;
    private static final Double UPDATED_I_IPI = 2D;

    private static final Double DEFAULT_I_II = 1D;
    private static final Double UPDATED_I_II = 2D;

    private static final Double DEFAULT_I_ISSQN = 1D;
    private static final Double UPDATED_I_ISSQN = 2D;

    private static final Double DEFAULT_I_PIS = 1D;
    private static final Double UPDATED_I_PIS = 2D;

    private static final Double DEFAULT_I_PISST = 1D;
    private static final Double UPDATED_I_PISST = 2D;

    private static final Double DEFAULT_I_COFINS = 1D;
    private static final Double UPDATED_I_COFINS = 2D;

    private static final Double DEFAULT_I_COFINSST = 1D;
    private static final Double UPDATED_I_COFINSST = 2D;

    private static final Double DEFAULT_I_ICMSUF_DEST = 1D;
    private static final Double UPDATED_I_ICMSUF_DEST = 2D;

    private static final String DEFAULT_IOUTROS = "AAAAAAAAAA";
    private static final String UPDATED_IOUTROS = "BBBBBBBBBB";

    private static final String DEFAULT_CONFIGURAR = "AAAAAAAAAA";
    private static final String UPDATED_CONFIGURAR = "BBBBBBBBBB";

    @Autowired
    private CargoRepository cargoRepository;

     @Autowired
    private ImpostoRepository impostoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restImpostoMockMvc;

    private Imposto imposto;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ImpostoResource impostoResource = new ImpostoResource(impostoRepository,cargoRepository);
        this.restImpostoMockMvc = MockMvcBuilders.standaloneSetup(impostoResource)
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
    public static Imposto createEntity(EntityManager em) {
        Imposto imposto = new Imposto()
            .descricao(DEFAULT_DESCRICAO)
            .ivTotTrib(DEFAULT_IV_TOT_TRIB)
            .iICMS(DEFAULT_I_ICMS)
            .iIPI(DEFAULT_I_IPI)
            .iII(DEFAULT_I_II)
            .iISSQN(DEFAULT_I_ISSQN)
            .iPIS(DEFAULT_I_PIS)
            .iPISST(DEFAULT_I_PISST)
            .iCOFINS(DEFAULT_I_COFINS)
            .iCOFINSST(DEFAULT_I_COFINSST)
            .iICMSUFDest(DEFAULT_I_ICMSUF_DEST)
            .ioutros(DEFAULT_IOUTROS)
            .configurar(DEFAULT_CONFIGURAR);
        return imposto;
    }

    @Before
    public void initTest() {
        imposto = createEntity(em);
    }

    @Test
    @Transactional
    public void createImposto() throws Exception {
        int databaseSizeBeforeCreate = impostoRepository.findAll().size();

        // Create the Imposto
        restImpostoMockMvc.perform(post("/api/impostos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imposto)))
            .andExpect(status().isCreated());

        // Validate the Imposto in the database
        List<Imposto> impostoList = impostoRepository.findAll();
        assertThat(impostoList).hasSize(databaseSizeBeforeCreate + 1);
        Imposto testImposto = impostoList.get(impostoList.size() - 1);
        assertThat(testImposto.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testImposto.getIvTotTrib()).isEqualTo(DEFAULT_IV_TOT_TRIB);
        assertThat(testImposto.getiICMS()).isEqualTo(DEFAULT_I_ICMS);
        assertThat(testImposto.getiIPI()).isEqualTo(DEFAULT_I_IPI);
        assertThat(testImposto.getiII()).isEqualTo(DEFAULT_I_II);
        assertThat(testImposto.getiISSQN()).isEqualTo(DEFAULT_I_ISSQN);
        assertThat(testImposto.getiPIS()).isEqualTo(DEFAULT_I_PIS);
        assertThat(testImposto.getiPISST()).isEqualTo(DEFAULT_I_PISST);
        assertThat(testImposto.getiCOFINS()).isEqualTo(DEFAULT_I_COFINS);
        assertThat(testImposto.getiCOFINSST()).isEqualTo(DEFAULT_I_COFINSST);
        assertThat(testImposto.getiICMSUFDest()).isEqualTo(DEFAULT_I_ICMSUF_DEST);
        assertThat(testImposto.getIoutros()).isEqualTo(DEFAULT_IOUTROS);
        assertThat(testImposto.getConfigurar()).isEqualTo(DEFAULT_CONFIGURAR);
    }

    @Test
    @Transactional
    public void createImpostoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = impostoRepository.findAll().size();

        // Create the Imposto with an existing ID
        imposto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restImpostoMockMvc.perform(post("/api/impostos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imposto)))
            .andExpect(status().isBadRequest());

        // Validate the Imposto in the database
        List<Imposto> impostoList = impostoRepository.findAll();
        assertThat(impostoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllImpostos() throws Exception {
        // Initialize the database
        impostoRepository.saveAndFlush(imposto);

        // Get all the impostoList
        restImpostoMockMvc.perform(get("/api/impostos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(imposto.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())))
            .andExpect(jsonPath("$.[*].ivTotTrib").value(hasItem(DEFAULT_IV_TOT_TRIB.doubleValue())))
            .andExpect(jsonPath("$.[*].iICMS").value(hasItem(DEFAULT_I_ICMS.doubleValue())))
            .andExpect(jsonPath("$.[*].iIPI").value(hasItem(DEFAULT_I_IPI.doubleValue())))
            .andExpect(jsonPath("$.[*].iII").value(hasItem(DEFAULT_I_II.doubleValue())))
            .andExpect(jsonPath("$.[*].iISSQN").value(hasItem(DEFAULT_I_ISSQN.doubleValue())))
            .andExpect(jsonPath("$.[*].iPIS").value(hasItem(DEFAULT_I_PIS.doubleValue())))
            .andExpect(jsonPath("$.[*].iPISST").value(hasItem(DEFAULT_I_PISST.doubleValue())))
            .andExpect(jsonPath("$.[*].iCOFINS").value(hasItem(DEFAULT_I_COFINS.doubleValue())))
            .andExpect(jsonPath("$.[*].iCOFINSST").value(hasItem(DEFAULT_I_COFINSST.doubleValue())))
            .andExpect(jsonPath("$.[*].iICMSUFDest").value(hasItem(DEFAULT_I_ICMSUF_DEST.doubleValue())))
            .andExpect(jsonPath("$.[*].ioutros").value(hasItem(DEFAULT_IOUTROS.toString())))
            .andExpect(jsonPath("$.[*].configurar").value(hasItem(DEFAULT_CONFIGURAR.toString())));
    }

    @Test
    @Transactional
    public void getImposto() throws Exception {
        // Initialize the database
        impostoRepository.saveAndFlush(imposto);

        // Get the imposto
        restImpostoMockMvc.perform(get("/api/impostos/{id}", imposto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(imposto.getId().intValue()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()))
            .andExpect(jsonPath("$.ivTotTrib").value(DEFAULT_IV_TOT_TRIB.doubleValue()))
            .andExpect(jsonPath("$.iICMS").value(DEFAULT_I_ICMS.doubleValue()))
            .andExpect(jsonPath("$.iIPI").value(DEFAULT_I_IPI.doubleValue()))
            .andExpect(jsonPath("$.iII").value(DEFAULT_I_II.doubleValue()))
            .andExpect(jsonPath("$.iISSQN").value(DEFAULT_I_ISSQN.doubleValue()))
            .andExpect(jsonPath("$.iPIS").value(DEFAULT_I_PIS.doubleValue()))
            .andExpect(jsonPath("$.iPISST").value(DEFAULT_I_PISST.doubleValue()))
            .andExpect(jsonPath("$.iCOFINS").value(DEFAULT_I_COFINS.doubleValue()))
            .andExpect(jsonPath("$.iCOFINSST").value(DEFAULT_I_COFINSST.doubleValue()))
            .andExpect(jsonPath("$.iICMSUFDest").value(DEFAULT_I_ICMSUF_DEST.doubleValue()))
            .andExpect(jsonPath("$.ioutros").value(DEFAULT_IOUTROS.toString()))
            .andExpect(jsonPath("$.configurar").value(DEFAULT_CONFIGURAR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingImposto() throws Exception {
        // Get the imposto
        restImpostoMockMvc.perform(get("/api/impostos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateImposto() throws Exception {
        // Initialize the database
        impostoRepository.saveAndFlush(imposto);
        int databaseSizeBeforeUpdate = impostoRepository.findAll().size();

        // Update the imposto
        Imposto updatedImposto = impostoRepository.findOne(imposto.getId());
        updatedImposto
            .descricao(UPDATED_DESCRICAO)
            .ivTotTrib(UPDATED_IV_TOT_TRIB)
            .iICMS(UPDATED_I_ICMS)
            .iIPI(UPDATED_I_IPI)
            .iII(UPDATED_I_II)
            .iISSQN(UPDATED_I_ISSQN)
            .iPIS(UPDATED_I_PIS)
            .iPISST(UPDATED_I_PISST)
            .iCOFINS(UPDATED_I_COFINS)
            .iCOFINSST(UPDATED_I_COFINSST)
            .iICMSUFDest(UPDATED_I_ICMSUF_DEST)
            .ioutros(UPDATED_IOUTROS)
            .configurar(UPDATED_CONFIGURAR);

        restImpostoMockMvc.perform(put("/api/impostos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedImposto)))
            .andExpect(status().isOk());

        // Validate the Imposto in the database
        List<Imposto> impostoList = impostoRepository.findAll();
        assertThat(impostoList).hasSize(databaseSizeBeforeUpdate);
        Imposto testImposto = impostoList.get(impostoList.size() - 1);
        assertThat(testImposto.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testImposto.getIvTotTrib()).isEqualTo(UPDATED_IV_TOT_TRIB);
        assertThat(testImposto.getiICMS()).isEqualTo(UPDATED_I_ICMS);
        assertThat(testImposto.getiIPI()).isEqualTo(UPDATED_I_IPI);
        assertThat(testImposto.getiII()).isEqualTo(UPDATED_I_II);
        assertThat(testImposto.getiISSQN()).isEqualTo(UPDATED_I_ISSQN);
        assertThat(testImposto.getiPIS()).isEqualTo(UPDATED_I_PIS);
        assertThat(testImposto.getiPISST()).isEqualTo(UPDATED_I_PISST);
        assertThat(testImposto.getiCOFINS()).isEqualTo(UPDATED_I_COFINS);
        assertThat(testImposto.getiCOFINSST()).isEqualTo(UPDATED_I_COFINSST);
        assertThat(testImposto.getiICMSUFDest()).isEqualTo(UPDATED_I_ICMSUF_DEST);
        assertThat(testImposto.getIoutros()).isEqualTo(UPDATED_IOUTROS);
        assertThat(testImposto.getConfigurar()).isEqualTo(UPDATED_CONFIGURAR);
    }

    @Test
    @Transactional
    public void updateNonExistingImposto() throws Exception {
        int databaseSizeBeforeUpdate = impostoRepository.findAll().size();

        // Create the Imposto

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restImpostoMockMvc.perform(put("/api/impostos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imposto)))
            .andExpect(status().isCreated());

        // Validate the Imposto in the database
        List<Imposto> impostoList = impostoRepository.findAll();
        assertThat(impostoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteImposto() throws Exception {
        // Initialize the database
        impostoRepository.saveAndFlush(imposto);
        int databaseSizeBeforeDelete = impostoRepository.findAll().size();

        // Get the imposto
        restImpostoMockMvc.perform(delete("/api/impostos/{id}", imposto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Imposto> impostoList = impostoRepository.findAll();
        assertThat(impostoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Imposto.class);
        Imposto imposto1 = new Imposto();
        imposto1.setId(1L);
        Imposto imposto2 = new Imposto();
        imposto2.setId(imposto1.getId());
        assertThat(imposto1).isEqualTo(imposto2);
        imposto2.setId(2L);
        assertThat(imposto1).isNotEqualTo(imposto2);
        imposto1.setId(null);
        assertThat(imposto1).isNotEqualTo(imposto2);
    }
}
