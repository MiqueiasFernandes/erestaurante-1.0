/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ERestauranteTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { NotaDetailComponent } from '../../../../../../main/webapp/app/entities/nota/nota-detail.component';
import { NotaService } from '../../../../../../main/webapp/app/entities/nota/nota.service';
import { Nota } from '../../../../../../main/webapp/app/entities/nota/nota.model';

describe('Component Tests', () => {

    describe('Nota Management Detail Component', () => {
        let comp: NotaDetailComponent;
        let fixture: ComponentFixture<NotaDetailComponent>;
        let service: NotaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ERestauranteTestModule],
                declarations: [NotaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    NotaService,
                    JhiEventManager
                ]
            }).overrideTemplate(NotaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NotaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Nota(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.nota).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
