# bundler-reactor
> bit-bundler boilerplate setup for react apps.

This gives you a good starting point with tools and default settings optimized for building applications with [react](https://facebook.github.io/react/). The underlying setup relies on modularized [Grunt](http://gruntjs.com/) tasks that lend themselves well for enhancing the default configuration; this whole boilerplate setup is meant to be built upon and enhanced.

The setup provides you with:

- [dev server](https://github.com/gruntjs/grunt-contrib-connect)
  - Configured with Single Page in mind with [browser history](https://github.com/bripkens/connect-history-api-fallback) enabled.
- [bit-bundler](https://github.com/MiguelCastillo/bit-bundler)
  - Code splitting of third party libraries
  - ESLint integration
  - Babel interation
  - File watching and Livereload
  - CSS file importing from JavaScript
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

Create a production build:

```
$ npm run build
```


# grunt tasks

Internally, `bundler-reactor` uses [Grunt](http://gruntjs.com/) to manage tasks. The relevant tasks are exposed as npm scripts as well for convenience. All the tasks are available in the [tasks](https://github.com/MiguelCastillo/bundler-reactor/tree/master/template/tasks) folder where you will find tasks such as `bitbundler` and `connect`. Do feel free to modify these tasks to enhance you base setup.

# babel

The babel integration supports [.babelrc](http://babeljs.io/docs/usage/babelrc/), and `bundler-reactor` will setup one for you. Do leverage this file to further enhance your processing pipeline.

# eslint

The eslint integration supports [.eslintrc.json](http://eslint.org/docs/user-guide/configuring#configuration-file-formats), and `bundler-reactor` will setup one up for you with some sensible default. Please do adjust this file to fit your needs.
