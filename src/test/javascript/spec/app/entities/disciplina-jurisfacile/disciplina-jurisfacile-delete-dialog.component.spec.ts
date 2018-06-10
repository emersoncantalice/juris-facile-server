/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JurisfacileTestModule } from '../../../test.module';
import { DisciplinaJurisfacileDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/disciplina-jurisfacile/disciplina-jurisfacile-delete-dialog.component';
import { DisciplinaJurisfacileService } from '../../../../../../main/webapp/app/entities/disciplina-jurisfacile/disciplina-jurisfacile.service';

describe('Component Tests', () => {

    describe('DisciplinaJurisfacile Management Delete Component', () => {
        let comp: DisciplinaJurisfacileDeleteDialogComponent;
        let fixture: ComponentFixture<DisciplinaJurisfacileDeleteDialogComponent>;
        let service: DisciplinaJurisfacileService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JurisfacileTestModule],
                declarations: [DisciplinaJurisfacileDeleteDialogComponent],
                providers: [
                    DisciplinaJurisfacileService
                ]
            })
            .overrideTemplate(DisciplinaJurisfacileDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DisciplinaJurisfacileDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DisciplinaJurisfacileService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
