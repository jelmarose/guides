### Adding a debounce in an input

**HTML**

```html
<input [(ngModel)]="searchControl" name="searchControl" (ngModelChange)="this.searchControlTracker.next($event)" />
```

**TS**
```typescript
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

searchControl:string = "";
searchControlTracker: Subject<string> = new Subject<string>();

constructor(){
  this.searchControlTracker.pipe(
    debounceTime(400), 
    distinctUntilChanged())
    .subscribe(value => {
      console.log("input value", value);
  });
}

```
