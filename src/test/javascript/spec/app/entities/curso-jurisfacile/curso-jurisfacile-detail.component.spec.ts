/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JurisfacileTestModule } from '../../../test.module';
import { CursoJurisfacileDetailComponent } from '../../../../../../main/webapp/app/entities/curso-jurisfacile/curso-jurisfacile-detail.component';
import { CursoJurisfacileService } from '../../../../../../main/webapp/app/entities/curso-jurisfacile/curso-jurisfacile.service';
import { CursoJurisfacile } from '../../../../../../main/webapp/app/entities/curso-jurisfacile/curso-jurisfacile.model';

describe('Component Tests', () => {

    describe('CursoJurisfacile Management Detail Component', () => {
        let comp: CursoJurisfacileDetailComponent;
        let fixture: ComponentFixture<CursoJurisfacileDetailComponent>;
        let service: CursoJurisfacileService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JurisfacileTestModule],
                declarations: [CursoJurisfacileDetailComponent],
                providers: [
                    CursoJurisfacileService
                ]
            })
            .overrideTemplate(CursoJurisfacileDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CursoJurisfacileDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CursoJurisfacileService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CursoJurisfacile(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.curso).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
