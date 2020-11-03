### This is the third part of [open full stack repo](https://github.com/qbosen/openfullstack2020)


## Content
```
// config hot reload
npm install --save-dev nodemon
  
// ..
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
// ..
```
## 3.9
```
Cross-origin resource sharing (CORS)
start part2/phonebook project. get resource from port:3000 to port:3001.
Access to XMLHttpRequest at 'http://localhost:3001/persons' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```
* add `cors` middle ware

## deploy application

1. sign up heroku
2. install `brew install heroku/brew/heroku`
3. [how to deploy heroku](https://devcenter.heroku.com/articles/preparing-a-codebase-for-heroku-deployment)
    1. `heroku create` login and create heroku app
    2. `git remote -v` confirm remote
    3. `git push heroku master` deploy code
    4. `heroku logs -t` get logs
4. heroku online app link (https://afternoon-beyond-12909.herokuapp.com/) [Test api](https://afternoon-beyond-12909.herokuapp.com/api/persons)