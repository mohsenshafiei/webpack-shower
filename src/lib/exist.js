const errorExist = (errors) => errors.length;
const warningExist = (warnings) => warnings.length;
const assetExist = (assets) => assets.length;
const moduleExist = (modules) => modules.length;
const entryExist = (entrypoints) => Object.keys(entrypoints).length;
module.exports = {
  errorExist,
  warningExist,
  assetExist,
  moduleExist,
  entryExist,
}
