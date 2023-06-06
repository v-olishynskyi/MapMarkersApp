module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-proposal-export-namespace-from',
    [
      'module-resolver',
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.jsx',
          '.android.tsx',
          '.ios.js',
          '.ios.jsx',
          '.ios.tsx',
          '.web.js',
          '.web.jsx',
          '.web.tsx',
          '.native.js',
          '.native.tsx',
        ],
        root: ['.'],
        alias: {
          '@navigation': './src/navigation',
          '@components': './src/components',
          '@assets': './src/assets',
          '@api': './src/axios-config',
          '@screens': './src/screens',
          '@services': './src/services',
          '@utils': './src/utils',
          '@store': './src/store',
          '@styles': './src/styles',
          '@env': './src/environments',
          '@cometchat': './src/cometchat',
          '@layout': './src/layout',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
