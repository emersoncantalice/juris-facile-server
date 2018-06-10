/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JurisfacileTestModule } from '../../../test.module';
import { DisciplinaJurisfacileDialogComponent } from '../../../../../../main/webapp/app/entities/disciplina-jurisfacile/disciplina-jurisfacile-dialog.component';
import { DisciplinaJurisfacileService } from '../../../../../../main/webapp/app/entities/disciplina-jurisfacile/disciplina-jurisfacile.service';
import { DisciplinaJurisfacile } from '../../../../../../main/webapp/app/entities/disciplina-jurisfacile/disciplina-jurisfacile.model';
import { TemaJurisfacileService } from '../../../../../../main/webapp/app/entities/tema-jurisfacile';
import { CursoJurisfacileService } from '../../../../../../main/webapp/app/entities/curso-jurisfacile';

describe('Component Tests', () => {

    describe('DisciplinaJurisfacile Management Dialog Component', () => {
        let comp: DisciplinaJurisfacileDialogComponent;
        let fixture: ComponentFixture<DisciplinaJurisfacileDialogComponent>;
        let service: DisciplinaJurisfacileService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JurisfacileTestModule],
                declarations: [DisciplinaJurisfacileDialogComponent],
                providers: [
                    TemaJurisfacileService,
                    CursoJurisfacileService,
                    DisciplinaJurisfacileService
                ]
            })
            .overrideTemplate(DisciplinaJurisfacileDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DisciplinaJurisfacileDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DisciplinaJurisfacileService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DisciplinaJurisfacile(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.disciplina = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'disciplinaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DisciplinaJurisfacile();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.disciplina = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'disciplinaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
