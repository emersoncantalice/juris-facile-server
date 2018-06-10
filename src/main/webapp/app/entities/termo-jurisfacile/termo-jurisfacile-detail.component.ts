import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { TermoJurisfacile } from './termo-jurisfacile.model';
import { TermoJurisfacileService } from './termo-jurisfacile.service';

@Component({
    selector: 'jhi-termo-jurisfacile-detail',
    templateUrl: './termo-jurisfacile-detail.component.html'
})
export class TermoJurisfacileDetailComponent implements OnInit, OnDestroy {

    termo: TermoJurisfacile;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private termoService: TermoJurisfacileService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTermos();
    }

    load(id) {
        this.termoService.find(id)
            .subscribe((termoResponse: HttpResponse<TermoJurisfacile>) => {
                this.termo = termoResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTermos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'termoListModification',
            (response) => this.load(this.termo.id)
        );
    }
}
