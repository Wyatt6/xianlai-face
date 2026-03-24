/** @type {import('tailwindcss').Config} */
export default {
  // *关键配置：
  // 指定Tailwind要扫描的文件路径（只扫描这些文件中的Tailwind类，未用到的类会被删除，以减小最终CSS体积）
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // 用于自定义主题（如新增颜色、修改字体）
  theme: {
    extend: {}
  },
  // 用于Tailwind插件（如添加额外的原子类）
  plugins: [],
  // *关键配置：
  // 关闭Tailwind基础样式，解决与ElementPlus组件基础样式冲突的问题
  // Tailwind只做布局和响应式，ElementPlus只做表格、表单等组件
  corePlugins: {
    preflight: false
  }
}
