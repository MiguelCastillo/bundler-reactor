# bundler-reactor

Quickly gets you up and running with a [react](https://facebook.github.io/react/) Web Application using hand picked tools and default settings optimized for the ecosystem.

# stack and feature support

- [dev server](https://github.com/gruntjs/grunt-contrib-connect)
  - Configured as a Single Page Application with [browser history API](https://github.com/bripkens/connect-history-api-fallback)
- [bit-bundler](https://github.com/MiguelCastillo/bit-bundler)
  - Code splitting of third party libraries
  - Handle `import` and `require` statements
  - ES6 (ES2015) and JSX support
    - Babel interation
    - ESLint integration
  - File watching and Livereload
  - Bundle CSS and JSON
  - Bundle http resources such as CSS stored in a CDN
- [react](https://facebook.github.io/react/) with JSX support


# usage

You get a few `npm` tasks to facilate the development and generation of production builds.


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

Starts a development server.

```
$ npm start
```


## npm run build

Creates a production build.

```
$ npm run build
```


# actions

## create

The default action. This is the action that is executed when `bundler-reactor` is called with just the name of an application.

```
$ bundler-reactor create sample-app
```

is the same as

```
$ bundler-reactor sample-app
```

## update

From the directory of an already existing application:

```
$ bundler-reactor update
```

This gives you the ability to update an already existing setup as well as to help in the migration to new `bundler-reactor` features.

There are very specific things that get updated:

- .bundlerrc.json
- .tasks/**
- package.json fields
  - scripts
  - devDependencies
  - dependencies

What is *NOT* updated:

- .eslintrc.json
- .babelrc
- src
- Gruntfile.js

Data is carefully merged to avoid overriding your data; update will *only* touch data used by `bundler-reactor`. However, if you have customized any of the dependencies, devDependencies, scripts, and or tasks **introduced** by `bundler-reactor` then you *should NOT* use the update feature unless you are *OK* letting `bundler-reactor` replace any of it.


# grunt tasks

Internally `bundler-reactor` relies on modularized [Grunt](http://gruntjs.com/) tasks to make it easy to tweak the default setup if need be. All the tasks are available in the [.tasks](https://github.com/MiguelCastillo/bundler-reactor/tree/master/template/.tasks) folder where you will find tasks such as `bitbundler` and `connect`. Do feel free to modify these tasks to enhance you base setup.

# babel

The babel integration supports [.babelrc](http://babeljs.io/docs/usage/babelrc/), and `bundler-reactor` will setup one for you. Do leverage this file to further enhance your processing pipeline.

# eslint

The eslint integration supports [.eslintrc.json](http://eslint.org/docs/user-guide/configuring#configuration-file-formats), and `bundler-reactor` will setup one up for you with some sensible default. Please do adjust this file to fit your needs.

# connect

The development server is [connect](https://github.com/gruntjs/grunt-contrib-connect), and its configuration can be found in `.tasks/connect`. This is where you configure things like proxies and livereloading ports.

## proxy

Currently there is a [proxy middleware](https://github.com/gonzalocasas/node-proxy-middleware) with place holder stubs in `.tasks/connect` to illustrate where and how to configure proxies. Please do check out the [proxy middleware](https://github.com/gonzalocasas/node-proxy-middleware) for all available options.

> Future work is to add a `.connectrc` for configuring items like this.
