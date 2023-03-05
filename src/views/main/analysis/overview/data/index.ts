import type { IUlListItem, IDesc } from '../types'

export const technologyStacksData: IUlListItem[] = [
  { label: '开发工具', desc: 'Visual Studio Code' },
  { label: '编程语言', desc: 'TypeScript ~4.7.4 + JavaScript' },
  { label: '构建工具', desc: 'Vite ^4.0.0' },
  { label: '前端框架', desc: 'Vue ^3.2.45' },
  { label: '路由工具', desc: 'Vue Router ^4.1.6' },
  { label: '状态管理', desc: 'Pinia ^2.0.30' },
  { label: 'UI 框架', desc: 'Element Plus ^2.2.32' },
  { label: '可视化', desc: 'Echart ^5.4.0' },
  { label: '富文本', desc: 'WangEditor ^5.1.23' },
  { label: '工具库', desc: 'Dayjs + Countup.js' },
  { label: 'CSS 预编译', desc: 'Less' },
  { label: 'HTTP 工具', desc: 'Axios' },
  { label: 'Git Hook 工具', desc: 'Husky' },
  { label: '代码规范', desc: 'EditorConfig + Prettier + ESLint' },
  { label: '提交规范', desc: 'Commitizen + Commitlint' },
  { label: '自动部署', desc: 'Centos + Jenkins + Nginx' }
]

export const programStandarmInfo: IDesc = {
  overview: '变量命名规范',
  list: [
    { label: '文件名', desc: '统一小写, 多个单词使用-分割' },
    { label: '文件夹名', desc: '统一小写, 多个单词使用-分割' },
    { label: '样式选择器名称', desc: '统一小写, 多个单词使用-分割' },
    { label: 'TS变量', desc: '小驼峰' }
  ]
}

export const gitOperationInfo = {
  list: [
    { label: 'add操作', desc: 'git add' },
    { label: 'commit操作', desc: 'npm run commit' },
    { label: 'pull操作', desc: 'git pull' },
    { label: 'push操作', desc: 'git push' }
  ]
}

export const componentDescInfo = {
  overview: '组件规范',
  list: [
    { label: '组件元素名称', desc: 'kebab-case' },
    { label: '组件元素属性', desc: 'kebab-case' },
    { label: 'JS书写方式', desc: 'setup script' },
    { label: '组件内容书写顺序', desc: 'script、template、style' },
    { label: '样式书写方式', desc: 'less' }
  ]
}
