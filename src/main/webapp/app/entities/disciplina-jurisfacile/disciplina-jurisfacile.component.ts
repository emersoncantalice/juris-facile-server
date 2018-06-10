import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DisciplinaJurisfacile } from './disciplina-jurisfacile.model';
import { DisciplinaJurisfacileService } from './disciplina-jurisfacile.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-disciplina-jurisfacile',
    templateUrl: './disciplina-jurisfacile.component.html'
})
export class DisciplinaJurisfacileComponent implements OnInit, OnDestroy {
disciplinas: DisciplinaJurisfacile[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private disciplinaService: DisciplinaJurisfacileService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.disciplinaService.query().subscribe(
            (res: HttpResponse<DisciplinaJurisfacile[]>) => {
                this.disciplinas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDisciplinas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DisciplinaJurisfacile) {
        return item.id;
    }
    registerChangeInDisciplinas() {
        this.eventSubscriber = this.eventManager.subscribe('disciplinaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
