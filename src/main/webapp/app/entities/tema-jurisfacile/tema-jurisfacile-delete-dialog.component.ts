import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TemaJurisfacile } from './tema-jurisfacile.model';
import { TemaJurisfacilePopupService } from './tema-jurisfacile-popup.service';
import { TemaJurisfacileService } from './tema-jurisfacile.service';

@Component({
    selector: 'jhi-tema-jurisfacile-delete-dialog',
    templateUrl: './tema-jurisfacile-delete-dialog.component.html'
})
export class TemaJurisfacileDeleteDialogComponent {

    tema: TemaJurisfacile;

    constructor(
        private temaService: TemaJurisfacileService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.temaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'temaListModification',
                content: 'Deleted an tema'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tema-jurisfacile-delete-popup',
    template: ''
})
export class TemaJurisfacileDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private temaPopupService: TemaJurisfacilePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.temaPopupService
                .open(TemaJurisfacileDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
