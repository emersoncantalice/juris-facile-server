import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JurisfacileSharedModule } from '../../shared';
import {
    TemaJurisfacileService,
    TemaJurisfacilePopupService,
    TemaJurisfacileComponent,
    TemaJurisfacileDetailComponent,
    TemaJurisfacileDialogComponent,
    TemaJurisfacilePopupComponent,
    TemaJurisfacileDeletePopupComponent,
    TemaJurisfacileDeleteDialogComponent,
    temaRoute,
    temaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...temaRoute,
    ...temaPopupRoute,
];

@NgModule({
    imports: [
        JurisfacileSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TemaJurisfacileComponent,
        TemaJurisfacileDetailComponent,
        TemaJurisfacileDialogComponent,
        TemaJurisfacileDeleteDialogComponent,
        TemaJurisfacilePopupComponent,
        TemaJurisfacileDeletePopupComponent,
    ],
    entryComponents: [
        TemaJurisfacileComponent,
        TemaJurisfacileDialogComponent,
        TemaJurisfacilePopupComponent,
        TemaJurisfacileDeleteDialogComponent,
        TemaJurisfacileDeletePopupComponent,
    ],
    providers: [
        TemaJurisfacileService,
        TemaJurisfacilePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JurisfacileTemaJurisfacileModule {}
