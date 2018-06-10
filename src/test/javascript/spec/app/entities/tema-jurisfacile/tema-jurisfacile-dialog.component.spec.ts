/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JurisfacileTestModule } from '../../../test.module';
import { TemaJurisfacileDialogComponent } from '../../../../../../main/webapp/app/entities/tema-jurisfacile/tema-jurisfacile-dialog.component';
import { TemaJurisfacileService } from '../../../../../../main/webapp/app/entities/tema-jurisfacile/tema-jurisfacile.service';
import { TemaJurisfacile } from '../../../../../../main/webapp/app/entities/tema-jurisfacile/tema-jurisfacile.model';
import { DisciplinaJurisfacileService } from '../../../../../../main/webapp/app/entities/disciplina-jurisfacile';

describe('Component Tests', () => {

    describe('TemaJurisfacile Management Dialog Component', () => {
        let comp: TemaJurisfacileDialogComponent;
        let fixture: ComponentFixture<TemaJurisfacileDialogComponent>;
        let service: TemaJurisfacileService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JurisfacileTestModule],
                declarations: [TemaJurisfacileDialogComponent],
                providers: [
                    DisciplinaJurisfacileService,
                    TemaJurisfacileService
                ]
            })
            .overrideTemplate(TemaJurisfacileDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TemaJurisfacileDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TemaJurisfacileService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TemaJurisfacile(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.tema = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'temaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TemaJurisfacile();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.tema = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'temaListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
