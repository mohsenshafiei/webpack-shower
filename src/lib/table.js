const { log } = require('./util');
const cTable = require('console.table');
const { bytesToSize } = require('./util.js');

const logAssetTable = (assets) => {
  const tranformedAsssets = (assets).map(asset => [asset.name, asset.isOverSizeLimit ? 'yes' : 'no', bytesToSize(asset.size)])
  console.table(
    ['NAME', 'IS OVER SIZE LIMIT', 'SIZE'],
    tranformedAsssets,
  )
}

const logModuleTable = (modules) => {
  const tranformedModules = (modules).map(module => [module.name, bytesToSize(module.size)])
  console.table(['NAME', 'SIZE'],tranformedModules)
}

const logEntryTable = (entrypoints) => {
  let tranformedEntryPoints = Object.keys(entrypoints).map(entry => [entry, entrypoints[entry].chunks, entrypoints[entry].assets])
  console.table(
    ['NAME', 'CHUNKS', 'ASSETS'],
    tranformedEntryPoints,
  );
}

const logHeader = (str) => log(str + '\n' + '-'.repeat(30));
const logBody = (str) => log(str + '\n');

const logInfoTableHeader = (state) => {
  if (state === 'error') {
    log('COMPILATION FAILED' + '\n' + '-'.repeat(30));
  }
  if (state === 'warning') {
    log('COMPILED WITH WARNINGS' + '\n' + '-'.repeat(30));
  }
  if (state === 'success') {
    log('COMPILED SUCCESSFULLY' + '\n' + '-'.repeat(30));
  }
};

const logInfoTable = (hash, date, version) => {
  log('hash: ' + hash),
  log('time: ' + date)
  log('version: ' + version + '\n')
};

module.exports = {
  logAssetTable,
  logModuleTable,
  logInfoTableHeader,
  logInfoTable,
  logHeader,
  logBody,
  logEntryTable,
}
