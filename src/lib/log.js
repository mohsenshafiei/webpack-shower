const chalk = require('chalk');
const { log, bytesToSize } = require('./util.js');

const logInfo = (hash, date, version) => {
  log(chalk.green('hash: ') + chalk.white(hash)),
  log(chalk.green('time: ') + chalk.white(date))
  log(chalk.green('version: ') + chalk.white(version))
};

const logError = (error) => log(chalk.red(error));

const logWarning = (warning) => log(chalk.yellow(warning));

const logModule = (module, level) => log(
  level > 0 ? chalk.cyan('+' + '---'.repeat(level)) : chalk.green('-'),
  chalk.green(module.name),
  chalk.white(bytesToSize(module.size)),
);

const logAsset = (asset) => log(
  chalk.magenta(asset.name),
  asset.isOverSizeLimit === undefined ?
    chalk.yellow('no-size-limit') :
    asset.isOverSizeLimit === false ?
      chalk.redBright('oversized') :
      chalk.green('good size'),
  chalk.white(bytesToSize(asset.size))
);

const logEntry = (entry, chunks, assets) => {
  log(chalk.green('+ ' + entry), chalk.cyan(`chunks: ${chunks}`));
  log(chalk.cyan('| ') + chalk.white('assets:'))
  log(chalk.cyan('| ------ ') + chalk.cyan(...assets))
}

module.exports = {
  logInfo,
  logError,
  logWarning,
  logModule,
  logAsset,
  logEntry,
}
