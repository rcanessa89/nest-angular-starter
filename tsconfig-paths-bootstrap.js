const tsConfig = require('./server/tsconfig.json');
const tsConfigPaths = require('tsconfig-paths');

const baseUrl = 'dist/server';

tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths
});
