# Twelve Factor Fun

1.31.2018

A simple application using docker and Node to demonstrate the theory of an application built using the twelve factor design methodology


## Factor 1 --> Proper Version Control using git

In order to maximize the utility of git for versioning control we should consider a few points about how to best utilize git for iterative releases

Consider the creation of a branch specifically for development
```
git checkout develop 
```

And from this branch adding specific features which will be then merged back into the development branch.

``` 
git checkout -b feature/foo develop
echo "console.log('foo');" > foo.js
git commit -m "new foo"

git checkout -b feature/bar develop
echo "console.log('bar');" > bar.js
git commit -m "new bar"

git checkout develop

# Here is where you would normally do your pull request for code review
# for brevity we will simply merge back into the develop branch
git merge feature/bar
git merge feature/foo

git checkout develop
git push

# We may need to review the logs in each branch in order to ensure
# the merges have taken place as expected. We will go ahead and rebase in 
# order to ensure our branches are at the same working point
git rebase develop
```

### Preparing for release updates
From the development branch we can prepare for release updates as follows

```
    git checkout -b release/1.0 develop
```

We then can push the updates to the correct branch in the remote repo so that it will be staged for testing. Any updates required in order to pass QA can also be done at this point, with commits being made back to the same release branch with the commits being pushed upstream.

```
    git push -u origin release/1.0
    git commit -am "some modifications were made"
    git push
```

Now that our release branch is sufficient to pass QA, we need to update our development and master branches in order to ensure that we are working with the most recent passing versions of the code on all fronts.

```
    git checkout develop
    git merge release/1.0
    git push
```

When merging into the master branch we must ensure that the code is passing all required QA before it is merged, as the master is the mainline for our production. 

```
    git checkout master
    git merge release/1.0
    git push
    git tag v1.0.0              # Generate the tag
    git push origin v1.0.0      # push the most recent tag into production
```

In the event that some emergency arises and we need to do a quick fix to our production code, we should use hotfix branches in order to correct the production code. Hotfixes are the only branches besides the development branch which should be committing to the master.

```
    git checkout -b hotfix/fix-bar master
    echo "console.log('this is the true bar');" > bar.js
    git commit -am "Now have the one true bar"
    git checkout master
    git merge hotfix/fix-bar
    git push
    git tag v1.0.1
    git push origin v1.0.1
```

We must be sure to merge hotfixes back to the development branch as well

```
    git checkout develop
    git merge hotfix/fix-bar
    git push
```

After completing all merges we should go back and clean up our working tree by removing any irrelevant/dead branches

```
    git branch -d feature/foo
    git branch -d feature/bar
    git branch -d hotfix/fix-bar
    git branch
```










