// {
//   "presets": ["next/babel"],
//   "plugins": ["@babel/plugin-transform-modules-commonjs"]
// }
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
    'next/babel'
  ]
};
