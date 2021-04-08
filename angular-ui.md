# Angular Flexlayout

One of the most useful layout modules is Flexbox. Since we're working on Angular, one of the libraries we use is [Angular's Flex Layout](https://github.com/angular/flex-layout). 

Here's a litte refresher of what Flexbox can do. Given the following HTML:

```html
  <div class="container">
    <h1>Hello World</h1>
    <button>Log in</button>
  </div>
```

### Align items horizontally in a row

```scss
  .container{
    display: flex;
    flex-direction: row;
    justify-content: flex-start; // Align items to the left (start of the flex box)
    /*
      Other values of justify-content:
      flex-end : Align items to the right (end of the flex box)
      center : Align items to the center
      space-between : Items are evenly distributed, 
          think of most headers where the site's name/logo is 
          on the left side and action buttons are on the right
      space-around : Items are evenly distributed with equal space around them     
    */
  }
```

[Read more about justify-content](https://css-tricks.com/almanac/properties/j/justify-content/)

### Align items vertically in a row

```scss
  .container{
    display: flex;
    flex-direction: row;
    align-items: flex-start; // Align items to the top (start of the flex box)
    /*
      Other values of align-items:
      flex-end : Align items to the bottom (end of the flex box)
      center: Align items to the center
      stretch: Occupy the entire height of the flex box
    */
  }
```

[Read more about align-items](https://css-tricks.com/almanac/properties/a/align-items/)

For a complete guide to flex box, read over at [CSS Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

Now I know I'm oversimplifying it, but unless you're making complicated UI these are usually enough to get the job done.
So where does Angular's Flex Layout library comes in? 
Well, I know it's easy to just declare a class on the base ```styles.css``` and define everything there, but this library makes the flex layout an attribute of HTML.

```html
  <div fxFlex fxLayout="row" fxLayoutAlign="space-between">
    <h1>Hello World</h1>
    <button>Log in</button>
  </div>
```

This is the equivalent of the following CSS:

```scss
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
```

It's much cleaner and less bloat to your style sheets. It didn't really fully clicked on me until I got scolded to not redefine every existing class. 
This adheres to the Don't Repeat Yourself principle, which keeps the code clean and easy to read. 
(Honestly I didn't think it was easier to read at first since I knew so little about UI but that's not a valid excuse now.) 

### Commonly used API

### Parent component
- ``fxLayout``: This is the equivalent of ``flex-direction``.
- ``fxLayoutAlign`` : This can accept two parameters: the first accepts the values of ``justify-content``, the optional second accepts the values of ``align-items`` (although instead of ``flex-start`` and ``flex-end``, just use ``start`` and ``end``). If the layout assigned is row, the first parameter is applied horizontally while the second parameter is applied vertically, and vice versa.
- ``fxLayoutGap`` : Defines the padding between children components. Good for grids, or lists with multiple columns.

### Children component
- ``fxFlex`` : This can accept an optional parameter that translates as the ``max-width`` of the element. If no parameter is assigned, it fills the width of the parent container.
- ``fxFlexOffset`` : Defines the ``margin-left`` of an element.
- ``fxFlexAlign`` : This is the equivalent of ``align-self``.

### More about Angular's Flex Layout library

[Read the docs here](https://github.com/angular/flex-layout/wiki/Declarative-API-Overview)

[View interactive demo here](https://tburleson-layouts-demos.firebaseapp.com/#/docs)


# Overriding Default Designs of Angular Components

Whenever you use a template (like [Material Pro](https://www.wrappixel.com/templates/materialpro/)), existing components are available for a uniformed look all throughout the project. However, these components have default styles that sometimes even using ```!important``` doesn't affect how it looks like. If we want to override these styles, we can use modifiers. 

### ```::ng-deep```

You've probably came across answers on Stack Overflow telling you not to use this since it's depreciated and all. But according to [this post](https://blog.angular-university.io/angular-host-context/) of Angular University (dated April 2020), it's still usable.

Here's an example of a ```<mat-card>``` from the [Material Angular docs](https://material.angular.io/components/card/examples).

```html
  <mat-card class="example-card">
  <mat-card-header>
    <div mat-card-avatar class="example-header-image"></div>
    <mat-card-title>Shiba Inu</mat-card-title>
    <mat-card-subtitle>Dog Breed</mat-card-subtitle>
  </mat-card-header>
  <img mat-card-image src="https://material.angular.io/assets/img/examples/shiba2.jpg" alt="Photo of a Shiba Inu">
  <mat-card-content>
    <p>
      The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.
      A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally
      bred for hunting.
    </p>
  </mat-card-content>
  <mat-card-actions>
    <button mat-button>LIKE</button>
    <button mat-button>SHARE</button>
  </mat-card-actions>
</mat-card>
```

What you don't see is the nested elements and classes these components generate, which you can view using the dev tools.

```html
  <mat-card _ngcontent-ewl-c142="" class="mat-card mat-focus-indicator example-card">
    <mat-card-header _ngcontent-ewl-c142="" class="mat-card-header">
      <div _ngcontent-ewl-c142="" mat-card-avatar="" class="mat-card-avatar example-header-image"></div>
      <div class="mat-card-header-text">
        <mat-card-title _ngcontent-ewl-c142="" class="mat-card-title">Shiba Inu</mat-card-title>
        <mat-card-subtitle _ngcontent-ewl-c142="" class="mat-card-subtitle">Dog Breed</mat-card-subtitle>
      </div>
    </mat-card-header>
    <img _ngcontent-ewl-c142="" mat-card-image="" src="https://material.angular.io/assets/img/examples/shiba2.jpg" alt="Photo of a Shiba Inu" class="mat-card-image">
    <mat-card-content _ngcontent-ewl-c142="" class="mat-card-content">
      <p _ngcontent-ewl-c142=""> The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting. </p>
    </mat-card-content>
    <mat-card-actions _ngcontent-ewl-c142="" class="mat-card-actions">
      <button _ngcontent-ewl-c142="" mat-button="" class="mat-focus-indicator mat-button mat-button-base">
        <span class="mat-button-wrapper">LIKE</span>
        <div matripple="" class="mat-ripple mat-button-ripple"></div>
        <div class="mat-button-focus-overlay"></div>
      </button>
      <button _ngcontent-ewl-c142="" mat-button="" class="mat-focus-indicator mat-button mat-button-base">
        <span class="mat-button-wrapper">SHARE</span>
        <div matripple="" class="mat-ripple mat-button-ripple"></div>
        <div class="mat-button-focus-overlay"></div>
      </button>
    </mat-card-actions>
  </mat-card>
```

Using the dev tools, you can see the default styles of these classes.

```scss
  .mat-card {
    transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
    display: block;
    position: relative;
    padding: 16px;
    border-radius: 4px;
  }
```

So how do you use ```::ng-deep```?

```scss
  ::ng-deep .mat-card{
    padding: 10px;
  }
```

Keep in mind, ```::ng-deep``` affects the rest of the components that has the same class that it modified. For example, let's say you used ```::ng-deep``` to change the style of a dialog box's ```mat-card```. If you close the dialog, the applied style bleeds into all ```mat-card``` in your project. Refreshing the page usually resets the change, but we don't want that.

### ```:host```

Using the ```:host``` modifier with ```::ng-deep``` restricts the style change to the component itself.

```scss
  :host ::ng-deep .mat-card{
    padding: 10px;
  }
```

This is good because if you have multiple ``::ng-deep`` applied, you won't override those designs.

A component with more than one state may require two of these, such as a ``mat-checkbox``.

```scss
// Default state
:host ::ng-deep .mat-checkbox{
  .mat-checkbox-layout {
    // Long labels wrap instead of breaking through the container
    white-space: normal !important; 
  }
}

// Checked state
:host ::ng-deep .mat-checkbox-checked.mat-accent {
  // Change the style of checkbox label when checked
  .mat-checkbox-label {
    color: red !important;
    font-weight: 500 !important;
  }
}
```

### Targeting specific classes

If you set a class for a component, say ``mat-form-field``, you can nest the modifications in one ``::ng-deep``.


```html
  <mat-form-field appearance="fill" class="searchbar">
      ...
  </mat-form-field>
```

```scss
:host ::ng-deep.searchbar{
    /** Change border radius **/
    .mat-form-field-flex {
        border-radius: 25px;
    }
    /** Remove underline **/
    .mat-form-field-underline {
        display: none !important;
    }
}
```

# Responsiveness

### Testing UI with Emulated Devices

Using Chrome's Emulated Devices, you can emulate different screen sizes and test for the responsiveness of your site. 
We mainly use the following screen sizes for testing:

- iPad 768 x 1024
- iPad Pro 1024 x 1366
- 10" Netbook 1024 x 600
- 12" Netbook 1024 x 768
- 13" Netbook 1280 x 800
- 15" Netbook 1366 x 768
- 19" Desktop 1440 x 900
- 22" Desktop 1680 x 1050
- 23" Desktop 1920 x 1080
- 24" Desktop 1920 x 1200

To use these sizes, open the DevTools (Ctrl + Shift + I) then click Toggle Device Toolbar (or Ctrl + Shift + M). 
Click the device dropdown menu on the top of the screen, and select Edit. 
This will open the Emulated Devices menu. Click Add New Device, and add the given screen sizes above.

Make sure to also test on your normal screen but zoomed out and restored down. This can reveal issues that components with ```position: fixed``` presents.

### Media Queries

Media queries are used to present different styles for varying devices. Think of them as the `if` statement of CSS.

The order of media queries matter. If the criteria is met on two separate queries, the last one will be applied. For example:

```css
  @media (min-width: 400px){
    .container { background: red; }
  }
  @media (min-width: 600px){
    .container { background: blue; }
  }
```

If `.container` is 800px wide, the blue background will be applied.

**Design for mobile or desktop first?**

I don't think it matters much, but use whichever you prefer. Our project uses desktop first design, but both have the same principle anyway.

If designing for **mobile first**, queries should go from smallest screen being the default to largest:

```scss
  .container{
    display: flex;
    flex-direction: column;
  }
  
  @media (min-width: 768px){
    .container{
      flex-direction: row;
    }
  }
```

If designing for **desktop first**, queries should go from largest screen being the default to smallest:

```scss
  .container{
    display: flex;
    flex-direction: row;
  }
  
  @media (max-width: 768px){
    .container{
      flex-direction: column;
    }
  }
```

### Using code behind to make responsive components

I use these with Angular's Flex Layout library and some Material Pro components such as grid list. 
For example, we have a grid list that has 2 columns, and we want it to be 1 column when the screen gets smaller.

```html
  <mat-grid-list [cols]="columns" rowHeight="30px" gutterSize="5px" (window:resize)="onResize($event)" >
    ...
  </mat-grid-list>
```

We use the ```cols``` attribute to accept a variable by putting square brackets around it. On the code behind, we define the following:

```typescript
  isMobile:boolean = false;
  columns:number = 2;
  
  ngOnInit(){
    this.checkIfMobile(window.innerWidth);
  }
  
  checkIfMobile(width: number){
    this.isMobile = (width > 1024) ? false : true;
    if(!this.isMobile){
      this.columns = 2;
    }
    else{
      this.columns = 1;
    }
  }
  
  onResize($event){
    this.checkIfMobile(event.target.innerWidth);
  }
```

Now the number of columns change when a screen resize is detected.

### Using Flex Layout's Responsive API

Flex Layout's Responsive API provides breakpoint aliases used with its static API as a shorthand for common media queries.

```
  <api>.<alias> = "<value>"
  [<api>.<alias>] = "<expression>"
```

Example:

```html
  <div fxLayout="row" fxLayout.xs="column">
      <div fxFlex="33" [fxFlex.md]="mobileWidth">
        <h1>Hello World</h1>
        <span fxShow fxHide.xs="true">
            Lorem ipsum dolor sit amet
        </span>
      </div>
  </div>
```

[View all breakpoint aliases](https://github.com/angular/flex-layout/wiki/Responsive-API#mediaqueries-and-aliases)
