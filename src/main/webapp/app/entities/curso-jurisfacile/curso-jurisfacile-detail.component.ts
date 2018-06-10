import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CursoJurisfacile } from './curso-jurisfacile.model';
import { CursoJurisfacileService } from './curso-jurisfacile.service';

@Component({
    selector: 'jhi-curso-jurisfacile-detail',
    templateUrl: './curso-jurisfacile-detail.component.html'
})
export class CursoJurisfacileDetailComponent implements OnInit, OnDestroy {

    curso: CursoJurisfacile;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cursoService: CursoJurisfacileService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCursos();
    }

    load(id) {
        this.cursoService.find(id)
            .subscribe((cursoResponse: HttpResponse<CursoJurisfacile>) => {
                this.curso = cursoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCursos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cursoListModification',
            (response) => this.load(this.curso.id)
        );
    }
}
