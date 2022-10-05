import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
import { resolve } from 'path';
import { createProxy } from './build/vite/proxy';
import { wrapperEnv } from './build/utils';
import { createVitePlugins } from './build/vite/plugin';
import pkg from './package.json';
import moment from 'moment';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: moment().format('YYYY-MM-DD HH:mm:ss'),
};

export default ({ command, mode }: ConfigEnv): UserConfig => {
  console.log('------mode-----', mode);

  const isBuild = command === 'build';

  if (isBuild) {
    process.env.NODE_ENV = 'production';
  }

  const root = process.cwd();

  const env = loadEnv(mode, root);

  console.log('-------env-------', env);

  //  loadEnv读取的布尔类型是一个字符串。这个函数可以转换为布尔类型
  const viteEnv = wrapperEnv(env);

  console.log('---------viteEnv------', viteEnv);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
      },
      terserOptions: {
        compress: {
          keep_infinity: true,
          // 用于在生产环境中删除控制台
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      // 关闭brotlize显示可以略微减少包装时间
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve('src/design/var/index.less')}";`,
          },
          javascriptEnabled: true,
        },
      },
    },

    //  项目使用的vite插件。数量大，分开提取和管理
    plugins: createVitePlugins(viteEnv, isBuild),

    optimizeDeps: {
      include: ['@iconify/iconify', 'moment/dist/locale/zh-cn', 'ant-design-vue/es/locale/zh_CN'],
      exclude: ['vue-demi'],
    },
  };
};
