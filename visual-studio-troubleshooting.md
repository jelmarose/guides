### Clean Solution fails

1. Run on cmd: ``dotnet --list-sdks`` then take note of the largest number of version.
2. Open the ``global.json`` file on the same folder as the .sln and change sdk version to the same number from step 1.
3. Restart Visual Studio.

### Unable to load the service index for source https://dotnet.myget.org/F/aspnet-feb2017-patch/api/v3/index.json

1. Right click solution > Manage NuGet packages for solution
2. Click the gear icon beside the Package Source dropdown (top right side)
3. On the Package Sources list, uncheck the source with the url https://dotnet.myget.org/F/aspnet-feb2017-patch/api/v3/index.json (in this case it's the AspNetCore)
4. Click Ok and restart Visual Studio
