import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DisciplinaJurisfacile } from './disciplina-jurisfacile.model';
import { DisciplinaJurisfacilePopupService } from './disciplina-jurisfacile-popup.service';
import { DisciplinaJurisfacileService } from './disciplina-jurisfacile.service';
import { TemaJurisfacile, TemaJurisfacileService } from '../tema-jurisfacile';
import { CursoJurisfacile, CursoJurisfacileService } from '../curso-jurisfacile';

@Component({
    selector: 'jhi-disciplina-jurisfacile-dialog',
    templateUrl: './disciplina-jurisfacile-dialog.component.html'
})
export class DisciplinaJurisfacileDialogComponent implements OnInit {

    disciplina: DisciplinaJurisfacile;
    isSaving: boolean;

    temas: TemaJurisfacile[];

    cursos: CursoJurisfacile[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private disciplinaService: DisciplinaJurisfacileService,
        private temaService: TemaJurisfacileService,
        private cursoService: CursoJurisfacileService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.temaService.query()
            .subscribe((res: HttpResponse<TemaJurisfacile[]>) => { this.temas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cursoService.query()
            .subscribe((res: HttpResponse<CursoJurisfacile[]>) => { this.cursos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.disciplina.id !== undefined) {
            this.subscribeToSaveResponse(
                this.disciplinaService.update(this.disciplina));
        } else {
            this.subscribeToSaveResponse(
                this.disciplinaService.create(this.disciplina));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DisciplinaJurisfacile>>) {
        result.subscribe((res: HttpResponse<DisciplinaJurisfacile>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DisciplinaJurisfacile) {
        this.eventManager.broadcast({ name: 'disciplinaListModification', content: 'OK'});
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

    trackCursoById(index: number, item: CursoJurisfacile) {
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
    selector: 'jhi-disciplina-jurisfacile-popup',
    template: ''
})
export class DisciplinaJurisfacilePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private disciplinaPopupService: DisciplinaJurisfacilePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.disciplinaPopupService
                    .open(DisciplinaJurisfacileDialogComponent as Component, params['id']);
            } else {
                this.disciplinaPopupService
                    .open(DisciplinaJurisfacileDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
