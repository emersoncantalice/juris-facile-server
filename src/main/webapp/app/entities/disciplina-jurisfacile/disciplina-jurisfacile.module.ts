import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JurisfacileSharedModule } from '../../shared';
import {
    DisciplinaJurisfacileService,
    DisciplinaJurisfacilePopupService,
    DisciplinaJurisfacileComponent,
    DisciplinaJurisfacileDetailComponent,
    DisciplinaJurisfacileDialogComponent,
    DisciplinaJurisfacilePopupComponent,
    DisciplinaJurisfacileDeletePopupComponent,
    DisciplinaJurisfacileDeleteDialogComponent,
    disciplinaRoute,
    disciplinaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...disciplinaRoute,
    ...disciplinaPopupRoute,
];

@NgModule({
    imports: [
        JurisfacileSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DisciplinaJurisfacileComponent,
        DisciplinaJurisfacileDetailComponent,
        DisciplinaJurisfacileDialogComponent,
        DisciplinaJurisfacileDeleteDialogComponent,
        DisciplinaJurisfacilePopupComponent,
        DisciplinaJurisfacileDeletePopupComponent,
    ],
    entryComponents: [
        DisciplinaJurisfacileComponent,
        DisciplinaJurisfacileDialogComponent,
        DisciplinaJurisfacilePopupComponent,
        DisciplinaJurisfacileDeleteDialogComponent,
        DisciplinaJurisfacileDeletePopupComponent,
    ],
    providers: [
        DisciplinaJurisfacileService,
        DisciplinaJurisfacilePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JurisfacileDisciplinaJurisfacileModule {}
