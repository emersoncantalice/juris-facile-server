/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JurisfacileTestModule } from '../../../test.module';
import { DisciplinaJurisfacileDetailComponent } from '../../../../../../main/webapp/app/entities/disciplina-jurisfacile/disciplina-jurisfacile-detail.component';
import { DisciplinaJurisfacileService } from '../../../../../../main/webapp/app/entities/disciplina-jurisfacile/disciplina-jurisfacile.service';
import { DisciplinaJurisfacile } from '../../../../../../main/webapp/app/entities/disciplina-jurisfacile/disciplina-jurisfacile.model';

describe('Component Tests', () => {

    describe('DisciplinaJurisfacile Management Detail Component', () => {
        let comp: DisciplinaJurisfacileDetailComponent;
        let fixture: ComponentFixture<DisciplinaJurisfacileDetailComponent>;
        let service: DisciplinaJurisfacileService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JurisfacileTestModule],
                declarations: [DisciplinaJurisfacileDetailComponent],
                providers: [
                    DisciplinaJurisfacileService
                ]
            })
            .overrideTemplate(DisciplinaJurisfacileDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DisciplinaJurisfacileDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DisciplinaJurisfacileService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DisciplinaJurisfacile(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.disciplina).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
