package com.mikeias.erestaurante.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache("users", jcacheConfiguration);
            cm.createCache(com.mikeias.erestaurante.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.mikeias.erestaurante.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.mikeias.erestaurante.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.mikeias.erestaurante.domain.Produto.class.getName(), jcacheConfiguration);
            cm.createCache(com.mikeias.erestaurante.domain.Endereco.class.getName(), jcacheConfiguration);
            cm.createCache(com.mikeias.erestaurante.domain.Cliente.class.getName(), jcacheConfiguration);
            cm.createCache(com.mikeias.erestaurante.domain.Mesa.class.getName(), jcacheConfiguration);
            cm.createCache(com.mikeias.erestaurante.domain.Venda.class.getName(), jcacheConfiguration);
            cm.createCache(com.mikeias.erestaurante.domain.Comanda.class.getName(), jcacheConfiguration);
            cm.createCache(com.mikeias.erestaurante.domain.Comanda.class.getName() + ".lancamentos", jcacheConfiguration);
            cm.createCache(com.mikeias.erestaurante.domain.Comanda.class.getName() + ".mesas", jcacheConfiguration);
            cm.createCache(com.mikeias.erestaurante.domain.Comanda.class.getName() + ".colaboradores", jcacheConfiguration);
            cm.createCache(com.mikeias.erestaurante.domain.Colaborador.class.getName(), jcacheConfiguration);
            cm.createCache(com.mikeias.erestaurante.domain.Colaborador.class.getName() + ".lancamentos", jcacheConfiguration);
            cm.createCache(com.mikeias.erestaurante.domain.Colaborador.class.getName() + ".cargos", jcacheConfiguration);
            cm.createCache(com.mikeias.erestaurante.domain.Cargo.class.getName(), jcacheConfiguration);
            cm.createCache(com.mikeias.erestaurante.domain.Cardapio.class.getName(), jcacheConfiguration);
            cm.createCache(com.mikeias.erestaurante.domain.Cardapio.class.getName() + ".produtos", jcacheConfiguration);
            cm.createCache(com.mikeias.erestaurante.domain.Imposto.class.getName(), jcacheConfiguration);
            cm.createCache(com.mikeias.erestaurante.domain.Lancamento.class.getName(), jcacheConfiguration);
            cm.createCache(com.mikeias.erestaurante.domain.Nota.class.getName(), jcacheConfiguration);
            cm.createCache(com.mikeias.erestaurante.domain.Restaurante.class.getName(), jcacheConfiguration);
            cm.createCache(com.mikeias.erestaurante.domain.Restaurante.class.getName() + ".proprietarios", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
