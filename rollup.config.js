const fs = require('fs');
const path = require('path');

import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import camelCase from 'camelcase';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';

const ALL = '*';

let { NODE_ENV, BUILD = ALL, BUILD_PKG = ALL } = process.env;
function toGlobalName(pkgName) {
  return camelCase(pkgName);
}

BUILD_PKG = BUILD_PKG.split(';').filter(Boolean);
BUILD = BUILD.split(';').filter(Boolean);

const FILTER_PATH = ['__template__'];

console.log({ BUILD_PKG, BUILD });

let pkgs = [];

const paths = ['packages'].filter(_ => BUILD.includes(ALL) || BUILD.includes(_));

paths.forEach(pkgPath => {
  const pkgsRoot = path.join(__dirname, pkgPath);
  const currentFilePath = fs.readdirSync(pkgsRoot);
  if (currentFilePath.length) {
    const filePath = currentFilePath
      .filter(dir => !FILTER_PATH.includes(dir))
      .filter(dir => BUILD_PKG.includes(ALL) || BUILD_PKG.includes(dir))
      .map(dir => path.join(pkgsRoot, dir))
      .map(location => {
        return {
          location,
          pkgJson: require(path.resolve(location, 'package.json')),
        };
      });
    pkgs = [...pkgs, ...filePath];
  }
});

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const commonPlugins = [
  commonjs(),
  // Convert JSON imports to ES6 modules.
  json(),
  // Register Node.js builtins for browserify compatibility.
  builtins(),
  resolve({ extensions, preferBuiltins: true }),
  babel({
    extensions,
    babelHelpers: 'bundled',
    exclude: ['node_modules/**', 'packages/**/node_modules/**'],
  }),
];

function config({ location, pkgJson }) {
  const input = path.join(location, 'src', 'index.ts');

  const external = Object.keys(pkgJson.dependencies || {});
  const globalName = toGlobalName(pkgJson.name);
  const globals = {};
  external.forEach(pkgName => {
    globals[pkgName] = toGlobalName(pkgName);
  });

  commonPlugins.push(
    replace({
      __buildVersion: pkgJson.version,
    }),
  );

  const tsPlugin = typescript({
    // abortOnError: false,
    clean: true,
    include: [path.join(location, 'src/**/*.ts')],
    rollupCommonJSResolveHack: true,
    tsconfig: path.join(location, 'tsconfig.json'),
    declarationDir: path.join(location, 'lib/@types'),
    useTsconfigDeclarationDir: true,
  });
  const plugins = [tsPlugin, ...commonPlugins];

  return {
    umd: compress => {
      let file = path.join(location, 'lib', 'browser.js');
      if (compress) {
        plugins.push(terser());
        file = path.join(location, 'lib', 'browser.min.js');
      }

      const globals = {};
      external.forEach(pkgName => {
        globals[pkgName] = pkgName;
      });

      return {
        input,
        external: globalName === '' ? {} : external,
        output: [
          {
            file,
            name: globalName,
            format: 'umd',
            exports: 'named',
            sourcemap: false,
            globals,
          },
        ],
        plugins,
      };
    },
    module: () => {
      return {
        inlineDynamicImports: true,
        input,
        // 维持包文件指定id文件维持外链，不参与打包构建
        external,
        output: [
          {
            file: path.join(location, pkgJson.module),
            // 将软件包保存为 ES 模块文件
            format: 'es',
            sourcemap: true,
          },
          {
            // CommonJS, 适用于 Node 或 Browserify / webpack
            format: 'cjs',
            file: path.join(location, pkgJson.main),
            exports: 'auto',
            sourcemap: true,
          },
        ],
        plugins,
      };
    },
  };
}

async function makeRollupConfig({ type, compress = true, visualizer = true, ..._ }) {
  return config({ ..._ })[type](compress, visualizer);
}

let promises = [];

switch (NODE_ENV) {
  case 'UMD':
    promises.push(...getUMD());
    break;
  case 'MODULE':
    promises.push(...getModule());
    break;
  case 'ALL':
    promises.push(...getAll());
    break;
  default:
    break;
}

function getUMD() {
  const configs = pkgs.filter(pkg => pkg.pkgJson.browser);
  return configs
    .map(config => makeRollupConfig({ ...config, type: 'umd' }))
    .concat(
      configs.map(config =>
        makeRollupConfig({
          ...config,
          type: 'umd',
          compress: false,
          visualizer: false,
        }),
      ),
    );
}

function getModule() {
  const configs = [...pkgs];
  return configs.map(config => makeRollupConfig({ ...config, type: 'module' }));
}

function getAll() {
  return [...getModule(), ...getUMD()];
}

export default Promise.all(promises);
