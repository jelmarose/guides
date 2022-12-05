## Deploying Angular app to IIS

1. Create a web.config file in your Angular project in /src folder and paste the following
```
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
      <clear /> <!-- Imperative Step, otherwise IIS will throw err -->
        <rule name="Angular Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```
2. In your angular.json, add the web.config in the build assets
```
{
  "projects": {
    "YourProjectName": {
      ...
      "architect": {
        "build": {
          ...
          "options": {
            ...
            "assets": [
              "src/favicon.ico",
              "src/assets",
              "src/web.config",       // Add web.config here
              {
             ]
```
3. In your package.json, create a new script to run
```
"scripts": {
  ...
  "build-iis": "ng build --configuration=production --base-href /MyApp/",
  ...
 }
```
4. Run the new build script with ```npm run-script build-iis```
5. Copy the build files (located in YourProjectName/dist) in your server.
6. Either create a new website or use the default website, right click and click Add Application, name it MyApp
7. Point the source files to the build files location
8. Start the website and browse
