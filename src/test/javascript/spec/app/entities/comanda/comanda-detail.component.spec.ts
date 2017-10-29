/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ERestauranteTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ComandaDetailComponent } from '../../../../../../main/webapp/app/entities/comanda/comanda-detail.component';
import { ComandaService } from '../../../../../../main/webapp/app/entities/comanda/comanda.service';
import { Comanda } from '../../../../../../main/webapp/app/entities/comanda/comanda.model';

describe('Component Tests', () => {

    describe('Comanda Management Detail Component', () => {
        let comp: ComandaDetailComponent;
        let fixture: ComponentFixture<ComandaDetailComponent>;
        let service: ComandaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ERestauranteTestModule],
                declarations: [ComandaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ComandaService,
                    JhiEventManager
                ]
            }).overrideTemplate(ComandaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ComandaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComandaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Comanda(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.comanda).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
