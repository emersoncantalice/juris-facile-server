/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JurisfacileTestModule } from '../../../test.module';
import { TermoJurisfacileComponent } from '../../../../../../main/webapp/app/entities/termo-jurisfacile/termo-jurisfacile.component';
import { TermoJurisfacileService } from '../../../../../../main/webapp/app/entities/termo-jurisfacile/termo-jurisfacile.service';
import { TermoJurisfacile } from '../../../../../../main/webapp/app/entities/termo-jurisfacile/termo-jurisfacile.model';

describe('Component Tests', () => {

    describe('TermoJurisfacile Management Component', () => {
        let comp: TermoJurisfacileComponent;
        let fixture: ComponentFixture<TermoJurisfacileComponent>;
        let service: TermoJurisfacileService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JurisfacileTestModule],
                declarations: [TermoJurisfacileComponent],
                providers: [
                    TermoJurisfacileService
                ]
            })
            .overrideTemplate(TermoJurisfacileComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TermoJurisfacileComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TermoJurisfacileService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TermoJurisfacile(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.termos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
