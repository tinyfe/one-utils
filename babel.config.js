module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        targets: '>0.3%, not dead',
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
