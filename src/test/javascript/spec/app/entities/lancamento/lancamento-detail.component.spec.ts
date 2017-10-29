/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ERestauranteTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { LancamentoDetailComponent } from '../../../../../../main/webapp/app/entities/lancamento/lancamento-detail.component';
import { LancamentoService } from '../../../../../../main/webapp/app/entities/lancamento/lancamento.service';
import { Lancamento } from '../../../../../../main/webapp/app/entities/lancamento/lancamento.model';

describe('Component Tests', () => {

    describe('Lancamento Management Detail Component', () => {
        let comp: LancamentoDetailComponent;
        let fixture: ComponentFixture<LancamentoDetailComponent>;
        let service: LancamentoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ERestauranteTestModule],
                declarations: [LancamentoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    LancamentoService,
                    JhiEventManager
                ]
            }).overrideTemplate(LancamentoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LancamentoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LancamentoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Lancamento(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.lancamento).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
