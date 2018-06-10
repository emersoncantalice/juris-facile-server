import { BaseEntity } from './../../shared';

export class DisciplinaJurisfacile implements BaseEntity {
    constructor(
        public id?: number,
        public titulo?: string,
        public temas?: BaseEntity[],
        public cursos?: BaseEntity[],
    ) {
    }
}
