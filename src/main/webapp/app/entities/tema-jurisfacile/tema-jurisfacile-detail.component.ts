import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TemaJurisfacile } from './tema-jurisfacile.model';
import { TemaJurisfacileService } from './tema-jurisfacile.service';

@Component({
    selector: 'jhi-tema-jurisfacile-detail',
    templateUrl: './tema-jurisfacile-detail.component.html'
})
export class TemaJurisfacileDetailComponent implements OnInit, OnDestroy {

    tema: TemaJurisfacile;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private temaService: TemaJurisfacileService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTemas();
    }

    load(id) {
        this.temaService.find(id)
            .subscribe((temaResponse: HttpResponse<TemaJurisfacile>) => {
                this.tema = temaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTemas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'temaListModification',
            (response) => this.load(this.tema.id)
        );
    }
}
