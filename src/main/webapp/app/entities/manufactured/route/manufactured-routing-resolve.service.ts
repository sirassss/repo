import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IManufactured, Manufactured } from '../manufactured.model';
import { ManufacturedService } from '../service/manufactured.service';

@Injectable({ providedIn: 'root' })
export class ManufacturedRoutingResolveService implements Resolve<IManufactured> {
  constructor(protected service: ManufacturedService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IManufactured> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((manufactured: HttpResponse<Manufactured>) => {
          if (manufactured.body) {
            return of(manufactured.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Manufactured());
  }
}
