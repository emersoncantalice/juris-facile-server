import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DisciplinaJurisfacile } from './disciplina-jurisfacile.model';
import { DisciplinaJurisfacileService } from './disciplina-jurisfacile.service';

@Injectable()
export class DisciplinaJurisfacilePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private disciplinaService: DisciplinaJurisfacileService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.disciplinaService.find(id)
                    .subscribe((disciplinaResponse: HttpResponse<DisciplinaJurisfacile>) => {
                        const disciplina: DisciplinaJurisfacile = disciplinaResponse.body;
                        this.ngbModalRef = this.disciplinaModalRef(component, disciplina);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.disciplinaModalRef(component, new DisciplinaJurisfacile());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    disciplinaModalRef(component: Component, disciplina: DisciplinaJurisfacile): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.disciplina = disciplina;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}