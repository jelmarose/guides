{
  "name": "project-name",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve -o --proxy-config src/proxy.conf.json",
    "build": "ng build",
    "build-dev": "ng build --watch",
    "build-staging": "ng build --configuration development --base-href /",
    "build-prod": "ng build --configuration=production --base-href /",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "^14.2.0",
    "@angular/cdk": "^14.2.4",
    "@angular/common": "^14.2.0",
    "@angular/compiler": "^14.2.0",
    "@angular/core": "^14.2.0",
    "@angular/flex-layout": "^14.0.0-beta.40",
    "@angular/forms": "^14.2.0",
    "@angular/material": "^14.2.4",
    "@angular/platform-browser": "^14.2.0",
    "@angular/platform-browser-dynamic": "^14.2.0",
    "@angular/router": "^14.2.0",
    "@ngrx/store": "^14.3.2",
    "jwt-decode": "^3.1.2",
    "rxjs": "6.5.3",
    "rxjs-compat": "^6.6.7",
    "zone.js": "~0.11.4"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^14.2.5",
    "@angular/cli": "~14.2.5",
    "@angular/compiler-cli": "^14.2.0",
    "@types/jasmine": "~4.0.0",
    "jasmine-core": "~4.3.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.1.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.0.0",
    "tslib": "^2.4.1",
    "typescript": "~4.7.2"
  }
}
