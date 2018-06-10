import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TemaJurisfacile } from './tema-jurisfacile.model';
import { TemaJurisfacileService } from './tema-jurisfacile.service';

@Injectable()
export class TemaJurisfacilePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private temaService: TemaJurisfacileService

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
                this.temaService.find(id)
                    .subscribe((temaResponse: HttpResponse<TemaJurisfacile>) => {
                        const tema: TemaJurisfacile = temaResponse.body;
                        this.ngbModalRef = this.temaModalRef(component, tema);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.temaModalRef(component, new TemaJurisfacile());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    temaModalRef(component: Component, tema: TemaJurisfacile): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.tema = tema;
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
