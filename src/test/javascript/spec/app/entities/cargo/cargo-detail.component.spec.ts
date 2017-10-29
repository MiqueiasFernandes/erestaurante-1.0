/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ERestauranteTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CargoDetailComponent } from '../../../../../../main/webapp/app/entities/cargo/cargo-detail.component';
import { CargoService } from '../../../../../../main/webapp/app/entities/cargo/cargo.service';
import { Cargo } from '../../../../../../main/webapp/app/entities/cargo/cargo.model';

describe('Component Tests', () => {

    describe('Cargo Management Detail Component', () => {
        let comp: CargoDetailComponent;
        let fixture: ComponentFixture<CargoDetailComponent>;
        let service: CargoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ERestauranteTestModule],
                declarations: [CargoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CargoService,
                    JhiEventManager
                ]
            }).overrideTemplate(CargoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CargoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CargoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Cargo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.cargo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
