// 配置页面title
import defaultSettings from '@/settings'

const title = defaultSettings.title || '高得软件SaaS系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
