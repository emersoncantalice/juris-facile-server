import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JurisfacileSharedModule } from '../../shared';
import {
    CursoJurisfacileService,
    CursoJurisfacilePopupService,
    CursoJurisfacileComponent,
    CursoJurisfacileDetailComponent,
    CursoJurisfacileDialogComponent,
    CursoJurisfacilePopupComponent,
    CursoJurisfacileDeletePopupComponent,
    CursoJurisfacileDeleteDialogComponent,
    cursoRoute,
    cursoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cursoRoute,
    ...cursoPopupRoute,
];

@NgModule({
    imports: [
        JurisfacileSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CursoJurisfacileComponent,
        CursoJurisfacileDetailComponent,
        CursoJurisfacileDialogComponent,
        CursoJurisfacileDeleteDialogComponent,
        CursoJurisfacilePopupComponent,
        CursoJurisfacileDeletePopupComponent,
    ],
    entryComponents: [
        CursoJurisfacileComponent,
        CursoJurisfacileDialogComponent,
        CursoJurisfacilePopupComponent,
        CursoJurisfacileDeleteDialogComponent,
        CursoJurisfacileDeletePopupComponent,
    ],
    providers: [
        CursoJurisfacileService,
        CursoJurisfacilePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JurisfacileCursoJurisfacileModule {}
