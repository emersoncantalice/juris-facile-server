import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CursoJurisfacile } from './curso-jurisfacile.model';
import { CursoJurisfacilePopupService } from './curso-jurisfacile-popup.service';
import { CursoJurisfacileService } from './curso-jurisfacile.service';

@Component({
    selector: 'jhi-curso-jurisfacile-delete-dialog',
    templateUrl: './curso-jurisfacile-delete-dialog.component.html'
})
export class CursoJurisfacileDeleteDialogComponent {

    curso: CursoJurisfacile;

    constructor(
        private cursoService: CursoJurisfacileService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cursoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cursoListModification',
                content: 'Deleted an curso'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-curso-jurisfacile-delete-popup',
    template: ''
})
export class CursoJurisfacileDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cursoPopupService: CursoJurisfacilePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cursoPopupService
                .open(CursoJurisfacileDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
