import image from '@rollup/plugin-image';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import packageJSON from './package.json';

export default [
  {
    input: 'src/index.jsx',
    output: [
      {
        file: packageJSON.main,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: packageJSON.module,
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      peerDepsExternal(),
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react', '@emotion/babel-preset-css-prop'],
        plugins: ['@babel/plugin-transform-runtime'],
        babelHelpers: 'runtime'
      }),
      image(),
      resolve(),
      commonjs(),
      terser()
    ],
    external: [/@babel\/runtime/, '@emotion/react', 'ethers']
  }
];
