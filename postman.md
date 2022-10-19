### Save authentication token

Assuming the login return is the following:
```
{
  "access_token": "bearer_token_here"
}
```

On the login request, under the Tests tab, paste the following:
```
var res = pm.response.json();
pm.environment.set('token', res.access_token);
```

On the requests that requires a bearer token, under the Authorization tab, set the Type to Bearer token and set the Token value to:

```Bearer {{token}}```
