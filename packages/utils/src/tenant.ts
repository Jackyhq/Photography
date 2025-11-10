// prettier-ignore
export const RESERVED_SLUGS = [
  // 基础系统路径
  'admin', 'root', 'system', 'internal', 'core', 'config', 'setup', 'install', 'init',
  'docs', 'documentation', 'guide', 'help', 'faq', 'manual',
  'support', 'contact', 'feedback', 'status', 'about', 'legal', 'terms', 'privacy',

  // 静态资源相关
  'api', 'apis', 'assets', 'static', 'cdn', 'storage', 'media', 'uploads', 'files',
  'images', 'img', 'videos', 'audio', 'documents', 'downloads', 'public', 'private',
  'shared', 'tmp', 'cache',

  // 组织 / 团队
  'team', 'workspace', 'workspaces', 'project', 'projects',
  'organization', 'org', 'company', 'community', 'forum', 'group', 'groups',

  // 用户 / 账户相关
  'user', 'users', 'profile', 'profiles', 'account', 'accounts', 'me', 'my',
  'auth', 'login', 'logout', 'register', 'signup', 'signin', 'forgot', 'reset', 'verify',

  // 业务逻辑 / 控制面板
  'dashboard', 'panel', 'console', 'control', 'settings', 'preferences',
  'manage', 'management', 'adminpanel', 'portal',

  // 通信 / 消息系统
  'chat', 'forum', 'discussion', 'thread', 'messaging', 'messages',
  'inbox', 'notifications', 'alerts', 'logs', 'events', 'activity', 'feed', 'timeline',

  // 数据 / 分析
  'reports', 'analytics', 'metrics', 'insights', 'monitor', 'monitoring',

  // 电商 / 支付
  'billing', 'payments', 'payment', 'subscriptions', 'subscription',
  'invoices', 'receipts', 'refunds', 'discounts', 'coupons', 'promotions',
  'offers', 'deals', 'sales', 'shop', 'store', 'purchases', 'orders', 'cart', 'checkout',

  // 站点级别
  'www', 'home', 'landing', 'index', 'holding', 'test', 'dev', 'beta', 'staging',

  // 其他常见保留词
  'search', 'explore', 'discover', 'new', 'create', 'edit', 'update', 'delete', 'remove',
  'api-docs', 'health', 'ping', 'robots', 'sitemap', 'manifest', 'favicon', 'version',
  'v1', 'v2', 'old', 'archive', 'preview', 'embed', 'share', 'link', 'connect', 'integrations',
  'oauth', 'callback', 'webhook', 'hooks',
] as const
export const RESERVED_TENANT_SLUGS = RESERVED_SLUGS

export type ReservedTenantSlug = (typeof RESERVED_TENANT_SLUGS)[number]

export function isTenantSlugReserved(slug: string): boolean {
  const normalized = slug.trim().toLowerCase()
  return RESERVED_TENANT_SLUGS.includes(normalized as ReservedTenantSlug)
}

export const DEFAULT_BASE_DOMAIN = 'afilmory.art'
