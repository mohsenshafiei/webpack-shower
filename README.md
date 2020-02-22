<p align="center">
  <img align="center" width="300" height="300" src="/assets/webpack-shower.jpeg" />
</p>

[![version][version]][version-url]
[![node][node]][node-url]
[![travis][travis]][travis-url]
[![downloads][downloads]][downloads-url]
[![MIT LICENSE][mit]][mit-url]
[![semantic-release][semantic-release]][semantic-release-url]

It gives you the ability to remove annoying Webpack outputs and organize, filter and prioritize those reports that we need.

### Installation

```bash
npm install webpack-shower --save-dev
```

### What is in it for me?

We all know that Webpack output is cool enough but we can turn that huge data to something useful like this:

<p align="center">
  <img
    align="center"
    height="350"
    src="/assets/terminal.png"
  />
</p>

With `Webpack-Shower` you can remove those stats that are repetitive, annoying and noisy.

### Configuration

First you need to silent default Webpack output like below

```javascript
// add to webpack.config.js
stats: {
    all: false
}
```

Second add the `Webpack-Shower` plugin to your Webpack configuration file

```javascript
const WebpackShower = require('webpack-shower');

plugins: [new WebpackShower()];

```

### Filtering Stats

To filter annoying stats and annoying outputs

```javascript
plugins: [
  new WebpackShower({
      assetsToFilter: [
        '*.img', // filter based extension
        'hi.png', // string
        '/[h]/g' // passing regex
      ],
  })
]
```
available `options` are :

- `modulesToFilter`
- `assetsToFilter`
- `warningsToFilter`
- `errorsToFilter`
- `entrypointsToFilter`

### Sorting Stats

You can sort assets and modules based on their size. In default mode, `Webpack-Shower` doesn't sort assets and modules.

```javascript
plugins: [
  new WebpackShower({
      sortAssets: true,
      sortModules: true,
  });
]
```

### Modes

There are different modes to use. In default mode, `webpack-shower` use `normal` mode. If you want to use webpack-shower for reporting in other environments like `Jenkins` and etc it is better to set `mode: 'table'`.

```javascript
plugins: [
  new WebpackShower({
    mode: 'table'
  });
]
```

[node]: https://img.shields.io/node/v/css-loader.svg
[node-url]: https://nodejs.org
[travis]: https://travis-ci.org/mohsenshafiei/webpack-shower.svg?branch=master
[travis-url]: https://travis-ci.org/mohsenshafiei/webpack-shower.svg?branch=master
[version]: https://img.shields.io/npm/v/webpack-shower.svg?style=flat-square
[version-url]: http://npm.im/webpack-shower
[downloads]: https://img.shields.io/npm/dm/webpack-shower.svg?style=flat-square
[downloads-url]: http://npm-stat.com/charts.html?package=webpack-shower&from=2015-08-01
[mit]: https://img.shields.io/npm/l/webpack-shower.svg?style=flat-square
[mit-url]: http://opensource.org/licenses/MIT
[semantic-release]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[semantic-release-url]: https://github.com/semantic-release/semantic-release
