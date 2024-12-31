import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  // Important: always return the modified config
  return mergeConfig(config, {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      fs: {
        allow: [
          '/opt/app', // 既存の許可リスト
          '/opt/node_modules', // 新たに許可したいディレクトリ
        ],
      },
    },
  });
};
