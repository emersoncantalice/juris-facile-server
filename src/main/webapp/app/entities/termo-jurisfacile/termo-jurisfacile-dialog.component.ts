import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { TermoJurisfacile } from './termo-jurisfacile.model';
import { TermoJurisfacilePopupService } from './termo-jurisfacile-popup.service';
import { TermoJurisfacileService } from './termo-jurisfacile.service';
import { TemaJurisfacile, TemaJurisfacileService } from '../tema-jurisfacile';

@Component({
    selector: 'jhi-termo-jurisfacile-dialog',
    templateUrl: './termo-jurisfacile-dialog.component.html'
})
export class TermoJurisfacileDialogComponent implements OnInit {

    termo: TermoJurisfacile;
    isSaving: boolean;

    temas: TemaJurisfacile[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private termoService: TermoJurisfacileService,
        private temaService: TemaJurisfacileService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.temaService.query()
            .subscribe((res: HttpResponse<TemaJurisfacile[]>) => { this.temas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.termo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.termoService.update(this.termo));
        } else {
            this.subscribeToSaveResponse(
                this.termoService.create(this.termo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TermoJurisfacile>>) {
        result.subscribe((res: HttpResponse<TermoJurisfacile>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TermoJurisfacile) {
        this.eventManager.broadcast({ name: 'termoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTemaById(index: number, item: TemaJurisfacile) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-termo-jurisfacile-popup',
    template: ''
})
export class TermoJurisfacilePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private termoPopupService: TermoJurisfacilePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.termoPopupService
                    .open(TermoJurisfacileDialogComponent as Component, params['id']);
            } else {
                this.termoPopupService
                    .open(TermoJurisfacileDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
