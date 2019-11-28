![GitHub Logo](/assets/webpack-shower.png)

[![version][version]][version-url]
[![node][node]][node-url]
[![travis][travis]][travis-url]
[![downloads][downloads]][downloads-url]
[![MIT LICENSE][mit]][mit-url]
[![semantic-release][semantic-release]][semantic-release-url]


## WEBPACK-SHOWER

It gives you the ability to remove annoying Webpack outputs and organize, filter and prioritize those reports that we need.

##### Installation

```console
npm install webpack-shower --save-dev
```

##### Configuration

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
//
plugins: [new WebpackShower()];

```

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


[node]: https://img.shields.io/node/v/css-loader.svg
[node-url]: https://nodejs.org
[travis]: https://travis-ci.com/mohsenshafiei/webpack-shower.svg?branch=master
[travis-url]: https://travis-ci.com/mohsenshafiei/webpack-shower.svg?branch=master
[version]: https://img.shields.io/npm/v/webpack-shower.svg?style=flat-square
[version-url]: http://npm.im/webpack-shower
[downloads]: https://img.shields.io/npm/dm/webpack-shower.svg?style=flat-square
[downloads-url]: http://npm-stat.com/charts.html?package=webpack-shower&from=2015-08-01
[mit]: https://img.shields.io/npm/l/webpack-shower.svg?style=flat-square
[mit-url]: http://opensource.org/licenses/MIT
[semantic-release]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[semantic-release-url]: https://github.com/semantic-release/semantic-release
