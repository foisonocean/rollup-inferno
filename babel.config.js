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
    presets.push(
      [
        '@emotion/babel-preset-css-prop',
        {
          sourceMap: false,
          autoLabel: false,
        },
      ],
      [
        '@babel/preset-env',
        {
          modules: false,
          loose: true,
          useBuiltIns: 'usage',
          exclude: ['transform-regenerator', 'transform-async-to-generator'],
        },
      ],
    );
  } else {
    presets.push([
      '@emotion/babel-preset-css-prop',
      {
        sourceMap: true,
        autoLabel: true,
      },
    ]);
  }

  return {
    presets,
    plugins,
  };
};
