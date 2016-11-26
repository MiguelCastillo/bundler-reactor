# bundler-reactor
> bit-bundler boilerplate setup for react apps.

This gives you a good starting point with tools and default settings optimized for building applications with [react](https://facebook.github.io/react/). The underlying setup relies on modularized [Grunt](http://gruntjs.com/) tasks that lend themselves well for enhancing the default configuration; this whole boilerplate setup is meant to be built upon and enhanced.

The setup provides you with:

- [dev server](https://github.com/gruntjs/grunt-contrib-connect)
  - Configured with Single Page in mind with [browser history](https://github.com/bripkens/connect-history-api-fallback) enabled.
- [bit-bundler](https://github.com/MiguelCastillo/bit-bundler)
  - Code splitting of third party libraries
  - ESLint integration
  - File watching
- [react](https://facebook.github.io/react/) with JSX support


# usage

You get a few `npm` tasks to facilate the development and generating production builds.


## quick install and setup

Install `bundler-reactor` cli:

```
$ npm install -g bundler-reactor
```

Configure a new application

```
$ bundler-reactor sample-app
$ cd sample-app
$ npm install
```

## npm start

Start the dev server:

```
$ npm start
```


## npm run build

To create a production build:

```
$ npm run build
```


# grunt tasks

Internally, `bundler-reactor` uses [Grunt](http://gruntjs.com/) to manage tasks. The relevant tasks are exposed as npm scripts as well for convenience. All the tasks are available in the [tasks](https://github.com/MiguelCastillo/bundler-reactor/tree/master/template/tasks) folder where you will find tasks such as `bitbundler` and `connect`. Do feel free to modify these tasks to enhance you base setup. For example, if you need to add JS decorators support you can enhance the `bitbundler` task to do so.

