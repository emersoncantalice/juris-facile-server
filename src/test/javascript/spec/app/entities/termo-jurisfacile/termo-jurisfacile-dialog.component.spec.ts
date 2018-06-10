/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JurisfacileTestModule } from '../../../test.module';
import { TermoJurisfacileDialogComponent } from '../../../../../../main/webapp/app/entities/termo-jurisfacile/termo-jurisfacile-dialog.component';
import { TermoJurisfacileService } from '../../../../../../main/webapp/app/entities/termo-jurisfacile/termo-jurisfacile.service';
import { TermoJurisfacile } from '../../../../../../main/webapp/app/entities/termo-jurisfacile/termo-jurisfacile.model';
import { TemaJurisfacileService } from '../../../../../../main/webapp/app/entities/tema-jurisfacile';

describe('Component Tests', () => {

    describe('TermoJurisfacile Management Dialog Component', () => {
        let comp: TermoJurisfacileDialogComponent;
        let fixture: ComponentFixture<TermoJurisfacileDialogComponent>;
        let service: TermoJurisfacileService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JurisfacileTestModule],
                declarations: [TermoJurisfacileDialogComponent],
                providers: [
                    TemaJurisfacileService,
                    TermoJurisfacileService
                ]
            })
            .overrideTemplate(TermoJurisfacileDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TermoJurisfacileDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TermoJurisfacileService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TermoJurisfacile(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.termo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'termoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TermoJurisfacile();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.termo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'termoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
