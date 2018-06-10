import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TermoJurisfacile } from './termo-jurisfacile.model';
import { TermoJurisfacilePopupService } from './termo-jurisfacile-popup.service';
import { TermoJurisfacileService } from './termo-jurisfacile.service';

@Component({
    selector: 'jhi-termo-jurisfacile-delete-dialog',
    templateUrl: './termo-jurisfacile-delete-dialog.component.html'
})
export class TermoJurisfacileDeleteDialogComponent {

    termo: TermoJurisfacile;

    constructor(
        private termoService: TermoJurisfacileService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.termoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'termoListModification',
                content: 'Deleted an termo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-termo-jurisfacile-delete-popup',
    template: ''
})
export class TermoJurisfacileDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private termoPopupService: TermoJurisfacilePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.termoPopupService
                .open(TermoJurisfacileDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
