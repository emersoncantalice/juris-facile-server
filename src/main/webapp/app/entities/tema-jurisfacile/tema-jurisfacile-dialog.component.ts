import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TemaJurisfacile } from './tema-jurisfacile.model';
import { TemaJurisfacilePopupService } from './tema-jurisfacile-popup.service';
import { TemaJurisfacileService } from './tema-jurisfacile.service';
import { DisciplinaJurisfacile, DisciplinaJurisfacileService } from '../disciplina-jurisfacile';

@Component({
    selector: 'jhi-tema-jurisfacile-dialog',
    templateUrl: './tema-jurisfacile-dialog.component.html'
})
export class TemaJurisfacileDialogComponent implements OnInit {

    tema: TemaJurisfacile;
    isSaving: boolean;

    disciplinas: DisciplinaJurisfacile[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private temaService: TemaJurisfacileService,
        private disciplinaService: DisciplinaJurisfacileService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.disciplinaService.query()
            .subscribe((res: HttpResponse<DisciplinaJurisfacile[]>) => { this.disciplinas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tema.id !== undefined) {
            this.subscribeToSaveResponse(
                this.temaService.update(this.tema));
        } else {
            this.subscribeToSaveResponse(
                this.temaService.create(this.tema));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TemaJurisfacile>>) {
        result.subscribe((res: HttpResponse<TemaJurisfacile>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TemaJurisfacile) {
        this.eventManager.broadcast({ name: 'temaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDisciplinaById(index: number, item: DisciplinaJurisfacile) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-tema-jurisfacile-popup',
    template: ''
})
export class TemaJurisfacilePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private temaPopupService: TemaJurisfacilePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.temaPopupService
                    .open(TemaJurisfacileDialogComponent as Component, params['id']);
            } else {
                this.temaPopupService
                    .open(TemaJurisfacileDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
