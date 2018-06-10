import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TemaJurisfacile } from './tema-jurisfacile.model';
import { TemaJurisfacileService } from './tema-jurisfacile.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-tema-jurisfacile',
    templateUrl: './tema-jurisfacile.component.html'
})
export class TemaJurisfacileComponent implements OnInit, OnDestroy {
temas: TemaJurisfacile[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private temaService: TemaJurisfacileService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.temaService.query().subscribe(
            (res: HttpResponse<TemaJurisfacile[]>) => {
                this.temas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTemas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TemaJurisfacile) {
        return item.id;
    }
    registerChangeInTemas() {
        this.eventSubscriber = this.eventManager.subscribe('temaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
