import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const webview: AppRouteModule = {
  path: '/webview',
  name: 'WebView',

  redirect: '/webview/index',
  meta: {
    orderNo: 190,
    icon: 'ion:git-compare-outline',
    title: t('routes.demo.webview.webview'),
  },

  children: [
    {
      path: 'index',
      name: 'WebViewIndex',
      component: () => import('@/views/demo/webview/index.vue'),
      meta: {
        title: t('routes.demo.webview.index'),
      },
    },
  ],
};

export default webview;
