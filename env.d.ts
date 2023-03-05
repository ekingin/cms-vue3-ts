/// <reference types="vite/client" />

// 对导入的 .vue 文件声明
// vscode TypeScript Vue Plugin(Volar)会帮我们声明，但是导入的vue组件没有类型
// 因此，此处禁用插件，自己声明
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module '*.mjs'
