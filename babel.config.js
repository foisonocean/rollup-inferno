module.exports = function getBabelConfig(api) {
  api.cache(true);

  const isProd = process.env.NODE_ENV === 'production';

  const presets = ['@babel/preset-typescript'];
  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 2,
        regenerator: false,
        useESModules: true,
      },
    ],
    ['babel-plugin-inferno', { imports: true }],
  ];

  if (isProd) {
    presets.push([
      '@babel/preset-env',
      {
        modules: false,
        loose: true,
        useBuiltIns: 'usage',
        exclude: ['transform-regenerator', 'transform-async-to-generator'],
      },
    ]);
    plugins.push(
      ['emotion', { hoist: true, instances: ['emotion', 'utils/styled'] }],
      [
        'module:fast-async',
        {
          compiler: {
            promises: true,
            generators: false,
          },
          runtimePattern: null,
          useRuntimeModule: false,
        },
      ],
    );
  } else {
    plugins.push([
      'emotion',
      {
        sourceMap: true,
        autoLabel: true,
        instances: ['emotion', 'utils/styled'],
      },
    ]);
  }

  return {
    presets,
    plugins,
  };
};
