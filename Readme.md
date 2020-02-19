# Budget App - Progressive Web App

- An Application that allows you to enter deposits and expenses to keep track of your Budget.
- The application is a Progressive Web App and allows the user to install it on Desktop or mobile home screen as a stand alone app, independent of the browser.
- The Service worker file, through a list of "Files to Cache", imediatly caches all static files and intercepts "fetch" requests to be cached as well.
- By doing so it allows for minimum functionality to be available even when the network is down.
- For performance, Webpack was used to bundle all public javascript files and the Compression package as Express middleware.
- For maximum browser compatability I've used Babel.
- The backend makes use of an express server runnig on Node.js, Mongoose Schemas to define the expense and deposit models and a NoSql MongoDB Database.

## Preview

**[View Live Preview](https://pwa-budget-app.herokuapp.com/)**

[![Budget App Preview](http://www.tutorials.yougetitathome.com/6cd7861893cb/Screenshot%2525202020-02-19%25252011.26.36.png)](https://pwa-budget-app.herokuapp.com/)

## Dynamic Expenses Chart

![Budget App Preview](http://www.tutorials.yougetitathome.com/650b9511a07a/Screenshot%2525202020-02-19%25252011.03.28.png)

## Install it as a Desktop App

![Budget App Preview](http://www.tutorials.yougetitathome.com/a6e67b06168a/Screenshot%2525202020-02-19%25252011.08.44.png)
