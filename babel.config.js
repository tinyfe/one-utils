module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        targets: {
          node: 'current',
        },
        bugfixes: true,
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
  env: {
    debug: {
      sourceMaps: 'inline',
      retainLines: true,
    },
  },
};
