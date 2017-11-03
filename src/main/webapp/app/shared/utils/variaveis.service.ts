import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Mesa} from "../../entities/mesa/mesa.model";
import {Comanda} from "../../entities/comanda/comanda.model";

import { LocalStorageService } from 'ng2-webstorage';
import {isNullOrUndefined} from "util";
import {MesaService} from "../../entities/mesa/mesa.service";
import {ComandaService} from "../../entities/comanda/comanda.service";
import {Observable} from "rxjs/Observable";
import {Cardapio, Dia} from "../../entities/cardapio/cardapio.model";

@Injectable()
export class VariaveisService {

    expires :number = 1000 * 3600 * 5;
    cardapio :Dia = Cardapio.getDia(new Date().getDay());

    private observeMesaComanda = new Subject<{mesa: Mesa, comanda: Comanda}>();
    public mesaComandaObserver$ = this.observeMesaComanda.asObservable();
    private observeCardapio = new Subject<Dia>();
    public cardapioObserver$ = this.observeCardapio.asObservable();

    constructor(
        private $localStorage: LocalStorageService,
        private mesaService :MesaService,
        private comandaService :ComandaService
    ) {
    }

    public setCardapioDay(dia: Dia) {
        this.cardapio = dia;
        this.observeCardapio.next(dia);
    }

    public getCardapioDay() {
        return this.cardapio;
    }

    public getMesa() :Observable<Mesa>{
        const id = this.getMesaIdFromstorage();
        if (isNullOrUndefined(id)) {
            return Observable.of(undefined);
        }
        return this.mesaService.find(id);
    }

    public getComanda() :Observable<Comanda> {
        const id = this.getMesaIdFromstorage();
        if (isNullOrUndefined(id)) {
            return Observable.of(undefined);
        }
        return this.comandaService.findByMesa(id);
    }

    public setMesa(mesa :Mesa) {
        this.storeData('mesa',mesa.id + '');
        this.update();
    }

    public update() {
        this.getMesa().subscribe( (mesa) => {
            this.getComanda().subscribe( (comanda) => {
                this.observeMesaComanda.next({
                    mesa:mesa,
                    comanda:comanda
                });
            }, (e) => {
                this.observeMesaComanda.next({
                    mesa:mesa,
                    comanda:undefined
                });
            });
        });
    }

    public hasMesa() :boolean{
        return !isNullOrUndefined(this.getMesaIdFromstorage());
    }

    private getMesaIdFromstorage() :number {

        let id: number = undefined;
        const mesaD =  this.$localStorage.retrieve('mesa');

        if (isNullOrUndefined(mesaD)) {
            return id;
        }

        try {

            const time: number = mesaD.time;
            id = mesaD.data;

            if (new Date().getTime() > (time + this.expires)) {
                this.limparOnStorage('mesa');
                return undefined;
            }

        } catch (e) {
            console.log('Erro variaveisService:59 ' + e);
            return undefined;
        }

        return id;
    }


    private storeData(id :string, data :string) {
        this.limparOnStorage(id);
        this.$localStorage.store(id, {time : new Date().getTime(), data : data});
    }

    private limparOnStorage(id :string) {
        this.$localStorage.clear(id);
    }

}
