/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JurisfacileTestModule } from '../../../test.module';
import { CursoJurisfacileComponent } from '../../../../../../main/webapp/app/entities/curso-jurisfacile/curso-jurisfacile.component';
import { CursoJurisfacileService } from '../../../../../../main/webapp/app/entities/curso-jurisfacile/curso-jurisfacile.service';
import { CursoJurisfacile } from '../../../../../../main/webapp/app/entities/curso-jurisfacile/curso-jurisfacile.model';

describe('Component Tests', () => {

    describe('CursoJurisfacile Management Component', () => {
        let comp: CursoJurisfacileComponent;
        let fixture: ComponentFixture<CursoJurisfacileComponent>;
        let service: CursoJurisfacileService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JurisfacileTestModule],
                declarations: [CursoJurisfacileComponent],
                providers: [
                    CursoJurisfacileService
                ]
            })
            .overrideTemplate(CursoJurisfacileComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CursoJurisfacileComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CursoJurisfacileService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CursoJurisfacile(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cursos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
