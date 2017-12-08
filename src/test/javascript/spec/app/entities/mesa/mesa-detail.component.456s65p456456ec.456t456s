/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ERestauranteTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MesaDetailComponent } from '../../../../../../main/webapp/app/entities/mesa/mesa-detail.component';
import { MesaService } from '../../../../../../main/webapp/app/entities/mesa/mesa.service';
import { Mesa } from '../../../../../../main/webapp/app/entities/mesa/mesa.model';

describe('Component Tests', () => {

    describe('Mesa Management Detail Component', () => {
        let comp: MesaDetailComponent;
        let fixture: ComponentFixture<MesaDetailComponent>;
        let service: MesaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ERestauranteTestModule],
                declarations: [MesaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MesaService,
                    JhiEventManager
                ]
            }).overrideTemplate(MesaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MesaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MesaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Mesa(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.mesa).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
