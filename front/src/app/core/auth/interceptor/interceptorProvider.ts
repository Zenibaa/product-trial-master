import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {authInterceptor} from "./auth.interceptor";

export const APP_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: authInterceptor,
  multi: true
};
