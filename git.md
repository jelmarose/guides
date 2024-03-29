``git reset --hard`` - undo everything on last commit, delete all new files

``git reset --soft <hash>`` - undo everything on last commit, retain new files as unstaged


---


Git global setup
```
git config --global user.name "Your Name"
git config --global user.email "you@email.com"
```

Create a new repository
```
git clone <link>
cd Alumni
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master
```

Push an existing folder
```
cd existing_folder
git init
git remote add origin <link>
git add .
git commit -m "Initial commit"
git push -u origin master
```

Push an existing Git repository
```
cd existing_repo
git remote rename origin old-origin
git remote add origin <link>
git push -u origin --all
git push -u origin --tags
```
-------------------------
Set git trace to verbose
```set GIT_CURL_VERBOSE=1 set GIT_TRACE=1 ```

---------------------------------
Get all branches with latest commits
```git branch -v --sort=committerdate```

To include remote branches:
```git branch -av --sort=committerdate```
