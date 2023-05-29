## Infinite Loading for Search Results

HTML
```
<div fxLayout="row" fxLayoutGap="10px" *ngFor="let item of searchResults">
  <span>{{item.name}}</span>
  <span>{{item.age}}</span>
</div>
```

TS
```typescript
import { Component, HostListener, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(
      private service: AppService // your api service
    ){
    }

    searchResults: ISearchResult[] = [];

    ngOnInit(){
      this.getSearchResults();
    }

    getSearchResults(){
      // call api
      this.service.getSearchResults().subscribed((res: ISearchResult[]) => {
        res.forEach(item => {
          this.searchResults.push(item);
        });
      });
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event: any){
      if (event.target.scrollingElement.offsetHeight + event.target.scrollingElement.scrollTop >= event.target.scrollingElement.scrollHeight - 1) {
        // once user scrolled to the bottom, call the api again
        this.getSearchResults();
      }
    }
}

export interface ISearchResult{
  name: string;
  age: number;
}
```
