import {Component, Injectable, OnInit, OnDestroy, ViewChild, ViewContainerRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Lancamento } from './lancamento.model';
import { LancamentoService } from './lancamento.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

import {NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
    'ptBR': {
        weekdays: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    }
    // other languages you would support
};

// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class I18n {
    language = 'ptBR';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

    constructor(private _i18n: I18n) {
        super();
    }

    getWeekdayShortName(weekday: number): string {
        return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
    }
    getMonthShortName(month: number): string {
        return I18N_VALUES[this._i18n.language].months[month - 1];
    }
    getMonthFullName(month: number): string {
        return this.getMonthShortName(month);
    }


}


@Injectable()
export class CustomFormater extends NgbDateParserFormatter{

    parse(value: string): NgbDateStruct {
        const ns = value.split('/');
        return {year: parseInt(ns[2]), month:  parseInt(ns[1]), day:  parseInt(ns[0])};
    }

    format(date: NgbDateStruct): string {
        return date.day + '/' + date.month + '/' + date.year;
    }

}


@Component({
    selector: 'jhi-lancamento',
    templateUrl: './lancamento.component.html',
    styleUrls: ['./lancamento.component.scss'],
    providers: [
        I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n},
        {provide: NgbDateParserFormatter, useClass: CustomFormater}
    ] // define custom NgbDatepickerI18n provider
})
export class LancamentoComponent implements OnInit, OnDestroy {

    @ViewChild('tableH', {read: ViewContainerRef}) tableHeader;
    lancamentos: Lancamento[];
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    predicate: any;
    queryCount: any;
    reverse: any;
    totalItems: number;


    modoTabela = false;
    total = 0;
    hoje = new Date();
    date1 = new Date(this.hoje.toISOString().replace(/\d+T.*/, '')  + '1');
    date2 = new Date(this.hoje.toISOString().replace(/\d+T.*/, '')  + this.getDay(this.hoje.getMonth()));
    opt = {
        minYear: 2017,
        maxYear: 2030,
        displayFormat: 'D [de] MMM [de] YYYY',
        barTitleFormat: 'MMMM YYYY',
        firstCalendarDay: 0
    };


    constructor(
        private lancamentoService: LancamentoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private parseLinks: JhiParseLinks,
        private principal: Principal
    ) {
        this.lancamentos = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
    }

    loadAll(filter) {
        this.lancamentoService.query({
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: ResponseWrapper) => this.onSuccess(res.json, res.headers, filter),
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }


    getDay(mes) {
        switch (mes) {
            case 1 :
                return '28';
            case 3 :
                return '30';
            case 5 :
                return '30';
            case 8 :
                return '30';
            case 10 :
                return '30';
        }
        return '31';
    }

    geraGrafico(modo) {
        this.lineChartData = undefined;
        let arr :Array<any> = [
            {data: [], label: 'Saída'},
            {data: [], label: 'Entrada'},
            {data: [], label: 'Saldo'}
        ];

        for(let i=0; i < 31; i++) {
            if (modo) {
                if (i < 12) {
                    arr[0].data[i] =
                        arr[1].data[i] =
                            arr[2].data[i] = 0;
                }
            } else {
                arr[0].data[i] =
                    arr[1].data[i] =
                        arr[2].data[i] = 0;
            }
        }
        this.lancamentos.forEach(l => {
            const data = l.vencimento as Date;
            if (modo || (data.getMonth() === this.mes)) {
                if (modo) {
                    if (l.isentrada) {
                        arr[1].data[data.getMonth()] += l.valor;
                        arr[2].data[data.getMonth()] += l.valor;
                    } else {
                        arr[0].data[data.getMonth()] += l.valor;
                        arr[2].data[data.getMonth()] -= l.valor;
                    }
                } else {
                    if (l.isentrada) {
                        arr[1].data[data.getDate()] += l.valor;
                        arr[2].data[data.getDate()] += l.valor;
                    } else {
                        arr[0].data[data.getDate()] += l.valor;
                        arr[2].data[data.getDate()] -= l.valor;
                    }
                }
            }
        });
        this.lineChartData = arr;
    }

    reset() {
        this.page = 0;
        this.lancamentos = [];
        this.loadAll(true);
    }

    loadPage(page) {
        this.page = page;
        this.loadAll(true);
    }
    ngOnInit() {
        this.tableHeader.clear();
        this.loadAll(false);
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInLancamentos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Lancamento) {
        return item.id;
    }
    registerChangeInLancamentos() {
        this.eventSubscriber = this.eventManager.subscribe('lancamentoListModification', (response) => this.reset());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers, filter) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        for (let i = 0; i < data.length; i++) {
            this.lancamentos.push(data[i]);
        }

        if (filter) {
            const dt1 = this.date1 < this.date2 ? this.date1 : this.date2;
            const dt2 = this.date1 > this.date2 ? this.date1 : this.date2;
            this.lancamentos = this.lancamentos.filter(l => l.vencimento >= dt1 && l.vencimento <= dt2);
        }
        this.lancamentos.forEach(l => l.isentrada ? this.total += l.valor : this.total -= l.valor);
        this.geraGrafico(this.anual);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    setModoTabela() {
        this.modoTabela = !this.modoTabela;
        if (!this.modoTabela) {
            this.tableHeader.clear();
            this.geraGrafico(this.anual);
        }
    }

    anual = false;
    mes = (new Date().getMonth());

    setAnual() {
        this.geraGrafico(!this.anual);
        this.anual = !this.anual;
    }

    public chartAnual = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'];

    public chartMensal = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '31',
    ];

    setMes(mes) {
        this.mes = this.chartAnual.indexOf(mes);
        this.geraGrafico(this.anual);
    }

    public lineChartData:Array<any> = [];

    public lineChartOptions:any = {
        responsive: true,
        maintainAspectRatio: false
    };

    public lineChartColors:Array<any> = [
        { // green
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // red
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // blue
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';

// events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }





}
