import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JurisfacileCursoJurisfacileModule } from './curso-jurisfacile/curso-jurisfacile.module';
import { JurisfacileDisciplinaJurisfacileModule } from './disciplina-jurisfacile/disciplina-jurisfacile.module';
import { JurisfacileTemaJurisfacileModule } from './tema-jurisfacile/tema-jurisfacile.module';
import { JurisfacileTermoJurisfacileModule } from './termo-jurisfacile/termo-jurisfacile.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JurisfacileCursoJurisfacileModule,
        JurisfacileDisciplinaJurisfacileModule,
        JurisfacileTemaJurisfacileModule,
        JurisfacileTermoJurisfacileModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JurisfacileEntityModule {}
