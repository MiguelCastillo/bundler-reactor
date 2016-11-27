# bundler-reactor
> bit-bundler boilerplate setup for react apps.

This gives you a good starting point with tools and default settings optimized for building applications with [react](https://facebook.github.io/react/). The underlying setup relies on modularized [Grunt](http://gruntjs.com/) tasks that lend themselves well for enhancing the default configuration; this whole boilerplate setup is meant to be built upon and enhanced.

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


## bundler-reactor create

The default to create an application is `create`. This is the action that is executed when invoking `bundler-reactor` without an action.

```
$ bundler-reactor create sample-app
```

is equivalent to

```
$ bundler-reactor sample-app
```

## bundler-reactor update

This gives you the ability to update an already existing setup as well as to help in the migration to new `bundler-reactor` features.

There are very specific things that get updated:

- tasks
- package.json
  - scripts
  - devDependencies
  - dependencies

Data is carefully merged to avoid overriding your data; update will *only* touch data used by `bundler-reactor`. However, if you have customized any of the dependencies, devDependencies, scripts, and or tasks introduced by `bundler-reactor` then you *should NOT* use the update feature unless you are *OK* letting `bundler-reactor` replace any of it.

What is *NOT* updated:

- .eslintrc.json
- .babelrc
- src
- Gruntfile.js

From the directory of an already existing application:

```
$ bundler-reactor update
```


# grunt tasks

Internally, `bundler-reactor` uses [Grunt](http://gruntjs.com/) to manage tasks. The relevant tasks are exposed as npm scripts as well for convenience. All the tasks are available in the [tasks](https://github.com/MiguelCastillo/bundler-reactor/tree/master/template/tasks) folder where you will find tasks such as `bitbundler` and `connect`. Do feel free to modify these tasks to enhance you base setup.

# babel

The babel integration supports [.babelrc](http://babeljs.io/docs/usage/babelrc/), and `bundler-reactor` will setup one for you. Do leverage this file to further enhance your processing pipeline.

# eslint

The eslint integration supports [.eslintrc.json](http://eslint.org/docs/user-guide/configuring#configuration-file-formats), and `bundler-reactor` will setup one up for you with some sensible default. Please do adjust this file to fit your needs.
