import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from '../../core/request/request-util';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { EventManager } from '../../core/util/event-manager.service';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { DATE_FORMAT } from '../../config/input.constants';
import * as moment from 'moment';

type EntityResponseType = HttpResponse<object>;
type EntityArrayResponseType = HttpResponse<object[]>;

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  isEquivalentArray(a: any, b: any) {
    if ((!a && b) || (a && !b)) {
      return false;
    }
    if (!a && !b) {
      return true;
    }
    if (a && b && a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (!this.isEquivalent(a[i], b[i])) {
        return false;
      }
    }

    return true;
  }

  isEquivalent(a: any, b: any) {
    // Create arrays of property names
    if (!a || !b) {
      return false;
    }
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length !== bProps.length) {
      return false;
    }

    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i];

      // Trường hợp 2 trường cần so sánh là ngày tháng
      if (a[propName] instanceof moment && b[propName] instanceof moment) {
        if (!a[propName].format(DATE_FORMAT) === a[propName].format(DATE_FORMAT)) {
          return false;
        }
        continue;
      }

      // Trường hợp 2 trường cần so sánh là object
      if (a[propName] instanceof Object && b[propName] instanceof Object) {
        if (!this.isEquivalent(a[propName], b[propName])) {
          return false;
        }
        continue;
      }

      // If values of same property are not equal,
      // objects are not equivalent
      if ((a[propName] || b[propName]) && a[propName] !== b[propName]) {
        return false;
      }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
  }
}
