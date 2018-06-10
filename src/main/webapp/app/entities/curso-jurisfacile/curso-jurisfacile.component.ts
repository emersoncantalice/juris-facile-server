import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CursoJurisfacile } from './curso-jurisfacile.model';
import { CursoJurisfacileService } from './curso-jurisfacile.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-curso-jurisfacile',
    templateUrl: './curso-jurisfacile.component.html'
})
export class CursoJurisfacileComponent implements OnInit, OnDestroy {
cursos: CursoJurisfacile[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cursoService: CursoJurisfacileService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cursoService.query().subscribe(
            (res: HttpResponse<CursoJurisfacile[]>) => {
                this.cursos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCursos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CursoJurisfacile) {
        return item.id;
    }
    registerChangeInCursos() {
        this.eventSubscriber = this.eventManager.subscribe('cursoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
