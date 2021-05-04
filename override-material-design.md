
### ``mat-menu``

html
```html
<!-- for some reason the docs says 'panelClass' as input but 'class' property is the one that works -->
<mat-menu class="custom-menu"></mat-menu>
```

scss
```scss
// the style is applied to .mat-menu-panel
::ng-deep.custom-menu{
  background-color: blue;
  min-width: 500px !important;
}
```
