# WebGL Image Viewer

一个高性能的WebGL图片查看器React组件，支持超高分辨率图片的流畅缩放、平移和硬件加速渲染。

## ✨ 特性

- 🚀 **硬件加速**: 基于WebGL的GPU渲染
- 🖼️ **高分辨率支持**: 使用基础纹理和按需瓦片，实际能力受浏览器解码、最大纹理尺寸和可用内存限制
- 📱 **跨平台兼容**: 支持桌面和移动设备的鼠标、触摸操作
- 🎨 **平滑动画**: 物理感的缓动动画，提供流畅的用户体验
- ⚡ **性能优化**: 按需更新瓦片、限制每帧瓦片请求数量、释放纹理和异步任务
- 🔧 **高度可配置**: 丰富的配置选项和回调函数
- 🐛 **调试支持**: 内置调试模式，方便开发和优化

## 📦 安装

```bash
npm install @afilmory/webgl-viewer
# 或
yarn add @afilmory/webgl-viewer
# 或
pnpm add @afilmory/webgl-viewer
```

## 🚀 快速开始

```tsx
import { WebGLImageViewer } from '@afilmory/webgl-viewer'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <WebGLImageViewer
        src="/path/to/your/image.jpg"
        className="image-viewer"
        onZoomChange={(originalScale, relativeScale) => {
          console.log('Zoom changed:', { originalScale, relativeScale })
        }}
      />
    </div>
  )
}
```

## 📁 项目架构

工作区源码结构：

```
src/
├── index.ts                 # 公共组件、类型和 LoadingState 导出
├── interface.ts             # Props、Ref、交互配置和调试数据类型
├── constants.ts             # 默认交互配置
├── enum.ts                  # 加载状态枚举
├── shaders.ts               # WebGL 着色器及编译工具
├── texture.worker.js        # 图片解码和瓦片位图生成
├── ImageViewerEngineBase.ts # 引擎基础接口
├── DebugInfo.tsx            # 调试面板
├── WebGLImageViewer.tsx     # React 组件与生命周期
└── WebGLImageViewerEngine.ts # WebGL 渲染、交互和资源管理
```

### 🏗️ 架构设计

#### **单一职责原则**

- `interface.ts`: TypeScript类型定义和接口
- `constants.ts`: 所有配置常量和默认值
- `texture.worker.js`: 在 Worker 中解码图片并按请求生成瓦片位图
- `ImageViewerEngineBase.ts`: 定义引擎缩放、加载和销毁接口
- `shaders.ts`: WebGL着色器源代码和编译工具
- `DebugInfo.tsx`: 独立的调试信息显示组件
- `WebGLImageViewer.tsx`: React组件包装器，处理生命周期
- `WebGLImageViewerEngine.ts`: 核心WebGL引擎，包含所有功能实现

#### **主要功能**

- ✅ WebGL渲染管线完整实现
- ✅ 图像加载和纹理管理
- ✅ 鼠标和触摸事件处理
- ✅ 平滑动画系统
- ✅ 缩放和平移约束
- ✅ 调试信息实时显示
- ✅ 组件卸载时清理纹理、Worker、定时任务和监听器
- ✅ TypeScript类型安全

## 🎯 核心功能

### 交互支持

- **鼠标操作**: 拖拽平移、滚轮缩放、双击切换
- **触摸操作**: 单指拖拽、双指缩放、双击放大
- **键盘操作**: 由宿主应用绑定快捷键，并通过组件 Ref 调用缩放方法

### 动画系统

- **平滑缓动**: 使用四次方缓出函数
- **可配置时长**: 支持自定义动画时间
- **调度方式**: 动画通过 `requestAnimationFrame` 更新；帧率取决于设备和图片负载

### 约束系统

- **边界限制**: 可选的图像边界约束
- **缩放限制**: 可配置的最小/最大缩放比例
- **智能居中**: 自动适应屏幕尺寸

## 📚 API 文档

### 基础属性

| 属性               | 类型     | 默认值   | 描述                                                       |
| ------------------ | -------- | -------- | ---------------------------------------------------------- |
| `src`              | `string` | **必需** | 图片源URL                                                  |
| `className`        | `string` | `""`     | CSS类名                                                    |
| `width` / `height` | `number` | 未指定   | 原图的预知像素尺寸，用于初始缩放计算；容器尺寸由父元素控制 |
| `initialScale`     | `number` | `1`      | 初始缩放比例                                               |
| `minScale`         | `number` | `0.1`    | 最小缩放比例                                               |
| `maxScale`         | `number` | `10`     | 最大缩放比例                                               |

### 交互配置

```tsx
// 滚轮配置
wheel?: {
  step: number              // 缩放步长，默认 0.1
  wheelDisabled?: boolean   // 禁用滚轮，默认 false
  touchPadDisabled?: boolean // 禁用触控板，默认 false
}

// 双指缩放配置
pinch?: {
  step: number             // 缩放步长，默认 0.5
  disabled?: boolean       // 禁用双指缩放，默认 false
}

// 双击配置
doubleClick?: {
  step: number            // 缩放步长，默认 2
  disabled?: boolean      // 禁用双击，默认 false
  mode: 'toggle' | 'zoom' // 双击模式，默认 'toggle'
  animationTime: number   // 动画时长，默认 200ms
}

// 拖拽配置
panning?: {
  disabled?: boolean        // 禁用拖拽，默认 false
  velocityDisabled?: boolean // 禁用惯性，默认 true
}
```

### 回调函数

```tsx
// 缩放变化回调
onZoomChange?: (originalScale: number, relativeScale: number) => void

// 图片复制完成回调
onImageCopied?: () => void

// 图片加载或处理失败回调；宿主应用可提供 DOM 图片回退
onImageLoadError?: (error: Error) => void

// 加载状态变化回调，LoadingState 从包入口导出
onLoadingStateChange?: (
  isLoading: boolean,
  state?: LoadingState,
  quality?: 'high' | 'medium' | 'low' | 'unknown',
) => void
```

### 组件引用方法

```tsx
import { useRef } from 'react'
import type { WebGLImageViewerRef } from '@afilmory/webgl-viewer'

const viewerRef = useRef<WebGLImageViewerRef>(null)

// 可用方法
viewerRef.current?.zoomIn(true) // 放大（可选动画）
viewerRef.current?.zoomOut(false) // 缩小（可选动画）
viewerRef.current?.resetView() // 重置视图
viewerRef.current?.getScale() // 获取当前缩放比例
```

## 🎮 使用示例

### 基础使用

```tsx
<WebGLImageViewer src="https://example.com/image.jpg" initialScale={1} centerOnInit={true} />
```

### 高级配置

```tsx
<WebGLImageViewer
  src="https://example.com/large-image.jpg"
  minScale={0.1}
  maxScale={20}
  wheel={{ step: 0.05 }}
  doubleClick={{
    mode: 'zoom',
    step: 1.5,
    animationTime: 300,
  }}
  onZoomChange={(original, relative) => {
    console.log(`Zoom: ${relative.toFixed(2)}x`)
  }}
  debug={true}
/>
```

### 使用引用控制

```tsx
import { useRef } from 'react'
import { WebGLImageViewer, type WebGLImageViewerRef } from '@afilmory/webgl-viewer'

function ControlledViewer() {
  const viewerRef = useRef<WebGLImageViewerRef>(null)

  return (
    <>
      <WebGLImageViewer ref={viewerRef} src="/image.jpg" />
      <div>
        <button onClick={() => viewerRef.current?.zoomIn(true)}>放大</button>
        <button onClick={() => viewerRef.current?.zoomOut(true)}>缩小</button>
        <button onClick={() => viewerRef.current?.resetView()}>重置</button>
      </div>
    </>
  )
}
```

## 🐛 调试功能

启用 `debug={true}` 可显示实时调试信息：

- **缩放信息**: 当前缩放比例和相对比例
- **位置信息**: X/Y轴平移量
- **Canvas信息**: 画布尺寸和设备像素比
- **图像信息**: 原始图像尺寸
- **性能信息**: WebGL最大纹理尺寸等

```tsx
<WebGLImageViewer
  src="/image.jpg"
  debug={true} // 显示调试面板
/>
```

## ⚡ 性能特性

### 渲染优化

- **硬件加速**: 基于WebGL的GPU渲染
- **动画调度**: 通过 `requestAnimationFrame` 更新缩放动画
- **瓦片调度**: 每帧最多发出 4 个瓦片请求；视口更新限制瓦片缓存检查频率

### 内存管理

- **自动清理**: 组件卸载时释放基础和瓦片纹理、缓冲区与程序，停止动画、延迟更新和 Worker
- **纹理优化**: 智能纹理尺寸计算
- **事件清理**: 完整的事件监听器清理

### 移动端优化

- **触摸优化**: 原生触摸事件处理
- **高DPI支持**: 自动适配Retina等高密度屏幕
- **调试信息**: 调试面板显示尺寸、缩放和瓦片状态；内存值为估算值

## 🔧 开发指南

### 构建项目

从仓库根目录运行：

```bash
pnpm --filter @afilmory/webgl-viewer build
```

### 类型检查

```bash
pnpm --filter @afilmory/webgl-viewer type-check
pnpm exec vitest run packages/webgl-viewer/src
```

构建、类型检查和测试分别执行。测试通过不代表所有浏览器、GPU 和图片尺寸都已覆盖。

### 添加功能

1. 在 `interface.ts` 中定义新的类型接口
2. 在 `constants.ts` 中添加相关配置常量
3. 在 `WebGLImageViewerEngine.ts` 中实现功能逻辑
4. 更新 `index.ts` 导出新的API

## 📈 构建输出

Vite 生成 ES 模块 `dist/index.js` 和类型声明。工作区直接使用 `src/index.ts`；发布时通过 `publishConfig` 指向 `dist`。产物体积随版本变化，以实际构建结果为准，不手动编辑 `dist`。

## 🔗 相关链接

- [WebGL API 文档](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [React Hooks 文档](https://react.dev/reference/react/hooks)
- [TypeScript 手册](https://www.typescriptlang.org/docs/)

## 📄 许可证

[MIT License](LICENSE)
