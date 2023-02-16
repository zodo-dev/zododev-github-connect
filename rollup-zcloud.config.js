import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';

const EXPRESS_SERVER_PACKAGE = 'storybook-dist';

export default [
  {
    input: './src/stories/express-server.js',
    output: [
      {
        file: `${EXPRESS_SERVER_PACKAGE}/index.js`,
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
            src: 'packages-templates/package-zcloud.json',
            dest: `${EXPRESS_SERVER_PACKAGE}`,
            rename: 'package.json',
          },
        ],
      }),
      json(),
      commonjs(),
      external(),
      resolve({
        preferBuiltins: true,
        extensions: ['.js'],
      }),
    ],
  },
];
