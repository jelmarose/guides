### Error: bundle initial exceeded maximum budget. Budget 1.00 MB was not met by 219.77 kB with a total of 1.21 MB

1. Go to angular.json and search for the term ``budget``
2. Increase the 
```
"budgets": [
            {
              "type": "initial",
              "maximumWarning": "2mb",
              "maximumError": "1mb" <== increase this to 5mb temporarily
            },
            ]
```
