```scss
$purple: #4f2d7f;
$violet: #9581b2;
$teal: #6dbfb8;
$gray: #404040;
$gray2: #bdbdbd;
$lightgray: #eaeaea;
$black: #000000;
$white: #ffffff;
$red: #de002e;
$lime: #a8d552;

$colors: (
    "purple":#4f2d7f,
    "violet": #9581b2,
    "teal": #6dbfb8,
    "gray": #404040,
    "gray2": #bdbdbd,
    "black": #000,
    "white": #fff,
    "red": #de002e,
    "lightgray": #eaeaea,
    "lime": #a8d552
);

@each $name, $hex in $colors {
    .text-#{$name} {
      color: $hex;
    }
}

@each $name, $hex in $colors {
    .bg-#{$name} {
      background-color: $hex !important;
    }
}

@each $name, $hex in $colors {
  .border-#{$name} {
    border: $hex 1px solid !important;
  }
}

$weights: 500, 600, 700, 800;

@each $weight in $weights {
  .fw-#{$weight} {
    font-weight: $weight !important;
  }
}

$sizes: 8, 10, 11, 12, 14, 16, 18, 20, 22, 24;

@each $size in $sizes {
  .fs-#{$size} {
    font-size: #{$size}pt;
  }
}

.fw-bold{
  font-family: GT-Walsheim-Bold;
}

.text-center{
  text-align: center;
}

$spaces: 2, 4, 5, 6, 8, 10, 50;

@each $space in $spaces {
  .m-#{$space}p {
    margin: #{$space}#{"%"};
  }
}

@each $space in $spaces {
  .mt-#{$space}p {
    margin-top: #{$space}#{"%"};
  }
}

@each $space in $spaces {
  .p-#{$space}p {
    padding: #{$space}#{"%"};
  }
}


// Tailwind-esque CSS

.flex{
    display: flex;
}

.flex-row{
    flex-direction: row;
}

.flex-row-reverse{
    flex-direction: row-reverse;
}

.flex-col{
    flex-direction: column;
}

.flex-col-reverse{
    flex-direction: column-reverse;
}

.flex-wrap{
    flex-wrap: wrap;
}

.flex-wrap-reverse{
    flex-wrap: wrap-reverse;
}

.flex-nowrap{
    flex-wrap: nowrap;
}

.gap-10px{
    gap: 10px;
}


```
