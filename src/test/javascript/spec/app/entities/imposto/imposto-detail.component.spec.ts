/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ERestauranteTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ImpostoDetailComponent } from '../../../../../../main/webapp/app/entities/imposto/imposto-detail.component';
import { ImpostoService } from '../../../../../../main/webapp/app/entities/imposto/imposto.service';
import { Imposto } from '../../../../../../main/webapp/app/entities/imposto/imposto.model';

describe('Component Tests', () => {

    describe('Imposto Management Detail Component', () => {
        let comp: ImpostoDetailComponent;
        let fixture: ComponentFixture<ImpostoDetailComponent>;
        let service: ImpostoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ERestauranteTestModule],
                declarations: [ImpostoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ImpostoService,
                    JhiEventManager
                ]
            }).overrideTemplate(ImpostoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ImpostoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImpostoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Imposto(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.imposto).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
