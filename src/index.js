const chalk = require('chalk');
const { getDate, pipe2, sort } = require('./lib/util.js');
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
    this.opts.sortAssets = opts.sortAssets || false;
    this.opts.sortModules = opts.sortModules || false;
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
    await this.logger();
    return Promise.resolve();
  }

  logger() {
    const {
      hash,
      date = getDate(),
      version,
      errors,
      warnings,
      modules,
      entrypoints,
      assets
    } = this.stats;
    const {
      assetsToFilter,
      modulesToFilter,
      entrypointsToFilter,
      warningsToFilter,
      errorsToFilter,
      sortAssets,
      sortModules,
    } = this.opts;
    logInfoBG(errorExist(errors) ? 'error' : warningExist(warnings) ? 'warning' : 'success')
    logInfo(hash, date, version)
    if (!errorExist(errors)) {
      if (assetExist(assets)) {
        const regex = assetsToFilter;
        const sortFilter = pipe2(sort, filterAssets);
        const filteredAssets = sortAssets ? sortFilter(modules, regex) : filterAssets(assets, regex);
        assetExist(filteredAssets) ? logAssetBG('ASSETS') : null;
        filteredAssets.map(asset => logAsset(asset));
      }
      if (moduleExist(modules)) {
        const regex = modulesToFilter;
        const sortFilter = pipe2(sort, filterModules);
        const filteredModules = sortModules ? sortFilter(modules, regex) : filterModules(modules, regex);
        moduleExist(filteredModules) ? logModuleBG('MODULES:') : null;
        expandModules(filteredModules, 0);
      }
      if (entryExist(entrypoints)) {
        const regex = entrypointsToFilter;
        const filteredEntryPoints = filterEntryPoints(entrypoints, regex)
        entryExist(filteredEntryPoints) ? logEntryBG('Entry Points:') : null;
        expandEntryPoints(filteredEntryPoints, 0);
      }
      if (warningExist(warnings)) {
        const regex = warningsToFilter;
        const filteredWarnings = filterWarnings(warnings, regex);
        warningExist(filteredWarnings) ? logWarningBG('WARNINGS:') : null;
        filteredWarnings.map(warning => logWarning("WARNING in " + warning + '\n'));
      }
    } else {
      const regex = errorsToFilter;
      const filteredErrors = filterErrors(errors, regex);
      errorExist(filteredErrors) ? logErrorBG('ERRORS:') : null;
      filteredErrors.map(error => logError(error));
    }
  }
}

module.exports = WebpackShower;
