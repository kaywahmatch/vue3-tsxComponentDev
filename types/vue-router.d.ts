export {};

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    /**
     * 权重
     */
    orderNo?: number;
    /**
     * 标题
     */
    title: string;
    /**
     * 是否忽略权限
     */
    ignoreAuth?: boolean;
    /**
     * 角色信息
     */
    roles?: RoleEnum[];
    /**
     * 菜单icon
     */
    icon?: string;
    /**
     * 当前页面过渡效果名称
     */
    transitionName?: string;
    /**
     * 是否不显示为面包屑
     */
    hideBreadcrumb?: boolean;
    /**
     * 是否隐藏子菜单
     */
    hideChildrenInMenu?: boolean;
    /**
     * 是否携带参数, 面包屑使用
     */
    carryParam?: boolean;
    /**
     * 是否为单个菜单
     */
    single?: boolean;
    /**
     * 当前活动菜单
     */
    currentActiveMenu?: string;
    /**
     * 不作为菜单的路由
     */
    hideMenu?: boolean;
    /**
     * 仅为菜单构建
     */
    ignoreRoute?: boolean;
    /**
     * 为子路由隐藏path
     */
    hidePathForChildren?: boolean;
  }
}
