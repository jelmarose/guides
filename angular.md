### Faster build in Angular

In `package.json`, inside the `scripts` object, replace or add the command for `start` with this:

```"start": "node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng serve -o --source-map=false",```
