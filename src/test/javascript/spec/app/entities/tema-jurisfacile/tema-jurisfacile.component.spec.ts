/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JurisfacileTestModule } from '../../../test.module';
import { TemaJurisfacileComponent } from '../../../../../../main/webapp/app/entities/tema-jurisfacile/tema-jurisfacile.component';
import { TemaJurisfacileService } from '../../../../../../main/webapp/app/entities/tema-jurisfacile/tema-jurisfacile.service';
import { TemaJurisfacile } from '../../../../../../main/webapp/app/entities/tema-jurisfacile/tema-jurisfacile.model';

describe('Component Tests', () => {

    describe('TemaJurisfacile Management Component', () => {
        let comp: TemaJurisfacileComponent;
        let fixture: ComponentFixture<TemaJurisfacileComponent>;
        let service: TemaJurisfacileService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JurisfacileTestModule],
                declarations: [TemaJurisfacileComponent],
                providers: [
                    TemaJurisfacileService
                ]
            })
            .overrideTemplate(TemaJurisfacileComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TemaJurisfacileComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TemaJurisfacileService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TemaJurisfacile(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.temas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
