/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ERestauranteTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CardapioDetailComponent } from '../../../../../../main/webapp/app/entities/cardapio/cardapio-detail.component';
import { CardapioService } from '../../../../../../main/webapp/app/entities/cardapio/cardapio.service';
import { Cardapio } from '../../../../../../main/webapp/app/entities/cardapio/cardapio.model';

describe('Component Tests', () => {

    describe('Cardapio Management Detail Component', () => {
        let comp: CardapioDetailComponent;
        let fixture: ComponentFixture<CardapioDetailComponent>;
        let service: CardapioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ERestauranteTestModule],
                declarations: [CardapioDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CardapioService,
                    JhiEventManager
                ]
            }).overrideTemplate(CardapioDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CardapioDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CardapioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Cardapio(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.cardapio).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
