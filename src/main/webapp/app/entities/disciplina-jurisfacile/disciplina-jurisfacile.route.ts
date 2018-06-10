import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DisciplinaJurisfacileComponent } from './disciplina-jurisfacile.component';
import { DisciplinaJurisfacileDetailComponent } from './disciplina-jurisfacile-detail.component';
import { DisciplinaJurisfacilePopupComponent } from './disciplina-jurisfacile-dialog.component';
import { DisciplinaJurisfacileDeletePopupComponent } from './disciplina-jurisfacile-delete-dialog.component';

export const disciplinaRoute: Routes = [
    {
        path: 'disciplina-jurisfacile',
        component: DisciplinaJurisfacileComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Disciplinas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'disciplina-jurisfacile/:id',
        component: DisciplinaJurisfacileDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Disciplinas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const disciplinaPopupRoute: Routes = [
    {
        path: 'disciplina-jurisfacile-new',
        component: DisciplinaJurisfacilePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Disciplinas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'disciplina-jurisfacile/:id/edit',
        component: DisciplinaJurisfacilePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Disciplinas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'disciplina-jurisfacile/:id/delete',
        component: DisciplinaJurisfacileDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Disciplinas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
