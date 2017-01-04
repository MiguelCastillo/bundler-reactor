# bundler-reactor

Quickly gets you up and running with a [react](https://facebook.github.io/react/) Web Application using hand picked tools and default settings optimized for the ecosystem.

# stack and feature support

- [dev server](https://github.com/gruntjs/grunt-contrib-connect)
  - Configured as a Single Page Application with [browser history API](https://github.com/bripkens/connect-history-api-fallback)
- [pakit](https://github.com/MiguelCastillo/pakit)
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
$ bundler-reactor sample-app
```

is the same as

```
$ bundler-reactor create sample-app
```

## update


From the directory of an already existing application:

```
$ bundler-reactor update
```

This gives you the ability to update `bundler-reactor` configurations. Updates are carefully applied to avoid overriding your data; *only* unmodified data used by `bundler-reactor` is updated. If for some reason automatic migration is not possible because of conflicts, errors will be logged and the migration will not complete.

NOTE: files in the `src` folder do not get updated if they are modified.

> To do a migration with conflicts you need manually update the relevant files. If files should no longer be tracked for updates their corresponding entries in `.bundler/install` need to configured with `detached: true`.


# grunt tasks

Internally `bundler-reactor` relies on modularized [Grunt](http://gruntjs.com/) tasks to make it easy to tweak the default setup if need be. All the tasks are available in [.bundler/tasks](https://github.com/MiguelCastillo/bundler-reactor/tree/master/template/base/.bundler/tasks) folder where you will find tasks such as `bitbundler` and `connect`. Do feel free to modify these tasks to enhance you base setup.

> Tasks used to be located in the `.tasks` directory but have been moved to `.bundler/tasks` as of version 4.

# pakit

pakit is the bundler, and it provides basic configurations. Configurations such as modules to exclude and pattern matching for specifying which modules are processed by which plugin. The file [.bundlerrc.json](https://github.com/MiguelCastillo/bundler-reactor/blob/master/template/base/.bundlerrc.json) facilitates the configuration.

# babel

The babel integration supports [.babelrc](http://babeljs.io/docs/usage/babelrc/), and `bundler-reactor` will setup one for you. Do leverage this file to further enhance your processing pipeline.

# eslint

The eslint integration supports [.eslintrc.json](http://eslint.org/docs/user-guide/configuring#configuration-file-formats), and `bundler-reactor` will setup one up for you with some sensible default. Please do adjust this file to fit your needs.

# connect

The development server is [connect](https://github.com/gruntjs/grunt-contrib-connect), which can be configured via [.connectrc.json](https://github.com/MiguelCastillo/bundler-reactor/blob/master/template/base/.connectrc.json). You can configure proxies, livereload, fallback for SPA support, and all other [connect](https://github.com/gruntjs/grunt-contrib-connect) settings.

To configure a proxy you need to specify an object with a `source`, which is the route to match and a `target`, which is where the request is forwarded to.

The following example will forward every call for `/api` over to `http://localhost:4000/graphql`.

``` json
{
  "proxies": [{
    "source": "/api",
    "target": "http://localhost:4000/graphql"
  }]
}
```
