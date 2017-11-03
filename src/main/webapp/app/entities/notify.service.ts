import { Injectable } from '@angular/core';

import * as SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';
import {WindowRef} from "../shared/tracker/window.service";
import {AuthServerProvider} from "../shared/auth/auth-jwt.service";
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";
import {isNullOrUndefined} from "util";

@Injectable()
export class NotifyService {

    stompClient = null;
    connection: Promise<any>;
    connectedPromise: any;
    subscriber = null;
    listenerObserver: Observer<any>;
    listener: Observable<any>;

  constructor(
      private $window: WindowRef,
      private authServerProvider: AuthServerProvider,
  ) {
      this.connection = this.createConnection();
      this.listener = this.createListener();
  }


  ////use para abrir a conexão
    connect() {
        if (this.connectedPromise === null) {
            this.connection = this.createConnection();
        }
        // building absolute path so that websocket doesn't fail when deploying with a context path
        const loc = this.$window.nativeWindow.location;
        let url;
        url = '//' + loc.host + loc.pathname + 'websocket/events';
        const authToken = this.authServerProvider.getToken().access_token;
        if (authToken) {
            url += '?access_token=' + authToken;
        }
        const socket = new SockJS(url);
        this.stompClient = Stomp.over(socket);
        const headers = {};
        this.stompClient.connect(headers, () => {
            if (!isNullOrUndefined(this.connectedPromise)) {
                this.connectedPromise('success');
            }
            this.connectedPromise = null;
        });
    }

    private createConnection(): Promise<any> {
        return new Promise((resolve, reject) => this.connectedPromise = resolve);
    }

    private createListener(): Observable<any> {
        return new Observable((observer) => {
            this.listenerObserver = observer;
        });
    }

    disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
            this.stompClient = null;
        }
    }

    subscribe() {
        this.connection.then(() => {
            this.subscriber = this.stompClient.subscribe('/topic/events', (data) => {
                this.listenerObserver.next(JSON.parse(data.body));
            });
        });
    }


    sendMessage(entidade: string, message: string, id: number) {
        if (this.stompClient !== null && this.stompClient.connected) {
            this.stompClient.send(
                '/topic/entity', // destination
                // 'oi venda',
                JSON.stringify({
                    'entidade': entidade,
                    'id': id,
                    'message': message
                }), // body
                {} // header
            );
        }
    }

    ///use para receber as mensagens
    receive() {
        return this.listener;
    }
}
