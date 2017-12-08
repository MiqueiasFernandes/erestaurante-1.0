/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ERestauranteTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ImpressoraDetailComponent } from '../../../../../../main/webapp/app/entities/impressora/impressora-detail.component';
import { ImpressoraService } from '../../../../../../main/webapp/app/entities/impressora/impressora.service';
import { Impressora } from '../../../../../../main/webapp/app/entities/impressora/impressora.model';

describe('Component Tests', () => {

    describe('Impressora Management Detail Component', () => {
        let comp: ImpressoraDetailComponent;
        let fixture: ComponentFixture<ImpressoraDetailComponent>;
        let service: ImpressoraService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ERestauranteTestModule],
                declarations: [ImpressoraDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ImpressoraService,
                    JhiEventManager
                ]
            }).overrideTemplate(ImpressoraDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ImpressoraDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ImpressoraService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Impressora(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.impressora).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
