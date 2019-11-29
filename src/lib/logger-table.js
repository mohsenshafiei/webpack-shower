const {
  logAssetTable,
  logModuleTable,
  logHeader,
  logBody,
  logInfoTableHeader,
  logInfoTable,
  logEntryTable,
} = require('./table.js');
const {
  errorExist,
  warningExist,
  assetExist,
  moduleExist,
  entryExist,
} = require('./exist.js');
const {
  filterAssets,
  filterModules,
  filterEntryPoints,
  filterWarnings,
  filterErrors,
} = require('./filter.js');
const { getDate, pipe2, sort, flat } = require('./util.js');

const loggerTable = (stats, opts) => {
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
  logInfoTableHeader(errorExist(errors) ? 'error' : warningExist(warnings) ? 'warning' : 'success')
  logInfoTable(hash, date, version)
  if (!errorExist(errors)) {
    if (assetExist(assets)) {
      const regex = assetsToFilter;
      const sortFilter = pipe2(sort, filterAssets);
      const filteredAssets = sortAssets ? sortFilter(assets, regex) : filterAssets(assets, regex);
      assetExist(filteredAssets) ? logHeader('ASSETS') : null;
      logAssetTable(filteredAssets);
    }
    if (moduleExist(modules)) {
      const regex = modulesToFilter;
      const sortFilter = pipe2(sort, filterModules);
      const filteredModules = sortModules ? sortFilter(modules, regex) : filterModules(modules, regex);
      moduleExist(filteredModules) ? logHeader('MODULES') : null;
      logModuleTable(flat(filteredModules));
    }
    if (entryExist(entrypoints)) {
      const regex = entrypointsToFilter;
      const filteredEntryPoints = filterEntryPoints(entrypoints, regex)
      entryExist(filteredEntryPoints) ? logHeader('Entry Points:') : null;
      logEntryTable(filteredEntryPoints);
    }
    if (warningExist(warnings)) {
      const regex = warningsToFilter;
      const filteredWarnings = filterWarnings(warnings, regex);
      warningExist(filteredWarnings) ? logHeader('WARNINGS:') : null;
      filteredWarnings.map(warning => logBody("WARNING in " + warning + '\n'));
    }
  } else {
    const regex = errorsToFilter;
    const filteredErrors = filterErrors(errors, regex);
    errorExist(filteredErrors) ? logHeader('ERRORS:') : null;
    filteredErrors.map(error => logBody(error));
  }
}

module.exports = {
  loggerTable,
}
