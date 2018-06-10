/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JurisfacileTestModule } from '../../../test.module';
import { TemaJurisfacileDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tema-jurisfacile/tema-jurisfacile-delete-dialog.component';
import { TemaJurisfacileService } from '../../../../../../main/webapp/app/entities/tema-jurisfacile/tema-jurisfacile.service';

describe('Component Tests', () => {

    describe('TemaJurisfacile Management Delete Component', () => {
        let comp: TemaJurisfacileDeleteDialogComponent;
        let fixture: ComponentFixture<TemaJurisfacileDeleteDialogComponent>;
        let service: TemaJurisfacileService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JurisfacileTestModule],
                declarations: [TemaJurisfacileDeleteDialogComponent],
                providers: [
                    TemaJurisfacileService
                ]
            })
            .overrideTemplate(TemaJurisfacileDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TemaJurisfacileDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TemaJurisfacileService);
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
