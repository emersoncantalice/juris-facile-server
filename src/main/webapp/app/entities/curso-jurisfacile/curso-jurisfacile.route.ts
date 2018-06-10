import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CursoJurisfacileComponent } from './curso-jurisfacile.component';
import { CursoJurisfacileDetailComponent } from './curso-jurisfacile-detail.component';
import { CursoJurisfacilePopupComponent } from './curso-jurisfacile-dialog.component';
import { CursoJurisfacileDeletePopupComponent } from './curso-jurisfacile-delete-dialog.component';

export const cursoRoute: Routes = [
    {
        path: 'curso-jurisfacile',
        component: CursoJurisfacileComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cursos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'curso-jurisfacile/:id',
        component: CursoJurisfacileDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cursos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cursoPopupRoute: Routes = [
    {
        path: 'curso-jurisfacile-new',
        component: CursoJurisfacilePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cursos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'curso-jurisfacile/:id/edit',
        component: CursoJurisfacilePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cursos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'curso-jurisfacile/:id/delete',
        component: CursoJurisfacileDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cursos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
