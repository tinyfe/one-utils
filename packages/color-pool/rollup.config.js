import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default {
  inlineDynamicImports: true,
  input: './src/index.ts',
  output: [
    {
      // CommonJS, 适用于 Node 或 Browserify / webpack
      format: 'cjs',
      file: pkg.main,
      exports: 'auto',
      // dir: 'lib',
      sourcemap: true,
    },
    {
      // 将软件包保存为 ES 模块文件
      format: 'es',
      file: pkg.module,
      // dir: 'lib',
      sourcemap: true,
    },
  ],
  // 维持包文件指定id文件维持外链，不参与打包构建
  external: [],
  plugins: [
    babel({
      runtime: true,
      exclude: 'node_modules/**',
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    terser(),
  ],
};
