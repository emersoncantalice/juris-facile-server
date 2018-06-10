import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JurisfacileSharedModule } from '../../shared';
import {
    TermoJurisfacileService,
    TermoJurisfacilePopupService,
    TermoJurisfacileComponent,
    TermoJurisfacileDetailComponent,
    TermoJurisfacileDialogComponent,
    TermoJurisfacilePopupComponent,
    TermoJurisfacileDeletePopupComponent,
    TermoJurisfacileDeleteDialogComponent,
    termoRoute,
    termoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...termoRoute,
    ...termoPopupRoute,
];

@NgModule({
    imports: [
        JurisfacileSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TermoJurisfacileComponent,
        TermoJurisfacileDetailComponent,
        TermoJurisfacileDialogComponent,
        TermoJurisfacileDeleteDialogComponent,
        TermoJurisfacilePopupComponent,
        TermoJurisfacileDeletePopupComponent,
    ],
    entryComponents: [
        TermoJurisfacileComponent,
        TermoJurisfacileDialogComponent,
        TermoJurisfacilePopupComponent,
        TermoJurisfacileDeleteDialogComponent,
        TermoJurisfacileDeletePopupComponent,
    ],
    providers: [
        TermoJurisfacileService,
        TermoJurisfacilePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JurisfacileTermoJurisfacileModule {}
