

# 首页 5 项重构计划

## 1. GlassButton — 彻底按 artlist.io `::before` 边框技术重做

当前 `.glass-btn-v2` 的 CSS 已经写了 `::before` + mask，但实际渲染可能因 `isolation: isolate` + `z-index: -1` 导致伪元素被吞掉（黑色背景下几乎不可见）。

**修复方案**：不再依赖 `z-index: -1`，改用真实内嵌 div 模拟边框光效，确保在任何层级下都可见：

- 外层 `background: rgba(113,240,246,0.06)` + `border-radius: 20px` + `overflow: hidden` + `position: relative`
- 内嵌一个绝对定位的边框层 div：
  - `inset: 0`，`border-radius: inherit`，`padding: 1px`
  - `background: linear-gradient(110.26deg, rgba(113,240,246,0.5) 4.24%, rgba(255,255,255,0) 64.28%), linear-gradient(0deg, rgba(58,58,57,0.6), rgba(113,240,246,0.6))`
  - 用 CSS mask content-box exclude 实现只显示边框
  - `pointer-events: none`
- 文字层 `position: relative; z-index: 1`
- hover: `box-shadow: 0 0 20px rgba(113,240,246,0.3)`
- active: `transform: scale(0.96)`
- **白色文字**（在深色玻璃边框上白色比蓝色更清晰），`font-weight: 700`

统一 `GlassButton`、`MakePill`、`Subscribe Now`、`Check It Out` 全部用这套。

**关键改动**：去掉 `isolation: isolate` 和 `z-index: -1`，改成内嵌 div 方案，彻底解决"看不见"问题。

## 2. For You 轮播修复

当前问题：尺寸不适配、与输入框/导航遮挡、无切换动效。

修改：
- 整体容器用 `max-height: 140px`，宽度限制在 `max-width: 900px` 居中
- 5 个槽位改为绝对定位方案（不再用 flex），通过 `left` 百分比计算位置
- 中间 `width: 30%`，第2/4 `width: 20%`，首尾 `width: 12%`
- 首尾透视 `rotateY(±25deg) scale(0.8)`，第2/4 `rotateY(±12deg) scale(0.9)`
- 左右箭头贴在容器两端，首尾视频距箭头 `16px`
- 切换时所有卡片同时做 `transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)`，实现丝滑平移
- 容器 `overflow: hidden` 防止溢出遮挡

## 3. 弹窗内容改为全英文 Surprise Campaign 文案

按用户提供的文档重做弹窗内容：

- 标题 24px: **Unlock Surprise for Free Today**
- 副标题 16px: **500 free daily spots for 8s storyboard creation**
- 亮点列表 16px，每行前面有 ✓ icon（`#71F0F6` 色）+ 右侧标签（如 `UNLIMITED` / `FREE`）：
  - **Use text, images, video, and audio together**
  - **Edit, extend, or connect clips with AI** → FREE
  - **Turn ideas into storyboards in seconds**
  - **Subscribe to unlock Surprise for videos up to 1 minute**
- 脚注 14px: **Free access resets daily. First come, first served.**
- 底部两个按钮：
  - 主按钮（渐变实心）: **Try Surprise** → 点击后关闭弹窗 + 自动切换模型到 Surprise
  - 次按钮（暗色）: **Subscribe Now**
- 保持当前配色/按钮样式/布局不变，只改文案和标签结构

## 4. 模型选择器改为 3 项 + 能力适配

`MODEL_OPTIONS` 改为 3 项：
1. **Surprise** — badge `Advanced`，desc: `Multimodal creation, editing, extension, and precise prompt control`
2. **Kling 2.0** — badge `Pro`，desc: `Better character consistency and long-script scene understanding`
3. **Standard** — badge `Recommended`，desc: `Balanced quality, speed, and control for daily creation`

默认选中 **Standard**。

下拉选项中每项左侧恢复 icon（用 Sparkles/Film/Zap 等 lucide icon），选项前方不出现 `Select Mode`。

`MODEL_CONFIG` 改为 3 项：
- `surprise`: placeholder `Create, edit, or extend with text, images, video, and audio...`，CTA `Generate with Surprise`，maxRefs 9，支持视频/音频上传，lockCharacter false
- `kling`: placeholder `Describe your story or paste your script...`，CTA `Direct Scene`，maxRefs 4，lockCharacter true，第一张图标 `Primary Character`
- `standard`: placeholder `Describe your story...`，CTA `Generate`，maxRefs 3

时长按模型动态：Surprise `4s/5s/10s/15s`，Kling/Standard `5s/10s`。

输入框联动：切换模型时同步更新 placeholder、CTA、上传区、Lock Character 等 UI。

## 5. 弹窗交互：Try Surprise 点击后联动

点击 **Try Surprise**：
1. 关闭弹窗
2. 自动切换 `selectedModel` → `surprise`
3. 输入框进入 Surprise 模式（placeholder / CTA / 素材区全部切换）
4. 输入框上方短暂显示 success banner（4-6秒后消失）：`You've unlocked Surprise for today — create an 8s storyboard free.`

---

## 涉及文件
1. `src/pages/Home.tsx` — 主要改动
2. `src/index.css` — `.glass-btn-v2` 样式改为内嵌 div 方案（或直接在组件内用 inline style 替代 CSS class）

