import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CursoJurisfacile } from './curso-jurisfacile.model';
import { CursoJurisfacileService } from './curso-jurisfacile.service';

@Injectable()
export class CursoJurisfacilePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private cursoService: CursoJurisfacileService

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
                this.cursoService.find(id)
                    .subscribe((cursoResponse: HttpResponse<CursoJurisfacile>) => {
                        const curso: CursoJurisfacile = cursoResponse.body;
                        this.ngbModalRef = this.cursoModalRef(component, curso);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cursoModalRef(component, new CursoJurisfacile());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cursoModalRef(component: Component, curso: CursoJurisfacile): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.curso = curso;
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
