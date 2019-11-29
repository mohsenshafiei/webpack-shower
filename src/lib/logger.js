const {
  errorExist,
  warningExist,
  assetExist,
  moduleExist,
  entryExist,
} = require('./exist.js');
const {
  logInfoBG,
  logAssetBG,
  logModuleBG,
  logEntryBG,
  logWarningBG,
  logErrorBG,
} = require('./log-background.js');
const {
  logAsset,
  logWarning,
  logError,
  logInfo,
} = require('./log.js');
const {
  expandModules,
  expandEntryPoints
} = require('./expand.js');
const {
  filterAssets,
  filterModules,
  filterEntryPoints,
  filterWarnings,
  filterErrors,
} = require('./filter.js');
const { getDate, pipe2, sort } = require('./util.js');

const logger = (stats, opts) => {
  const {
    hash,
    date = getDate(),
    version,
    errors,
    warnings,
    modules,
    entrypoints,
    assets
  } = stats;
  const {
    assetsToFilter,
    modulesToFilter,
    entrypointsToFilter,
    warningsToFilter,
    errorsToFilter,
    sortAssets,
    sortModules,
  } = opts;
  logInfoBG(errorExist(errors) ? 'error' : warningExist(warnings) ? 'warning' : 'success')
  logInfo(hash, date, version)
  if (!errorExist(errors)) {
    if (assetExist(assets)) {
      const regex = assetsToFilter;
      const sortFilter = pipe2(sort, filterAssets);
      const filteredAssets = sortAssets ? sortFilter(assets, regex) : filterAssets(assets, regex);
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
module.exports = {
  logger,
}
