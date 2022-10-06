import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '/@/enums/menuEnum';
import { RouterTransitionEnum } from '/@/enums/appEnum';

export interface MenuSetting {
  bgColor: string;
  fixed: boolean;
  collapsed: boolean;
  canDrag: boolean;
  show: boolean;
  hidden: boolean;
  split: boolean;
  menuWidth: number;
  mode: MenuModeEnum;
  type: MenuTypeEnum;
  topMenuAlign: 'start' | 'center' | 'end';
  trigger: TriggerEnum;
  accordion: boolean;
  closeMixSidebarOnChange: boolean;
  collapsedShowTitle: boolean;
  mixSideTrigger: MixSidebarTriggerEnum;
  mixSideFixed: boolean;
}

export interface HeaderSetting {
  bgColor: string;
  fixed: boolean;
  show: boolean;
  /** 显示消息中心按钮 */
  showNotice: boolean;
  showSearch: boolean;
}

export interface TransitionSetting {
  /**
   * 是否打开切换页面的动画
   */
  enable: boolean;

  /**
   * 路由基本切换动画
   */
  basicTransition: RouterTransitionEnum;

  /**
   * 是否打开页面切换加载
   */
  openPageLoading: boolean;

  /**
   * 是否打开顶部进度条
   */
  openNProgress: boolean;
}

export interface ProjectConfig {
  /** 全屏显示主界面，菜单不显示，顶部显示 */
  fullContent: boolean;

  /** 是否显示logo */
  showLogo: boolean;

  /** 是否显示全局页脚 */
  showFooter: boolean;

  /** menuType: MenuTypeEnum; */
  headerSetting: HeaderSetting;

  /** menuSetting */
  menuSetting: MenuSetting;

  /** 定义动画的配置项对象 */
  transitionSetting: TransitionSetting;

  /** 是否启用keep-alive */
  openKeepAlive: boolean;

  /** 显示面包屑 */
  showBreadCrumb: boolean;

  /** 显示导航图标 */
  showBreadCrumbIcon: boolean;

  /** 是否开启回顶部 */
  useOpenBackTop: boolean;

  /** 切换接口时是否删除未关闭消息和通知 */
  closeMessageOnSwitch: boolean;

  /** 切换接口时是否取消已发送但未响应的http请求 */
  removeAllHttpPending: boolean;
}

export interface GlobConfig {
  /** 网站标题 */
  title: string;

  /** 服务接口url前缀 */
  urlPrefix?: string;

  /** 本地代理服务接口url前缀 */
  proxyUrlPrefix?: string;
}
export interface GlobEnvConfig {
  /** 网站标题 */
  VITE_GLOB_APP_TITLE: string;

  /** 服务接口url前缀 */
  VITE_GLOB_API_URL_PREFIX?: string;

  /** 简称 */
  VITE_GLOB_APP_SHORT_NAME: string;

  /**
   * API环境
   */
  VITE_API_ENV?: sring;
  /** SCRM host */
  VITE_GLOB_SCRM_HOST: string;
}
