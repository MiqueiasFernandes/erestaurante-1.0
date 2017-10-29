/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ERestauranteTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ProdutoDetailComponent } from '../../../../../../main/webapp/app/entities/produto/produto-detail.component';
import { ProdutoService } from '../../../../../../main/webapp/app/entities/produto/produto.service';
import { Produto } from '../../../../../../main/webapp/app/entities/produto/produto.model';

describe('Component Tests', () => {

    describe('Produto Management Detail Component', () => {
        let comp: ProdutoDetailComponent;
        let fixture: ComponentFixture<ProdutoDetailComponent>;
        let service: ProdutoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ERestauranteTestModule],
                declarations: [ProdutoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ProdutoService,
                    JhiEventManager
                ]
            }).overrideTemplate(ProdutoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProdutoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProdutoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Produto(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.produto).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
