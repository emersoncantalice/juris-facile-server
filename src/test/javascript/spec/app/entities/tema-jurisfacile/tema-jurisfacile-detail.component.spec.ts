/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JurisfacileTestModule } from '../../../test.module';
import { TemaJurisfacileDetailComponent } from '../../../../../../main/webapp/app/entities/tema-jurisfacile/tema-jurisfacile-detail.component';
import { TemaJurisfacileService } from '../../../../../../main/webapp/app/entities/tema-jurisfacile/tema-jurisfacile.service';
import { TemaJurisfacile } from '../../../../../../main/webapp/app/entities/tema-jurisfacile/tema-jurisfacile.model';

describe('Component Tests', () => {

    describe('TemaJurisfacile Management Detail Component', () => {
        let comp: TemaJurisfacileDetailComponent;
        let fixture: ComponentFixture<TemaJurisfacileDetailComponent>;
        let service: TemaJurisfacileService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JurisfacileTestModule],
                declarations: [TemaJurisfacileDetailComponent],
                providers: [
                    TemaJurisfacileService
                ]
            })
            .overrideTemplate(TemaJurisfacileDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TemaJurisfacileDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TemaJurisfacileService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TemaJurisfacile(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tema).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
