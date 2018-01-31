# Twelve Factor Fun

1.31.2018

A simple application using docker and Node to demonstrate the theory of an application built using the twelve factor design methodology


## Factor 1 : Proper Version Control using git

In order to maximize the utility of git for versioning control we should consider a few points about how to best utilize git for iterative releases. The premise of this is based on the use of 
two primary branches coming from the master, one used for our standard iterative development upates and the second used for hot-fixes and emergency changes to the production code. 

This approach greatly helps in simplifying the development process as we work with larger teams
and our codebases grow in size and complexity. 
### Development

We begin by checking out our new development branch

```
git checkout -b develop 
```

And from this branch we add specific features which will be then merged back into the development branch when we are ready.

``` 
git checkout -b feature/foo develop
echo "console.log('foo');" > foo.js
git commit -m "new foo"

...

git checkout -b feature/bar develop
echo "console.log('bar');" > bar.js
git commit -m "new bar"

```

 Here is where you would normally do your pull request for code review
 for brevity we will simply merge back into the develop branch

```
git checkout develop
git merge feature/bar
git push
git log

...

git checkout develop
git merge feature/foo
git push
git log 
```

We may need to review the logs in each branch in order to ensure
the merges have taken place as expected. We will go ahead and rebase in 
order to ensure our branches are at the same working point

```
git rebase develop
```
### Release Updates/Hot-fixes
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

## Factor 2 : Nailing down package versions

If you are anything like me, then you have probably run into an issue where you have an old project you want 
to get up and running only to be stymied by a long list of ERR messages when you attempt to execute your dev server. 
Using exact versioning can help you save yourself or your coworkers some future headaches. 
Depending on which package manager you are using there are multiple ways to do this. If your are into yarn, 
you can specify library versions via 

```
    yarn add react@^15.0
    # or if your like me and have started to run into naming issues between hadoop and js versions of yarn :-|
    yarnpkg add react@^15.0
```

For npm we use 

```
    npm install react@^15.0 --save
```

## Factor 3 : 

Configuring variables into a separate file is a great way to increase the portability of your application as it 
gives you a single location which you can find the most relevant variables/strings/error messages in your application
and quickly swap them out. This improves the overall structuring of our applications as it allows us to rely more on the 
use of portable variables than hardcoded strings. 

The npm package dotenv is a great way for managing variables which may need to be imported into your node application. 
```
    yarnpkg add dotenv
    echo "MONGO_URI=mongodb://localhost:27017/foo" > .env
```
Checkout index.js on the factor3 branch for the working code.

## Factor 4 : 

The use of a proxy allows us to maximize the use of resources across geographies through the use of CDNs and the like. Here we have a very basic example in which we utilize proxies in order to maximize the availability of resources.

```
    yarn add express express-http-proxy
    mkdir public public/images
    wget "http://i.imgur.com/XvOd6Ym.jpg" -O public/images/piratecat.jpg 
    echo "BASE_IMAGE_URL=http://i.imgur.com/XvOd6Ym.jpg" >> .env
```
Here we go for the cdn if available, otherwise we default to the instance local to the server.
Check out index.js under the Factor4 comment or the factor4 branch for the working code







