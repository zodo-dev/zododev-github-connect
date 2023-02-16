import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import svgr from '@svgr/rollup';
import url from '@rollup/plugin-url';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';
import { packageVersions } from './package.json';

const SERVER_PACKAGE = 'dist/github-connect-server';
const FRONTEND_PACKAGE = 'dist/github-connect-react';

export default [
  {
    input: './src/server/github-connect.js',
    output: [
      {
        file: `${SERVER_PACKAGE}/index.js`,
        format: 'cjs',
      },
      {
        file: `${SERVER_PACKAGE}/index.es.js`,
        format: 'es',
        exports: 'named',
      },
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
      copy({
        targets: [
          {
            src: 'packages-templates/package-server.json',
            dest: `${SERVER_PACKAGE}`,
            rename: 'package.json',
            transform: (contents) =>
              contents
                .toString()
                .replace('__VERSION__', packageVersions.server),
          },
          {
            src: 'packages-templates/README-server.md',
            dest: `${SERVER_PACKAGE}`,
            rename: 'README.md',
          },
        ],
      }),
      json(),
      commonjs(),
      external(),
      resolve({
        preferBuiltins: true,
        //mainFields: ['browser'],
        extensions: ['.js'],
      }),
      terser(),
    ],
  },
  {
    input: './src/index.js',
    output: [
      {
        file: `${FRONTEND_PACKAGE}/index.js`,
        format: 'cjs',
      },
      {
        file: `${FRONTEND_PACKAGE}/index.es.js`,
        format: 'es',
        exports: 'named',
      },
    ],

    plugins: [
      babel({
        exclude: 'node_modules/**',
        //babelHelpers: 'bundled',
        presets: ['@babel/preset-react'],
      }),
      copy({
        targets: [
          {
            src: 'packages-templates/package-react.json',
            dest: `${FRONTEND_PACKAGE}`,
            rename: 'package.json',
            transform: (contents) =>
              contents.toString().replace('__VERSION__', packageVersions.react),
          },
          {
            src: 'packages-templates/README-react.md',
            dest: `${FRONTEND_PACKAGE}`,
            rename: 'README.md',
          },
          {
            src: 'src/styles/tailwind-styles.scss',
            dest: `${FRONTEND_PACKAGE}/styles`,
          },
        ],
      }),
      url(),
      svgr({ icon: true }),
      commonjs(),
      external(),
      resolve({
        preferBuiltins: true,
        mainFields: ['browser'],
        extensions: ['.js', '.jsx'],
      }),
      terser(),
    ],
  },
];
