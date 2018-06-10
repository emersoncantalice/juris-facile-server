import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DisciplinaJurisfacile } from './disciplina-jurisfacile.model';
import { DisciplinaJurisfacileService } from './disciplina-jurisfacile.service';

@Component({
    selector: 'jhi-disciplina-jurisfacile-detail',
    templateUrl: './disciplina-jurisfacile-detail.component.html'
})
export class DisciplinaJurisfacileDetailComponent implements OnInit, OnDestroy {

    disciplina: DisciplinaJurisfacile;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private disciplinaService: DisciplinaJurisfacileService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDisciplinas();
    }

    load(id) {
        this.disciplinaService.find(id)
            .subscribe((disciplinaResponse: HttpResponse<DisciplinaJurisfacile>) => {
                this.disciplina = disciplinaResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDisciplinas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'disciplinaListModification',
            (response) => this.load(this.disciplina.id)
        );
    }
}
