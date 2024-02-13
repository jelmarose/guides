### Generate module with routing

```ng g m [module-name] --routing```

### Generate module with routing and automatically add lazy loading to app.module

```ng g m [module-name] --route [module-name] --module app.module```

### Loading component vs module as route
```typescript
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'module',
    loadChildren: () => import('./some-module/some.module').then(m => m.SomeModule)
  }
]
```
