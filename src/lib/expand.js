const { logModule, logEntry } = require('./log.js');

const expandModules = (modules, level) => {
  modules.map(
    module => {
      logModule(module, level);
      module.modules ? expandModules(module.modules, level + 1) : null
      return true;
    }
  )
};

const expandEntryPoints = (entrypoints, level) => {
  for (const entrypoint in entrypoints) {
    logEntry(entrypoint, entrypoints[entrypoint].chunks, entrypoints[entrypoint].assets)
  }
}
module.exports = {
  expandModules,
  expandEntryPoints
}
