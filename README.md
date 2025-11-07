# 健身器材报修页（Taro / React / NutUI）

一个用于提交健身器材报修的页面，支持照片上传、问题描述与必填校验，适配小程序端（亦可扩展到 H5）。

## ✨ 功能特性

- 照片上传（NutUI `Uploader`，图片预览模式）
- 问题描述文本域（字数统计可开关）
- 必填项校验与反馈（`Taro.showToast`）
- 视觉风格：卡片化、圆角、浅灰背景
- 样式体系：**TailwindCSS 实用类 + Less**（覆盖第三方组件细节）

## 🧱 技术栈

- **框架**：Taro + React (TypeScript)
- **UI 组件**：@nutui/nutui-react-taro
- **样式**：TailwindCSS（实用类）+ Less（局部覆盖）
- **单位**：`rpx`（小程序响应式像素）+ 少量 `px`

## 🗂️ 目录结构（示例）

```
src/
  pages/
    repair/
      index.tsx       # 页面逻辑与 JSX
      index.less      # 页面样式（覆盖 NutUI/布局细节）
      assets/         # 如有本地静态资源
  app.tsx / app.less  # 入口配置与全局样式
tailwind.config.js    # Tailwind 配置（若使用）
postcss.config.js     # PostCSS 管线（含 tailwindcss / autoprefixer）
```

## 🚀 快速开始

> 以下命令以 npm 为例，使用 pnpm/yarn 同理替换。

1. 安装环境
   ```bash
   # 全局安装 Taro CLI（如未安装）
   npm i -g @tarojs/cli
   ```

2. 安装依赖
   ```bash
   npm i
   ```

3. 运行开发（选择你的目标端）
   ```bash
   # 微信小程序
   npm run dev:weapp

   # H5（如已配置）
   npm run dev:h5
   ```

4. 打包构建
   ```bash
   npm run build:weapp
   # 或 npm run build:h5
   ```

> 实际脚本名称以你的 `package.json` 为准。如果没有这些脚本，我可以根据你的配置文件补全。

## 🖼️ 页面说明

核心组件位于 `src/pages/repair/index.tsx`：

- `Uploader`：限制张数、自动上传回调、受控 `value`。
- `TextArea`：受控 `value` 与 `onChange`。
- `Button`：提交点击校验，弹出提示。

## 🎨 样式说明

### 1) TailwindCSS（实用类）
在 JSX 中通过类名快速布局：
```tsx
<View className="repair-page bg-black-4 px-[32rpx] py-[48rpx]">
  <View className="repair-card rounded-[32rpx] bg-white px-[32rpx] pb-[64rpx] pt-[56rpx]">
    ...
    <TextArea className="mt-[24rpx] w-full rounded-[24rpx] bg-black-4 px-[24rpx] py-[24rpx] text-[28rpx] text-black-1" />
  </View>
</View>
```

> `bg-black-4`、`text-black-1`、`bg-yellow-1` 等多为**自定义主题色**，需在 `tailwind.config.js` 中扩展：

```js
// tailwind.config.js（示例）
module.exports = {
  content: ['./src/**/*.{tsx,ts,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'black-1': '#2a2a2a',
        'black-4': '#f7f5f3',
        'yellow-1': '#FFC107'
      }
    }
  },
  plugins: []
}
```

### 2) Less（覆盖第三方组件）
在 `index.less` 中针对 NutUI 选择器做精细化调整，例如上传框大小、文本域高度、按钮宽度：

```less
.repair-page { min-height: 100vh; }

.repair-card {
  box-shadow: 0 16rpx 32rpx rgba(#2A2A2A, 0.05);
}

/* 上传区域定制 */
.repair-uploader {
  .nut-uploader-upload.picture {
    width: 220rpx;
    height: 220rpx;
    border-radius: 10rpx;
    background: #f7f5f3;
    box-shadow: none;
  }

  .nut-uploader-icon-tip { display: none; }
}

/* 新增：按钮整行宽度与文本域固定高度 */
.repair-card .nut-button {
  width: 100%;
  display: block;
  border-radius: 9999rpx; /* 胶囊效果，可按需 */
}

.repair-card .nut-textarea__textarea {
  height: 240rpx;
  min-height: 240rpx;
  box-sizing: border-box;
}
```

> 如果你发现修改 `.nut-uploader-icon { font-size }` 没效果，原因通常是**内部为 SVG**。请同时覆盖内部 `svg`：
```less
.repair-uploader .nut-uploader-upload.picture .nut-uploader-icon svg {
  width: 56rpx !important;
  height: 56rpx !important;
}
```

## ✅ 表单校验逻辑

- 必填：至少 1 张图片 & 非空描述。
- 反馈：`Taro.showToast({ title, icon })`。

可接入实际接口：在 `handleSubmit` 中判断后发起 `Taro.request`/自定义请求方法，成功/失败分别提示。

## 🧩 自定义与扩展

- **上传张数**：`<Uploader maxCount={1|3} />`
- **描述最大字数**：`TextArea` 的 `maxLength` / `showCount`
- **按钮样式**：改 Tailwind 类或 Less 选择器（`.nut-button`）
- **颜色体系**：统一在 `tailwind.config.js` 的 `theme.extend.colors` 中维护

## ❓FAQ

- **为什么组件文件里没看到 Tailwind 的导入？**  
  Tailwind 通常在全局样式链路（PostCSS）里引入一次（如入口 `app.less`/`app.css`），组件无需单独导入。

- **为何改 `.nut-uploader-icon { font-size }` 没变大？**  
  图标为 **SVG** 时只改 `font-size` 无效。需同时改 `svg { width/height }`，或通过 `uploadIcon` 传入自定义 SVG。

- **`rpx` 与 `px` 的差别？**  
  `rpx` 会随设备宽度自适应，小程序端推荐；`px` 固定像素，不随屏幕变化。

## 🧪 代码质量建议

- 开启 ESLint + Prettier（统一风格）
- 组件属性受控化（`value` + `onChange`）
- 样式优先用 Tailwind，遇到第三方组件细节用 Less 覆盖

## 📜 许可证

MIT（如有自定义公司协议，可替换）
