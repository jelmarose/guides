### Hosting Angular on ngrok

1. Go to angular.json > projects > your project name > architect > serve > options
2. Paste the following in options: (**Note that this should not be used in production, only in testing.**)
```
"disableHostCheck": true
```

3. Run ```npm start```
4. Change your browser's user agent: [How to change your user agent in Firefox](https://www.whatismybrowser.com/guides/how-to-change-your-user-agent/firefox), [ How to Change User-Agent in Chrome, Firefox, Safari, and more ](https://geekflare.com/change-user-agent-in-browser/). Make sure to revert this after testing as it breaks sites like gmail and gdocs.
5. Open ngrok and type ```ngrok http http://localhost:<port where angular is served, usually 4200>```
6. Go to ```http://127.0.0.1:4040/inspect/http``` after ngrok successfully serves your project and check for acctivity
