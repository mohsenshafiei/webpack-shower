const chalk = require('chalk');
const { log, spaces } = require('./util.js');

const logInfoBG = (state) => {
  if (state === 'error') {
    const str = 'COMPILATION FAILED';
    log(chalk.bgRedBright(str + spaces(str.length)))
  }
  if (state === 'warning') {
    const str = 'COMPILED WITH WARNINGS';
    log(chalk.bgYellow(str + spaces(str.length)))
  }
  if (state === 'success') {
    const str = 'COMPILED SUCCESSFULLY';
    log(chalk.bgGreenBright(str + spaces(str.length)))
  }
};

const logErrorBG = (str) => log(chalk.bgRed(str + spaces(str.length)));

const logWarningBG = (str) => log(chalk.bgYellow(str + spaces(str.length)));

const logModuleBG = (str) => log(chalk.bgGreen(str + spaces(str.length)));

const logAssetBG = (str) => log(chalk.bgMagenta(str + spaces(str.length)));

const logEntryBG = (str) => log(chalk.bgCyan(str + spaces(str.length)));

module.exports = {
  logInfoBG,
  logErrorBG,
  logWarningBG,
  logModuleBG,
  logAssetBG,
  logEntryBG,
}
