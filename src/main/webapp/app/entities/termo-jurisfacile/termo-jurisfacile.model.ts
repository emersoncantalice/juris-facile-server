import { BaseEntity } from './../../shared';

export class TermoJurisfacile implements BaseEntity {
    constructor(
        public id?: number,
        public titulo?: string,
        public texto?: any,
        public tema?: BaseEntity,
    ) {
    }
}
