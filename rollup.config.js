const fs = require('fs');
const path = require('path');

import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

let { NODE_ENV, BUILD_PATH } = process.env;

if (typeof BUILD_PATH === 'string') {
  BUILD_PATH = BUILD_PATH.split(';');
}

const pkgsRoot = path.join(__dirname, 'packages');
const pkgs = fs
  .readdirSync(pkgsRoot)
  .filter(dir => BUILD_PATH.includes(dir))
  .map(dir => path.join(pkgsRoot, dir))
  .map(location => {
    return {
      location,
      pkgJson: require(path.resolve(location, 'package.json')),
    };
  });

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const commonPlugins = [
  resolve({ extensions, preferBuiltins: true }),
  babel({
    extensions,
    babelHelpers: 'bundled',
    exclude: ['node_modules/**', 'packages/**/node_modules/**'],
  }),
  commonjs(),
];

function config({ location, pkgJson }) {
  const input = path.join(location, 'src', 'index.ts');
  const external = Object.keys(pkgJson.dependencies || {});
  const name = pkgJson.name;
  commonPlugins.push(
    replace({
      __buildVersion: pkgJson.version,
    }),
  );

  return {
    umd: compress => {
      let file = path.join(location, 'lib', 'browser.js');
      const plugins = [...commonPlugins];
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
        output: [
          {
            file,
            name,
            format: 'umd',
            sourcemap: false,
            globals,
          },
        ],
        plugins,
      };
    },
    module: () => {
      const plugins = [...commonPlugins];
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
            // exports: 'auto',
            // sourcemap: true,
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
