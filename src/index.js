const chalk = require('chalk');
const { getDate } = require('./lib/util.js');
const {
  errorExist,
  warningExist,
  assetExist,
  moduleExist,
  entryExist,
} = require('./lib/exist.js');
const {
  expandModules,
  expandEntryPoints
} = require('./lib/expand.js');
const {
  filterAssets,
  filterModules,
  filterEntryPoints,
  filterWarnings,
  filterErrors,
} = require('./lib/filter.js');
const {
  logInfoBG,
  logAssetBG,
  logModuleBG,
  logEntryBG,
  logWarningBG,
  logErrorBG,
} = require('./lib/log-background.js');
const {
  logAsset,
  logWarning,
  logError,
  logInfo,
} = require('./lib/log.js');

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
    this.logger = this.logger.bind(this);
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
    const stats = this.stats;
    const date = getDate() || '-';
    const version = stats.version || '-'
    const hash = stats.hash || '-'
    const errors = stats.errors || [];
    const warnings = stats.warnings || [];
    const modules = stats.modules || [];
    const entrypoints = stats.entrypoints || {};
    const assets = stats.assets || [];
    const logging = stats.logging || {};
    await this.logger(hash, date, version, errors, warnings, modules, entrypoints, assets);
    return Promise.resolve();
  }

  logger(hash, date, version, errors, warnings, modules, entrypoints, assets) {
    logInfoBG(errorExist(errors) ? 'error' : warningExist(warnings) ? 'warning' : 'success')
    logInfo(hash, date, version)
    if (!errorExist(errors)) {
      if (assetExist(assets)) {
        const regex = this.opts.assetsToFilter;
        const filteredAssets = filterAssets(assets, regex);
        assetExist(filteredAssets) ? logAssetBG('ASSETS') : null;
        filteredAssets.map(asset => logAsset(asset));
      }
      if (moduleExist(modules)) {
        const regex = this.opts.modulesToFilter;
        const filteredModules = filterModules(modules, regex);
        moduleExist(filteredModules) ? logModuleBG('MODULES:') : null;
        expandModules(filteredModules, 0);
      }
      if (entryExist(entrypoints)) {
        const regex = this.opts.entrypointsToFilter;
        const filteredEntryPoints = filterEntryPoints(entrypoints, regex)
        entryExist(filteredEntryPoints) ? logEntryBG('Entry Points:') : null;
        expandEntryPoints(filteredEntryPoints, 0);
      }
      if (warningExist(warnings)) {
        const regex = this.opts.warningsToFilter;
        const filteredWarnings = filterWarnings(warnings, regex);
        warningExist(filteredWarnings) ? logWarningBG('WARNINGS:') : null;
        filteredWarnings.map(warning => logWarning("WARNING in " + warning + '\n'));
      }
    } else {
      const regex = this.opts.errorsToFilter;
      const filteredErrors = filterErrors(errors, regex);
      errorExist(filteredErrors) ? logErrorBG('ERRORS:') : null;
      filteredErrors.map(error => logError(error));
    }
  }
}

module.exports = WebpackShower;
