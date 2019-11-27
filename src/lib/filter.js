const { match, pick } = require('./util.js');

const filterAssets = (assets, regex) => {
  if (regex.length > 0) {
    return assets.filter(asset => !regex.map(reg => match(reg, asset.name)).includes(true))
  }
  return assets
}

const filterModules = (modules, regex) => {
  if (regex.length > 0) {
    return modules.filter(module => !regex.map(reg => match(reg, module.name)).includes(true))
  }
  return modules;
}

const filterWarnings = (warnings, regex) => {
  if (regex.length > 0) {
    return warnings.filter(warning => !regex.map(reg => match(reg, warning)).includes(true));
  }
  return warnings;
}

const filterErrors = (errors, regex) => {
  if (regex.length > 0) {
    return errors.filter(error => !regex.map(reg => match(reg, error)).includes(true));
  }
  return errors;
}

const filterEntryPoints = (entrypoints, regex) => {
  if (regex.length > 0) {
    const filteredEntryPointKeys = Object.keys(entrypoints).filter(key => !regex.map(reg => match(reg, key)).includes(true))
    return pick(entrypoints, filteredEntryPointKeys);
  }
  return entrypoints
}

module.exports = {
  filterAssets,
  filterModules,
  filterWarnings,
  filterErrors,
  filterEntryPoints,
}
