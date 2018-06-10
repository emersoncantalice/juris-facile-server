/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JurisfacileTestModule } from '../../../test.module';
import { CursoJurisfacileDialogComponent } from '../../../../../../main/webapp/app/entities/curso-jurisfacile/curso-jurisfacile-dialog.component';
import { CursoJurisfacileService } from '../../../../../../main/webapp/app/entities/curso-jurisfacile/curso-jurisfacile.service';
import { CursoJurisfacile } from '../../../../../../main/webapp/app/entities/curso-jurisfacile/curso-jurisfacile.model';
import { DisciplinaJurisfacileService } from '../../../../../../main/webapp/app/entities/disciplina-jurisfacile';

describe('Component Tests', () => {

    describe('CursoJurisfacile Management Dialog Component', () => {
        let comp: CursoJurisfacileDialogComponent;
        let fixture: ComponentFixture<CursoJurisfacileDialogComponent>;
        let service: CursoJurisfacileService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JurisfacileTestModule],
                declarations: [CursoJurisfacileDialogComponent],
                providers: [
                    DisciplinaJurisfacileService,
                    CursoJurisfacileService
                ]
            })
            .overrideTemplate(CursoJurisfacileDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CursoJurisfacileDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CursoJurisfacileService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CursoJurisfacile(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.curso = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cursoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CursoJurisfacile();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.curso = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'cursoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
