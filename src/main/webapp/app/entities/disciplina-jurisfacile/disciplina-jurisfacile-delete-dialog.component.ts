import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DisciplinaJurisfacile } from './disciplina-jurisfacile.model';
import { DisciplinaJurisfacilePopupService } from './disciplina-jurisfacile-popup.service';
import { DisciplinaJurisfacileService } from './disciplina-jurisfacile.service';

@Component({
    selector: 'jhi-disciplina-jurisfacile-delete-dialog',
    templateUrl: './disciplina-jurisfacile-delete-dialog.component.html'
})
export class DisciplinaJurisfacileDeleteDialogComponent {

    disciplina: DisciplinaJurisfacile;

    constructor(
        private disciplinaService: DisciplinaJurisfacileService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.disciplinaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'disciplinaListModification',
                content: 'Deleted an disciplina'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-disciplina-jurisfacile-delete-popup',
    template: ''
})
export class DisciplinaJurisfacileDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private disciplinaPopupService: DisciplinaJurisfacilePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.disciplinaPopupService
                .open(DisciplinaJurisfacileDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
