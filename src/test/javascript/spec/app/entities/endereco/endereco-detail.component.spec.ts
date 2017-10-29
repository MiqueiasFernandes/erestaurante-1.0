/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ERestauranteTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EnderecoDetailComponent } from '../../../../../../main/webapp/app/entities/endereco/endereco-detail.component';
import { EnderecoService } from '../../../../../../main/webapp/app/entities/endereco/endereco.service';
import { Endereco } from '../../../../../../main/webapp/app/entities/endereco/endereco.model';

describe('Component Tests', () => {

    describe('Endereco Management Detail Component', () => {
        let comp: EnderecoDetailComponent;
        let fixture: ComponentFixture<EnderecoDetailComponent>;
        let service: EnderecoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ERestauranteTestModule],
                declarations: [EnderecoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EnderecoService,
                    JhiEventManager
                ]
            }).overrideTemplate(EnderecoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EnderecoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EnderecoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Endereco(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.endereco).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
