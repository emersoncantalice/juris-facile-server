import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CursoJurisfacile } from './curso-jurisfacile.model';
import { CursoJurisfacilePopupService } from './curso-jurisfacile-popup.service';
import { CursoJurisfacileService } from './curso-jurisfacile.service';
import { DisciplinaJurisfacile, DisciplinaJurisfacileService } from '../disciplina-jurisfacile';

@Component({
    selector: 'jhi-curso-jurisfacile-dialog',
    templateUrl: './curso-jurisfacile-dialog.component.html'
})
export class CursoJurisfacileDialogComponent implements OnInit {

    curso: CursoJurisfacile;
    isSaving: boolean;

    disciplinas: DisciplinaJurisfacile[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cursoService: CursoJurisfacileService,
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
        if (this.curso.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cursoService.update(this.curso));
        } else {
            this.subscribeToSaveResponse(
                this.cursoService.create(this.curso));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CursoJurisfacile>>) {
        result.subscribe((res: HttpResponse<CursoJurisfacile>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CursoJurisfacile) {
        this.eventManager.broadcast({ name: 'cursoListModification', content: 'OK'});
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
    selector: 'jhi-curso-jurisfacile-popup',
    template: ''
})
export class CursoJurisfacilePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cursoPopupService: CursoJurisfacilePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cursoPopupService
                    .open(CursoJurisfacileDialogComponent as Component, params['id']);
            } else {
                this.cursoPopupService
                    .open(CursoJurisfacileDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
