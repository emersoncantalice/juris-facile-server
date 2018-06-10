import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { TermoJurisfacile } from './termo-jurisfacile.model';
import { TermoJurisfacileService } from './termo-jurisfacile.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-termo-jurisfacile',
    templateUrl: './termo-jurisfacile.component.html'
})
export class TermoJurisfacileComponent implements OnInit, OnDestroy {
termos: TermoJurisfacile[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private termoService: TermoJurisfacileService,
        private jhiAlertService: JhiAlertService,
        private dataUtils: JhiDataUtils,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.termoService.query().subscribe(
            (res: HttpResponse<TermoJurisfacile[]>) => {
                this.termos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTermos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TermoJurisfacile) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    registerChangeInTermos() {
        this.eventSubscriber = this.eventManager.subscribe('termoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
