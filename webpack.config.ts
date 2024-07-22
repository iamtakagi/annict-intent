import * as path from 'path';
import * as webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';

const config: webpack.Configuration = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    content: path.resolve(__dirname, 'src', 'content.ts'),
    popup: path.resolve(__dirname, 'src', 'popup.ts'),
    settings: path.resolve(__dirname, 'src', 'settings.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'manifest.json',
        },
        {
          from: 'ui/popup.html',
        },
        {
          from: 'ui/settings.html',
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
  // ES5 (IE11 対応)
  target: ["web", "es5"],
};

export default config;
