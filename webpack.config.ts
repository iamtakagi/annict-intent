import * as path from 'path';
import * as webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';

const config: webpack.Configuration = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    content: path.resolve(__dirname, 'src', 'content.ts'),
    inject: path.resolve(__dirname, 'src', 'inject.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js',
        },
        {
          from: 'manifest.json',
        }
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: [/\.ts$/, /\.tsx$/],
        loader: 'ts-loader',
        options: { compilerOptions: { module: 'ESNext', moduleResolution: 'node' } },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};

export default config;
