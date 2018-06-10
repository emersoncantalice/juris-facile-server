import { BaseEntity } from './../../shared';

export class CursoJurisfacile implements BaseEntity {
    constructor(
        public id?: number,
        public titulo?: string,
        public url?: string,
        public disciplinas?: BaseEntity[],
    ) {
    }
}
