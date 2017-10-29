package com.mikeias.erestaurante.web.rest;

import com.mikeias.erestaurante.repository.CargoRepository;

import com.mikeias.erestaurante.ERestauranteApp;

import com.mikeias.erestaurante.domain.Nota;
import com.mikeias.erestaurante.repository.NotaRepository;
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
 * Test class for the NotaResource REST controller.
 *
 * @see NotaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ERestauranteApp.class)
public class NotaResourceIntTest {

    private static final String DEFAULT_NF_IDENT = "AAAAAAAAAA";
    private static final String UPDATED_NF_IDENT = "BBBBBBBBBB";

    private static final String DEFAULT_QRCODE = "AAAAAAAAAA";
    private static final String UPDATED_QRCODE = "BBBBBBBBBB";

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_IDENTIFICADOR = "AAAAAAAAAA";
    private static final String UPDATED_IDENTIFICADOR = "BBBBBBBBBB";

    private static final String DEFAULT_VERSAO = "AAAAAAAAAA";
    private static final String UPDATED_VERSAO = "BBBBBBBBBB";

    private static final String DEFAULT_NF_NOTA_INFO_IDENTIFICACAO = "AAAAAAAAAA";
    private static final String UPDATED_NF_NOTA_INFO_IDENTIFICACAO = "BBBBBBBBBB";

    private static final String DEFAULT_NF_NOTA_INFO_EMITENTE = "AAAAAAAAAA";
    private static final String UPDATED_NF_NOTA_INFO_EMITENTE = "BBBBBBBBBB";

    private static final String DEFAULT_NF_NOTA_INFO_AVULSA = "AAAAAAAAAA";
    private static final String UPDATED_NF_NOTA_INFO_AVULSA = "BBBBBBBBBB";

    private static final String DEFAULT_NF_NOTA_INFO_DESTINATARIO = "AAAAAAAAAA";
    private static final String UPDATED_NF_NOTA_INFO_DESTINATARIO = "BBBBBBBBBB";

    private static final String DEFAULT_NF_NOTA_INFO_LOCAL = "AAAAAAAAAA";
    private static final String UPDATED_NF_NOTA_INFO_LOCAL = "BBBBBBBBBB";

    private static final String DEFAULT_NF_PESSOA_AUTORIZADA_DOWNLOAD_N_FE = "AAAAAAAAAA";
    private static final String UPDATED_NF_PESSOA_AUTORIZADA_DOWNLOAD_N_FE = "BBBBBBBBBB";

    private static final String DEFAULT_ITENS = "AAAAAAAAAA";
    private static final String UPDATED_ITENS = "BBBBBBBBBB";

    private static final String DEFAULT_NF_NOTA_INFO_TOTAL = "AAAAAAAAAA";
    private static final String UPDATED_NF_NOTA_INFO_TOTAL = "BBBBBBBBBB";

    private static final String DEFAULT_NF_NOTA_INFO_TRANSPORTE = "AAAAAAAAAA";
    private static final String UPDATED_NF_NOTA_INFO_TRANSPORTE = "BBBBBBBBBB";

    private static final String DEFAULT_NF_NOTA_INFO_COBRANCA = "AAAAAAAAAA";
    private static final String UPDATED_NF_NOTA_INFO_COBRANCA = "BBBBBBBBBB";

    private static final String DEFAULT_NF_NOTA_INFO_PAGAMENTO = "AAAAAAAAAA";
    private static final String UPDATED_NF_NOTA_INFO_PAGAMENTO = "BBBBBBBBBB";

    private static final String DEFAULT_NF_NOTA_INFO_INFORMACOES_ADICIONAIS = "AAAAAAAAAA";
    private static final String UPDATED_NF_NOTA_INFO_INFORMACOES_ADICIONAIS = "BBBBBBBBBB";

    private static final String DEFAULT_NF_NOTA_INFO_EXPORTACAO = "AAAAAAAAAA";
    private static final String UPDATED_NF_NOTA_INFO_EXPORTACAO = "BBBBBBBBBB";

    private static final String DEFAULT_NF_NOTA_INFO_COMPRA = "AAAAAAAAAA";
    private static final String UPDATED_NF_NOTA_INFO_COMPRA = "BBBBBBBBBB";

    private static final String DEFAULT_NF_NOTA_INFO_CANA = "AAAAAAAAAA";
    private static final String UPDATED_NF_NOTA_INFO_CANA = "BBBBBBBBBB";

    private static final String DEFAULT_XML = "AAAAAAAAAA";
    private static final String UPDATED_XML = "BBBBBBBBBB";

    private static final String DEFAULT_DANFE = "AAAAAAAAAA";
    private static final String UPDATED_DANFE = "BBBBBBBBBB";

    private static final byte[] DEFAULT_QRCODE_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_QRCODE_IMAGE = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_QRCODE_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_QRCODE_IMAGE_CONTENT_TYPE = "image/png";

    @Autowired
    private CargoRepository cargoRepository;

     @Autowired
    private NotaRepository notaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restNotaMockMvc;

    private Nota nota;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NotaResource notaResource = new NotaResource(notaRepository,cargoRepository);
        this.restNotaMockMvc = MockMvcBuilders.standaloneSetup(notaResource)
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
    public static Nota createEntity(EntityManager em) {
        Nota nota = new Nota()
            .nfIDENT(DEFAULT_NF_IDENT)
            .qrcode(DEFAULT_QRCODE)
            .codigo(DEFAULT_CODIGO)
            .identificador(DEFAULT_IDENTIFICADOR)
            .versao(DEFAULT_VERSAO)
            .nfNotaInfoIdentificacao(DEFAULT_NF_NOTA_INFO_IDENTIFICACAO)
            .nfNotaInfoEmitente(DEFAULT_NF_NOTA_INFO_EMITENTE)
            .nfNotaInfoAvulsa(DEFAULT_NF_NOTA_INFO_AVULSA)
            .nfNotaInfoDestinatario(DEFAULT_NF_NOTA_INFO_DESTINATARIO)
            .nfNotaInfoLocal(DEFAULT_NF_NOTA_INFO_LOCAL)
            .nfPessoaAutorizadaDownloadNFe(DEFAULT_NF_PESSOA_AUTORIZADA_DOWNLOAD_N_FE)
            .itens(DEFAULT_ITENS)
            .nfNotaInfoTotal(DEFAULT_NF_NOTA_INFO_TOTAL)
            .nfNotaInfoTransporte(DEFAULT_NF_NOTA_INFO_TRANSPORTE)
            .nfNotaInfoCobranca(DEFAULT_NF_NOTA_INFO_COBRANCA)
            .nfNotaInfoPagamento(DEFAULT_NF_NOTA_INFO_PAGAMENTO)
            .nfNotaInfoInformacoesAdicionais(DEFAULT_NF_NOTA_INFO_INFORMACOES_ADICIONAIS)
            .nfNotaInfoExportacao(DEFAULT_NF_NOTA_INFO_EXPORTACAO)
            .nfNotaInfoCompra(DEFAULT_NF_NOTA_INFO_COMPRA)
            .nfNotaInfoCana(DEFAULT_NF_NOTA_INFO_CANA)
            .xml(DEFAULT_XML)
            .danfe(DEFAULT_DANFE)
            .qrcodeImage(DEFAULT_QRCODE_IMAGE)
            .qrcodeImageContentType(DEFAULT_QRCODE_IMAGE_CONTENT_TYPE);
        return nota;
    }

    @Before
    public void initTest() {
        nota = createEntity(em);
    }

    @Test
    @Transactional
    public void createNota() throws Exception {
        int databaseSizeBeforeCreate = notaRepository.findAll().size();

        // Create the Nota
        restNotaMockMvc.perform(post("/api/notas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nota)))
            .andExpect(status().isCreated());

        // Validate the Nota in the database
        List<Nota> notaList = notaRepository.findAll();
        assertThat(notaList).hasSize(databaseSizeBeforeCreate + 1);
        Nota testNota = notaList.get(notaList.size() - 1);
        assertThat(testNota.getNfIDENT()).isEqualTo(DEFAULT_NF_IDENT);
        assertThat(testNota.getQrcode()).isEqualTo(DEFAULT_QRCODE);
        assertThat(testNota.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testNota.getIdentificador()).isEqualTo(DEFAULT_IDENTIFICADOR);
        assertThat(testNota.getVersao()).isEqualTo(DEFAULT_VERSAO);
        assertThat(testNota.getNfNotaInfoIdentificacao()).isEqualTo(DEFAULT_NF_NOTA_INFO_IDENTIFICACAO);
        assertThat(testNota.getNfNotaInfoEmitente()).isEqualTo(DEFAULT_NF_NOTA_INFO_EMITENTE);
        assertThat(testNota.getNfNotaInfoAvulsa()).isEqualTo(DEFAULT_NF_NOTA_INFO_AVULSA);
        assertThat(testNota.getNfNotaInfoDestinatario()).isEqualTo(DEFAULT_NF_NOTA_INFO_DESTINATARIO);
        assertThat(testNota.getNfNotaInfoLocal()).isEqualTo(DEFAULT_NF_NOTA_INFO_LOCAL);
        assertThat(testNota.getNfPessoaAutorizadaDownloadNFe()).isEqualTo(DEFAULT_NF_PESSOA_AUTORIZADA_DOWNLOAD_N_FE);
        assertThat(testNota.getItens()).isEqualTo(DEFAULT_ITENS);
        assertThat(testNota.getNfNotaInfoTotal()).isEqualTo(DEFAULT_NF_NOTA_INFO_TOTAL);
        assertThat(testNota.getNfNotaInfoTransporte()).isEqualTo(DEFAULT_NF_NOTA_INFO_TRANSPORTE);
        assertThat(testNota.getNfNotaInfoCobranca()).isEqualTo(DEFAULT_NF_NOTA_INFO_COBRANCA);
        assertThat(testNota.getNfNotaInfoPagamento()).isEqualTo(DEFAULT_NF_NOTA_INFO_PAGAMENTO);
        assertThat(testNota.getNfNotaInfoInformacoesAdicionais()).isEqualTo(DEFAULT_NF_NOTA_INFO_INFORMACOES_ADICIONAIS);
        assertThat(testNota.getNfNotaInfoExportacao()).isEqualTo(DEFAULT_NF_NOTA_INFO_EXPORTACAO);
        assertThat(testNota.getNfNotaInfoCompra()).isEqualTo(DEFAULT_NF_NOTA_INFO_COMPRA);
        assertThat(testNota.getNfNotaInfoCana()).isEqualTo(DEFAULT_NF_NOTA_INFO_CANA);
        assertThat(testNota.getXml()).isEqualTo(DEFAULT_XML);
        assertThat(testNota.getDanfe()).isEqualTo(DEFAULT_DANFE);
        assertThat(testNota.getQrcodeImage()).isEqualTo(DEFAULT_QRCODE_IMAGE);
        assertThat(testNota.getQrcodeImageContentType()).isEqualTo(DEFAULT_QRCODE_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createNotaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = notaRepository.findAll().size();

        // Create the Nota with an existing ID
        nota.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNotaMockMvc.perform(post("/api/notas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nota)))
            .andExpect(status().isBadRequest());

        // Validate the Nota in the database
        List<Nota> notaList = notaRepository.findAll();
        assertThat(notaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllNotas() throws Exception {
        // Initialize the database
        notaRepository.saveAndFlush(nota);

        // Get all the notaList
        restNotaMockMvc.perform(get("/api/notas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nota.getId().intValue())))
            .andExpect(jsonPath("$.[*].nfIDENT").value(hasItem(DEFAULT_NF_IDENT.toString())))
            .andExpect(jsonPath("$.[*].qrcode").value(hasItem(DEFAULT_QRCODE.toString())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].identificador").value(hasItem(DEFAULT_IDENTIFICADOR.toString())))
            .andExpect(jsonPath("$.[*].versao").value(hasItem(DEFAULT_VERSAO.toString())))
            .andExpect(jsonPath("$.[*].nfNotaInfoIdentificacao").value(hasItem(DEFAULT_NF_NOTA_INFO_IDENTIFICACAO.toString())))
            .andExpect(jsonPath("$.[*].nfNotaInfoEmitente").value(hasItem(DEFAULT_NF_NOTA_INFO_EMITENTE.toString())))
            .andExpect(jsonPath("$.[*].nfNotaInfoAvulsa").value(hasItem(DEFAULT_NF_NOTA_INFO_AVULSA.toString())))
            .andExpect(jsonPath("$.[*].nfNotaInfoDestinatario").value(hasItem(DEFAULT_NF_NOTA_INFO_DESTINATARIO.toString())))
            .andExpect(jsonPath("$.[*].nfNotaInfoLocal").value(hasItem(DEFAULT_NF_NOTA_INFO_LOCAL.toString())))
            .andExpect(jsonPath("$.[*].nfPessoaAutorizadaDownloadNFe").value(hasItem(DEFAULT_NF_PESSOA_AUTORIZADA_DOWNLOAD_N_FE.toString())))
            .andExpect(jsonPath("$.[*].itens").value(hasItem(DEFAULT_ITENS.toString())))
            .andExpect(jsonPath("$.[*].nfNotaInfoTotal").value(hasItem(DEFAULT_NF_NOTA_INFO_TOTAL.toString())))
            .andExpect(jsonPath("$.[*].nfNotaInfoTransporte").value(hasItem(DEFAULT_NF_NOTA_INFO_TRANSPORTE.toString())))
            .andExpect(jsonPath("$.[*].nfNotaInfoCobranca").value(hasItem(DEFAULT_NF_NOTA_INFO_COBRANCA.toString())))
            .andExpect(jsonPath("$.[*].nfNotaInfoPagamento").value(hasItem(DEFAULT_NF_NOTA_INFO_PAGAMENTO.toString())))
            .andExpect(jsonPath("$.[*].nfNotaInfoInformacoesAdicionais").value(hasItem(DEFAULT_NF_NOTA_INFO_INFORMACOES_ADICIONAIS.toString())))
            .andExpect(jsonPath("$.[*].nfNotaInfoExportacao").value(hasItem(DEFAULT_NF_NOTA_INFO_EXPORTACAO.toString())))
            .andExpect(jsonPath("$.[*].nfNotaInfoCompra").value(hasItem(DEFAULT_NF_NOTA_INFO_COMPRA.toString())))
            .andExpect(jsonPath("$.[*].nfNotaInfoCana").value(hasItem(DEFAULT_NF_NOTA_INFO_CANA.toString())))
            .andExpect(jsonPath("$.[*].xml").value(hasItem(DEFAULT_XML.toString())))
            .andExpect(jsonPath("$.[*].danfe").value(hasItem(DEFAULT_DANFE.toString())))
            .andExpect(jsonPath("$.[*].qrcodeImageContentType").value(hasItem(DEFAULT_QRCODE_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].qrcodeImage").value(hasItem(Base64Utils.encodeToString(DEFAULT_QRCODE_IMAGE))));
    }

    @Test
    @Transactional
    public void getNota() throws Exception {
        // Initialize the database
        notaRepository.saveAndFlush(nota);

        // Get the nota
        restNotaMockMvc.perform(get("/api/notas/{id}", nota.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nota.getId().intValue()))
            .andExpect(jsonPath("$.nfIDENT").value(DEFAULT_NF_IDENT.toString()))
            .andExpect(jsonPath("$.qrcode").value(DEFAULT_QRCODE.toString()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.identificador").value(DEFAULT_IDENTIFICADOR.toString()))
            .andExpect(jsonPath("$.versao").value(DEFAULT_VERSAO.toString()))
            .andExpect(jsonPath("$.nfNotaInfoIdentificacao").value(DEFAULT_NF_NOTA_INFO_IDENTIFICACAO.toString()))
            .andExpect(jsonPath("$.nfNotaInfoEmitente").value(DEFAULT_NF_NOTA_INFO_EMITENTE.toString()))
            .andExpect(jsonPath("$.nfNotaInfoAvulsa").value(DEFAULT_NF_NOTA_INFO_AVULSA.toString()))
            .andExpect(jsonPath("$.nfNotaInfoDestinatario").value(DEFAULT_NF_NOTA_INFO_DESTINATARIO.toString()))
            .andExpect(jsonPath("$.nfNotaInfoLocal").value(DEFAULT_NF_NOTA_INFO_LOCAL.toString()))
            .andExpect(jsonPath("$.nfPessoaAutorizadaDownloadNFe").value(DEFAULT_NF_PESSOA_AUTORIZADA_DOWNLOAD_N_FE.toString()))
            .andExpect(jsonPath("$.itens").value(DEFAULT_ITENS.toString()))
            .andExpect(jsonPath("$.nfNotaInfoTotal").value(DEFAULT_NF_NOTA_INFO_TOTAL.toString()))
            .andExpect(jsonPath("$.nfNotaInfoTransporte").value(DEFAULT_NF_NOTA_INFO_TRANSPORTE.toString()))
            .andExpect(jsonPath("$.nfNotaInfoCobranca").value(DEFAULT_NF_NOTA_INFO_COBRANCA.toString()))
            .andExpect(jsonPath("$.nfNotaInfoPagamento").value(DEFAULT_NF_NOTA_INFO_PAGAMENTO.toString()))
            .andExpect(jsonPath("$.nfNotaInfoInformacoesAdicionais").value(DEFAULT_NF_NOTA_INFO_INFORMACOES_ADICIONAIS.toString()))
            .andExpect(jsonPath("$.nfNotaInfoExportacao").value(DEFAULT_NF_NOTA_INFO_EXPORTACAO.toString()))
            .andExpect(jsonPath("$.nfNotaInfoCompra").value(DEFAULT_NF_NOTA_INFO_COMPRA.toString()))
            .andExpect(jsonPath("$.nfNotaInfoCana").value(DEFAULT_NF_NOTA_INFO_CANA.toString()))
            .andExpect(jsonPath("$.xml").value(DEFAULT_XML.toString()))
            .andExpect(jsonPath("$.danfe").value(DEFAULT_DANFE.toString()))
            .andExpect(jsonPath("$.qrcodeImageContentType").value(DEFAULT_QRCODE_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.qrcodeImage").value(Base64Utils.encodeToString(DEFAULT_QRCODE_IMAGE)));
    }

    @Test
    @Transactional
    public void getNonExistingNota() throws Exception {
        // Get the nota
        restNotaMockMvc.perform(get("/api/notas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNota() throws Exception {
        // Initialize the database
        notaRepository.saveAndFlush(nota);
        int databaseSizeBeforeUpdate = notaRepository.findAll().size();

        // Update the nota
        Nota updatedNota = notaRepository.findOne(nota.getId());
        updatedNota
            .nfIDENT(UPDATED_NF_IDENT)
            .qrcode(UPDATED_QRCODE)
            .codigo(UPDATED_CODIGO)
            .identificador(UPDATED_IDENTIFICADOR)
            .versao(UPDATED_VERSAO)
            .nfNotaInfoIdentificacao(UPDATED_NF_NOTA_INFO_IDENTIFICACAO)
            .nfNotaInfoEmitente(UPDATED_NF_NOTA_INFO_EMITENTE)
            .nfNotaInfoAvulsa(UPDATED_NF_NOTA_INFO_AVULSA)
            .nfNotaInfoDestinatario(UPDATED_NF_NOTA_INFO_DESTINATARIO)
            .nfNotaInfoLocal(UPDATED_NF_NOTA_INFO_LOCAL)
            .nfPessoaAutorizadaDownloadNFe(UPDATED_NF_PESSOA_AUTORIZADA_DOWNLOAD_N_FE)
            .itens(UPDATED_ITENS)
            .nfNotaInfoTotal(UPDATED_NF_NOTA_INFO_TOTAL)
            .nfNotaInfoTransporte(UPDATED_NF_NOTA_INFO_TRANSPORTE)
            .nfNotaInfoCobranca(UPDATED_NF_NOTA_INFO_COBRANCA)
            .nfNotaInfoPagamento(UPDATED_NF_NOTA_INFO_PAGAMENTO)
            .nfNotaInfoInformacoesAdicionais(UPDATED_NF_NOTA_INFO_INFORMACOES_ADICIONAIS)
            .nfNotaInfoExportacao(UPDATED_NF_NOTA_INFO_EXPORTACAO)
            .nfNotaInfoCompra(UPDATED_NF_NOTA_INFO_COMPRA)
            .nfNotaInfoCana(UPDATED_NF_NOTA_INFO_CANA)
            .xml(UPDATED_XML)
            .danfe(UPDATED_DANFE)
            .qrcodeImage(UPDATED_QRCODE_IMAGE)
            .qrcodeImageContentType(UPDATED_QRCODE_IMAGE_CONTENT_TYPE);

        restNotaMockMvc.perform(put("/api/notas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNota)))
            .andExpect(status().isOk());

        // Validate the Nota in the database
        List<Nota> notaList = notaRepository.findAll();
        assertThat(notaList).hasSize(databaseSizeBeforeUpdate);
        Nota testNota = notaList.get(notaList.size() - 1);
        assertThat(testNota.getNfIDENT()).isEqualTo(UPDATED_NF_IDENT);
        assertThat(testNota.getQrcode()).isEqualTo(UPDATED_QRCODE);
        assertThat(testNota.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testNota.getIdentificador()).isEqualTo(UPDATED_IDENTIFICADOR);
        assertThat(testNota.getVersao()).isEqualTo(UPDATED_VERSAO);
        assertThat(testNota.getNfNotaInfoIdentificacao()).isEqualTo(UPDATED_NF_NOTA_INFO_IDENTIFICACAO);
        assertThat(testNota.getNfNotaInfoEmitente()).isEqualTo(UPDATED_NF_NOTA_INFO_EMITENTE);
        assertThat(testNota.getNfNotaInfoAvulsa()).isEqualTo(UPDATED_NF_NOTA_INFO_AVULSA);
        assertThat(testNota.getNfNotaInfoDestinatario()).isEqualTo(UPDATED_NF_NOTA_INFO_DESTINATARIO);
        assertThat(testNota.getNfNotaInfoLocal()).isEqualTo(UPDATED_NF_NOTA_INFO_LOCAL);
        assertThat(testNota.getNfPessoaAutorizadaDownloadNFe()).isEqualTo(UPDATED_NF_PESSOA_AUTORIZADA_DOWNLOAD_N_FE);
        assertThat(testNota.getItens()).isEqualTo(UPDATED_ITENS);
        assertThat(testNota.getNfNotaInfoTotal()).isEqualTo(UPDATED_NF_NOTA_INFO_TOTAL);
        assertThat(testNota.getNfNotaInfoTransporte()).isEqualTo(UPDATED_NF_NOTA_INFO_TRANSPORTE);
        assertThat(testNota.getNfNotaInfoCobranca()).isEqualTo(UPDATED_NF_NOTA_INFO_COBRANCA);
        assertThat(testNota.getNfNotaInfoPagamento()).isEqualTo(UPDATED_NF_NOTA_INFO_PAGAMENTO);
        assertThat(testNota.getNfNotaInfoInformacoesAdicionais()).isEqualTo(UPDATED_NF_NOTA_INFO_INFORMACOES_ADICIONAIS);
        assertThat(testNota.getNfNotaInfoExportacao()).isEqualTo(UPDATED_NF_NOTA_INFO_EXPORTACAO);
        assertThat(testNota.getNfNotaInfoCompra()).isEqualTo(UPDATED_NF_NOTA_INFO_COMPRA);
        assertThat(testNota.getNfNotaInfoCana()).isEqualTo(UPDATED_NF_NOTA_INFO_CANA);
        assertThat(testNota.getXml()).isEqualTo(UPDATED_XML);
        assertThat(testNota.getDanfe()).isEqualTo(UPDATED_DANFE);
        assertThat(testNota.getQrcodeImage()).isEqualTo(UPDATED_QRCODE_IMAGE);
        assertThat(testNota.getQrcodeImageContentType()).isEqualTo(UPDATED_QRCODE_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingNota() throws Exception {
        int databaseSizeBeforeUpdate = notaRepository.findAll().size();

        // Create the Nota

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restNotaMockMvc.perform(put("/api/notas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nota)))
            .andExpect(status().isCreated());

        // Validate the Nota in the database
        List<Nota> notaList = notaRepository.findAll();
        assertThat(notaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteNota() throws Exception {
        // Initialize the database
        notaRepository.saveAndFlush(nota);
        int databaseSizeBeforeDelete = notaRepository.findAll().size();

        // Get the nota
        restNotaMockMvc.perform(delete("/api/notas/{id}", nota.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Nota> notaList = notaRepository.findAll();
        assertThat(notaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Nota.class);
        Nota nota1 = new Nota();
        nota1.setId(1L);
        Nota nota2 = new Nota();
        nota2.setId(nota1.getId());
        assertThat(nota1).isEqualTo(nota2);
        nota2.setId(2L);
        assertThat(nota1).isNotEqualTo(nota2);
        nota1.setId(null);
        assertThat(nota1).isNotEqualTo(nota2);
    }
}
