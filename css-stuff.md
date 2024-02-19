### zoom and darken on hover
```html
<img src="https://placehold.co/600x400.png" />
```

```css
img{

  transition: transform 1s;
}

img:hover{
  transform: scale(1.5);
  filter: brightness(50%);
}

```
