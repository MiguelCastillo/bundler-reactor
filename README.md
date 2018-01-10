# bundler-reactor

Quickly gets you up and running with a [react](https://facebook.github.io/react/) Web Application using hand picked tools and default settings optimized for the ecosystem.

# stack and feature support

- [3dub](https://github.com/MiguelCastillo/3dub) dev server
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


# npm scripts

`bundler-reactor` relies on npm scripts to provide you with a CLI API to work with your application. Start sever, build, etc... These npm scripts are all availalbe and ready to be expanded on in the `package.json` file of your project.

# pakit

pakit is the bundler, and it provides basic configurations for bundle splitting and other features that allow to articulate what you want your bundles to be like. The file [.packit.json](https://github.com/MiguelCastillo/bundler-reactor/blob/master/template/base/.packit.json) facilitates the configuration.

# babel

The babel integration supports [.babelrc](http://babeljs.io/docs/usage/babelrc/), and `bundler-reactor` will setup one for you. Do leverage this file to further enhance your transformation pipeline.

# eslint

The eslint integration supports [.eslintrc.json](http://eslint.org/docs/user-guide/configuring#configuration-file-formats), and `bundler-reactor` will setup one up for you with some sensible default. Please do adjust this file to fit your needs.

# 3dub

The development server is [3dub](https://github.com/MiguelCastillo/3dub), which can be configured via [.3dub.json](https://github.com/MiguelCastillo/bundler-reactor/blob/master/template/base/.3dub.json). You can configure proxies, livereload, history (fallback) for SPA support, and other settings availalbe in `3dub` website.

To configure a proxy you need to specify an object with a `source`, which is the route to match for forwarding and a `target`, which is where the request is forwarded to.

The following example will forward every call for `/api` over to `http://localhost:4000/graphql`.

``` json
{
  "proxies": [{
    "source": "/api",
    "target": "http://localhost:4000/graphql"
  }]
}
```

In that configuration, any requests that you application makes to `/api` will get forwarded to `http://localhost:4000/graphql`.
