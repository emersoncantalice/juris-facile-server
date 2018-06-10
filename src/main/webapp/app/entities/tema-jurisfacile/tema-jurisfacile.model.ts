import { BaseEntity } from './../../shared';

export class TemaJurisfacile implements BaseEntity {
    constructor(
        public id?: number,
        public titulo?: string,
        public termos?: BaseEntity[],
        public disciplinas?: BaseEntity[],
    ) {
    }
}
