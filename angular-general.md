### Faster build in Angular

In `package.json`, inside the `scripts` object, replace or add the command for `start` with this:

```"start": "node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng serve -o --source-map=false",```

Trade off is that you can't debug on the browser.

### Add new component in a folder with two modules

```ng g c <new component name> --module <name of module>```

### Remove ```experimentalDecorators``` warning

On the ``tsconfig.app.json`` add ``experimentalDecorator: true`` on the ``compilerOptions``

```json
"compilerOptions": {
    "skipLibCheck": true,
    "experimentalDecorators": true
  },

```

Restart your code editor.

If you're using VS Code, go to File > Preferences > Settings. Search for ``experimental`` and check the box of **JS/TS > Implicit Project Config: Experimental Decorators**