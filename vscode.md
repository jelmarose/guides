
### ng.ps1 cannot be loaded because running scripts is disabled on this system.
### C:\Program Files\nodejs\npm.ps1 cannot be loaded. The file C:\Program Files\nodejs\npm.ps1 is not digitally signed.

Run Windows Powershell in as Administrator. Then execute `set-executionpolicy remotesigned` and select Yes.

[Reference](https://stackoverflow.com/questions/54820233/unable-to-execute-angular-cli-commands-in-visual-studio-code-terminal)
