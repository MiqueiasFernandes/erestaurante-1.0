/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ERestauranteTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RestauranteDetailComponent } from '../../../../../../main/webapp/app/entities/restaurante/restaurante-detail.component';
import { RestauranteService } from '../../../../../../main/webapp/app/entities/restaurante/restaurante.service';
import { Restaurante } from '../../../../../../main/webapp/app/entities/restaurante/restaurante.model';

describe('Component Tests', () => {

    describe('Restaurante Management Detail Component', () => {
        let comp: RestauranteDetailComponent;
        let fixture: ComponentFixture<RestauranteDetailComponent>;
        let service: RestauranteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ERestauranteTestModule],
                declarations: [RestauranteDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    RestauranteService,
                    JhiEventManager
                ]
            }).overrideTemplate(RestauranteDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RestauranteDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RestauranteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Restaurante(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.restaurante).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
