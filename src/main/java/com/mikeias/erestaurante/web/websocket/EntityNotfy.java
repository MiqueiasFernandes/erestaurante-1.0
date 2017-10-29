package com.mikeias.erestaurante.web.websocket;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;


@Controller
public class EntityNotfy implements ApplicationListener<SessionDisconnectEvent> {


    private static final Logger log = LoggerFactory.getLogger(EntityNotfy.class);

    private final SimpMessageSendingOperations messagingTemplate;

    public EntityNotfy(SimpMessageSendingOperations messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }



    @SubscribeMapping("/topic/entity")
    @SendTo("/topic/events")
    public String sendNota(
        @Payload String data
    ) {
        log.debug("Enviado notificação de alteração em {}", data);
        return data;
    }

    @Override
    public void onApplicationEvent(SessionDisconnectEvent event) {
        messagingTemplate.convertAndSend("/topic/events", "{\"status\":\"desconectado\"}");
    }

}
