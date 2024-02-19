```typescript
import { Component, Input, HostListener } from '@angular/core';

...

@HostListener('window:scroll', ['$event'])
  onScroll(event: any){
    if (event.target.scrollingElement.offsetHeight + event.target.scrollingElement.scrollTop >= event.target.scrollingElement.scrollHeight - 1) {
      console.log("scrolled to bottom");
    }
  }

```
