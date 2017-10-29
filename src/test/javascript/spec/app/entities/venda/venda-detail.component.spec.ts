/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ERestauranteTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { VendaDetailComponent } from '../../../../../../main/webapp/app/entities/venda/venda-detail.component';
import { VendaService } from '../../../../../../main/webapp/app/entities/venda/venda.service';
import { Venda } from '../../../../../../main/webapp/app/entities/venda/venda.model';

describe('Component Tests', () => {

    describe('Venda Management Detail Component', () => {
        let comp: VendaDetailComponent;
        let fixture: ComponentFixture<VendaDetailComponent>;
        let service: VendaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ERestauranteTestModule],
                declarations: [VendaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    VendaService,
                    JhiEventManager
                ]
            }).overrideTemplate(VendaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VendaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VendaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Venda(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.venda).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
