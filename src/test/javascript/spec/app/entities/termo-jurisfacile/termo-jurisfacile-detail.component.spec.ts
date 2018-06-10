/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JurisfacileTestModule } from '../../../test.module';
import { TermoJurisfacileDetailComponent } from '../../../../../../main/webapp/app/entities/termo-jurisfacile/termo-jurisfacile-detail.component';
import { TermoJurisfacileService } from '../../../../../../main/webapp/app/entities/termo-jurisfacile/termo-jurisfacile.service';
import { TermoJurisfacile } from '../../../../../../main/webapp/app/entities/termo-jurisfacile/termo-jurisfacile.model';

describe('Component Tests', () => {

    describe('TermoJurisfacile Management Detail Component', () => {
        let comp: TermoJurisfacileDetailComponent;
        let fixture: ComponentFixture<TermoJurisfacileDetailComponent>;
        let service: TermoJurisfacileService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JurisfacileTestModule],
                declarations: [TermoJurisfacileDetailComponent],
                providers: [
                    TermoJurisfacileService
                ]
            })
            .overrideTemplate(TermoJurisfacileDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TermoJurisfacileDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TermoJurisfacileService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TermoJurisfacile(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.termo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
