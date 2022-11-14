# Angular Spinner - add loading spinner for every HTTP call

[Reference](https://zoaibkhan.com/blog/how-to-add-loading-spinner-in-angular-with-rxjs/)

1. Create a loader service to set the show/hide value of the spinner
```typescript
// Create a new service with ng g s loader
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  constructor() {}

  show() {
    this._loading.next(true);
  }

  hide() {
    this._loading.next(false);
  }
}
```

2. Create an interceptor to intercept all every HTTP call
```typescript
// Create a new interceptor with ng g i loader-interceptor
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  private count = 0;

  constructor(private loaderService: LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.count === 0) {
      this.loaderService.show();
    }
    this.count++;
    return next.handle(req).pipe(
      finalize(() => {
        this.count--;
        if (this.count === 0) {
          this.loaderService.hide();
        }
      }));
  }
}
```

3. Add provider in the app.module.ts
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './loader-interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true } // Add this line
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
4. Add the spinner in the app.component

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'App';

  constructor(
    public loader: LoaderService
  ){ }

  loading$ = this.loader.loading$;
}
```

```html
<!-- app.component.html -->
<app-header></app-header>
<mat-progress-spinner [mode]="'indeterminate'" *ngIf="loading$ | async"></mat-progress-spinner>
<router-outlet></router-outlet>
```

```scss
/** app.component.scss **/
mat-progress-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
}
```
