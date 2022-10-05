import type { Plugin } from 'vite';

import html from 'vite-plugin-html';

export function configHtmlPlugin(env: ViteEnv, isBuild: boolean) {
  const { VITE_GLOB_APP_TITLE, VITE_API_ENV } = env;

  const htmlPlugin: Plugin[] = html({
    minify: isBuild,
    inject: {
      // Inject data into ejs template
      injectData: {
        title: VITE_GLOB_APP_TITLE,
        runEnv: VITE_API_ENV,
      },
    },
  });
  return htmlPlugin;
}
