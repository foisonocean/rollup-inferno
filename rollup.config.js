import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';

const config =  {
	input: 'src/index.tsx',
	plugins: [
		resolve({
			jsnext: true,
      		modulesOnly: true,
		}),
		replace({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
		}),
		typescript({
			cacheRoot: './.typescript-compile-cache'
		}),
		babel({
			exclude: 'node_modules/**'
		})
	],
	output: {
		file: 'dist/app.js',
		format: 'iife'
	}
};

export default config;
