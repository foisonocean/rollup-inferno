import { readFile, writeFileSync } from 'fs';
import { resolve } from 'path';

import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import includePaths from 'rollup-plugin-includepaths';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import hash from 'rollup-plugin-hash';
import mkdirp from 'mkdirp';
import chokidar from 'chokidar';

const isProd = process.env.NODE_ENV === 'production';

const extensions = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json'];

function copyHtml(entyrPath) {
  readFile(
    resolve(__dirname, './src/index.html'),
    {
      encoding: 'utf-8',
    },
    (err, html) => {
      if (err) {
        throw err;
      } else {
        const replacedHtmlContent = html.replace('%js-entry-path%', entyrPath);
        mkdirp(resolve(__dirname, './dist'), (error) => {
          if (error) {
            throw error;
          } else {
            writeFileSync(resolve(__dirname, './dist/index.html'), replacedHtmlContent, {
              encoding: 'utf-8',
              flag: 'w',
            });
          }
        });
      }
    },
  );
}

const config = {
  input: 'src/index.tsx',
  plugins: [
    nodeResolve({
      mainFields: isProd ? undefined : ['dev:module', 'module', 'main'],
    }),
    commonjs({
      extensions,
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
      extensions,
      runtimeHelpers: true,
    }),
    includePaths({
      extensions,
      paths: [resolve(__dirname, './src')],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    }),
  ],
  output: {
    file: 'dist/js/app.js',
    format: 'iife',
  },
};

if (!isProd) {
  // watch and copy html file
  copyHtml('/js/app.js');
  chokidar
    .watch(resolve(__dirname, './src/index.html'), {
      persistent: true,
    })
    .on('change', () => {
      copyHtml('/js/app.js');
    });

  config.plugins.push(
    serve({
      verbose: false,
      contentBase: 'dist',
      historyApiFallback: true,
      host: '0.0.0.0',
      port: 3000,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }),
    livereload({
      watch: 'dist',
    }),
  );
} else {
  config.plugins.push(
    terser(),
    hash({
      dest: 'dist/js/app.[hash:8].js',
      replace: true,
      callback: (filepath) => {
        let filename = filepath.split('/');
        filename = filename[filename.length - 1];
        copyHtml(`/js/${filename}`);
      },
    }),
  );
}

export default config;
