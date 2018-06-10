import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TemaJurisfacileComponent } from './tema-jurisfacile.component';
import { TemaJurisfacileDetailComponent } from './tema-jurisfacile-detail.component';
import { TemaJurisfacilePopupComponent } from './tema-jurisfacile-dialog.component';
import { TemaJurisfacileDeletePopupComponent } from './tema-jurisfacile-delete-dialog.component';

export const temaRoute: Routes = [
    {
        path: 'tema-jurisfacile',
        component: TemaJurisfacileComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Temas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tema-jurisfacile/:id',
        component: TemaJurisfacileDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Temas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const temaPopupRoute: Routes = [
    {
        path: 'tema-jurisfacile-new',
        component: TemaJurisfacilePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Temas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tema-jurisfacile/:id/edit',
        component: TemaJurisfacilePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Temas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tema-jurisfacile/:id/delete',
        component: TemaJurisfacileDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Temas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
