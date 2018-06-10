/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JurisfacileTestModule } from '../../../test.module';
import { DisciplinaJurisfacileComponent } from '../../../../../../main/webapp/app/entities/disciplina-jurisfacile/disciplina-jurisfacile.component';
import { DisciplinaJurisfacileService } from '../../../../../../main/webapp/app/entities/disciplina-jurisfacile/disciplina-jurisfacile.service';
import { DisciplinaJurisfacile } from '../../../../../../main/webapp/app/entities/disciplina-jurisfacile/disciplina-jurisfacile.model';

describe('Component Tests', () => {

    describe('DisciplinaJurisfacile Management Component', () => {
        let comp: DisciplinaJurisfacileComponent;
        let fixture: ComponentFixture<DisciplinaJurisfacileComponent>;
        let service: DisciplinaJurisfacileService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JurisfacileTestModule],
                declarations: [DisciplinaJurisfacileComponent],
                providers: [
                    DisciplinaJurisfacileService
                ]
            })
            .overrideTemplate(DisciplinaJurisfacileComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DisciplinaJurisfacileComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DisciplinaJurisfacileService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DisciplinaJurisfacile(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.disciplinas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
