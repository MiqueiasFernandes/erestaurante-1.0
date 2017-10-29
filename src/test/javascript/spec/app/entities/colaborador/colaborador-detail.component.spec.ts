/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ERestauranteTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ColaboradorDetailComponent } from '../../../../../../main/webapp/app/entities/colaborador/colaborador-detail.component';
import { ColaboradorService } from '../../../../../../main/webapp/app/entities/colaborador/colaborador.service';
import { Colaborador } from '../../../../../../main/webapp/app/entities/colaborador/colaborador.model';

describe('Component Tests', () => {

    describe('Colaborador Management Detail Component', () => {
        let comp: ColaboradorDetailComponent;
        let fixture: ComponentFixture<ColaboradorDetailComponent>;
        let service: ColaboradorService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ERestauranteTestModule],
                declarations: [ColaboradorDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ColaboradorService,
                    JhiEventManager
                ]
            }).overrideTemplate(ColaboradorDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ColaboradorDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ColaboradorService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Colaborador(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.colaborador).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
