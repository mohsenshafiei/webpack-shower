const chalk = require('chalk');
const { logger } = require('./lib/logger.js');
const { loggerTable } = require('./lib/logger-table.js');

class WebpackShower {
  constructor(opts) {
    opts = opts || {};
    this.opts = {};
    this.stats = null;
    this.opts.modulesToFilter = opts.modulesToFilter || [];
    this.opts.assetsToFilter = opts.assetsToFilter || [];
    this.opts.warningsToFilter = opts.warningsToFilter || [];
    this.opts.errorsToFilter = opts.errorsToFilter || [];
    this.opts.entrypointsToFilter = opts.entrypointsToFilter || [];
    this.opts.sortAssets = opts.sortAssets || false;
    this.opts.sortModules = opts.sortModules || false;
    this.opts.mode = opts.mode || 'normal'
  }

  apply(compiler) {
    if (compiler.hooks) {
      compiler.hooks.afterCompile.tapPromise("set-stats", this.setStats.bind(this));
      compiler.hooks.done.tapPromise("init", this.init.bind(this));
    } else {
      compiler.plugin("afterCompile", this.setStats.bind(this));
      compiler.plugin("done", this.filterStats.bind(this));
    }
  }

  async setStats(compiler) {
    this.stats = compiler.getStats().toJson(this.opts.stats, "forToString");
    return Promise.resolve()
  }

  async init(compiler) {
    const { mode }= this.opts;
    const stats = this.stats;
    const opts = this.opts;
    switch (mode) {
      case 'normal':
        await logger(stats, opts);
        break;
      case 'table':
        await loggerTable(stats, opts);
        break;
      default:
        await logger(stats, opts);
    }
    return Promise.resolve();
  }
}

module.exports = WebpackShower;
