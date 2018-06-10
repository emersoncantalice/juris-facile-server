import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TermoJurisfacileComponent } from './termo-jurisfacile.component';
import { TermoJurisfacileDetailComponent } from './termo-jurisfacile-detail.component';
import { TermoJurisfacilePopupComponent } from './termo-jurisfacile-dialog.component';
import { TermoJurisfacileDeletePopupComponent } from './termo-jurisfacile-delete-dialog.component';

export const termoRoute: Routes = [
    {
        path: 'termo-jurisfacile',
        component: TermoJurisfacileComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Termos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'termo-jurisfacile/:id',
        component: TermoJurisfacileDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Termos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const termoPopupRoute: Routes = [
    {
        path: 'termo-jurisfacile-new',
        component: TermoJurisfacilePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Termos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'termo-jurisfacile/:id/edit',
        component: TermoJurisfacilePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Termos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'termo-jurisfacile/:id/delete',
        component: TermoJurisfacileDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Termos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
