import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TermoJurisfacile } from './termo-jurisfacile.model';
import { TermoJurisfacileService } from './termo-jurisfacile.service';

@Injectable()
export class TermoJurisfacilePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private termoService: TermoJurisfacileService

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
                this.termoService.find(id)
                    .subscribe((termoResponse: HttpResponse<TermoJurisfacile>) => {
                        const termo: TermoJurisfacile = termoResponse.body;
                        this.ngbModalRef = this.termoModalRef(component, termo);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.termoModalRef(component, new TermoJurisfacile());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    termoModalRef(component: Component, termo: TermoJurisfacile): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.termo = termo;
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
