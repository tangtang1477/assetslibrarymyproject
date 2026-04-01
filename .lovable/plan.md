

# 首页 6 项修复计划

## 1. 右上角积分数量去掉背景
`TopRightHeader` 中积分展示区（显示 `0` 的那个 div）当前有 `background: "hsl(var(--foreground) / 0.08)"` 和 `padding: "8px 16px"`。去掉 background，保留 icon + 数字即可。

**改动位置**：`Home.tsx` 第 685 行，删除 `background` 和 `padding` 样式。

## 2. GlassButton 参考截图中黄色玻璃按钮样式重做
截图中的按钮特征：**实心填充渐变 + 圆润胶囊形 + 内部有光泽感**，不是纯边框按钮。

当前 `.glass-btn-v2` 只有微弱的 `rgba(113,240,246,0.06)` 底色 + `::before` 边框，在深色背景上几乎不可见。

**修复方案**：改为类似截图的**实心渐变填充按钮**：
- 背景：`linear-gradient(180deg, rgba(113,240,246,0.35) 0%, rgba(69,196,246,0.15) 100%)`
- 保留 `::before` 渐变边框效果（已有）
- 增加内层高光层：顶部 `linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 50%)` 模拟玻璃光泽
- 文字白色，`font-weight: 700`
- hover: 背景亮度增强 + `box-shadow: 0 0 24px rgba(113,240,246,0.4)`
- active: `scale(0.96)`

**改动位置**：`src/index.css` 的 `.glass-btn-v2` 样式。

## 3. "明日再来"交互触发
当前弹窗只有 `Try Surprise` 和 `Subscribe Now`。需要添加一个状态模拟 quota 用完的情况。

**方案**：添加一个 `quotaExhausted` state（默认 false），当为 true 时：
- 主按钮文案改为 `Come Back Tomorrow`，点击后按钮轻微 shake 0.8s 然后关闭
- 副标题改为 `Today's 500 free spots are gone.`
- 加一个 shake keyframe 动画到 CSS

用户可以通过某个方式切换此状态（比如在弹窗内长按标题 3 秒触发，或先暂时加一个 dev toggle）。实际生产环境由后端控制。

**改动位置**：`Home.tsx` AnnouncementModal + `src/index.css` 新增 `@keyframes shake`。

## 4. For You 轮播加大 + 水平滚动动效
当前 `height: 140` 太小，且没有真正的滚动切换动画。

**修复**：
- 容器高度改为 `220px`，`maxWidth: 1000px`
- 中间卡片 `width: 34%`，第2/4 `20%`，首尾 `12%`
- 点击左右箭头时用 `useState` + `key` 触发 CSS transition（当前已有 `transition: all 0.6s`，但 `key` 会阻止动画）
- **关键修复**：去掉 `key={${centerIndex}-${slot.offset}}`，改为 `key={slot.offset}`，让 React 复用 DOM 元素，CSS transition 才会生效
- 确保不与输入框和导航遮挡（`overflow: hidden` 已有）

**改动位置**：`Home.tsx` ForYouShowcase 组件（~第696-794行）。

## 5. 弹窗关闭后模型选择闪烁效果
点击 `Try Surprise` 后，模型选择器 pill 需要主题色光晕闪烁 5 次后消失。

**方案**：
- 新增 state `modelPillFlash`，在 `handleTrySurprise` 中设为 true
- `setTimeout(() => setModelPillFlash(false), 3000)` — 3秒后停止
- 在 `ModelPillDropdown` 的 trigger 按钮上，当 flash 为 true 时加 CSS 动画类
- 新增 `@keyframes glowPulse` 到 CSS：`box-shadow` 在 `0 0 0 4px rgba(113,240,246,0.4)` 和 `0 0 0 0` 之间闪烁
- `animation: glowPulse 0.6s ease 5` — 闪 5 次后自动停止

**改动位置**：`Home.tsx`（传 flash prop 给 ModelPillDropdown）+ `src/index.css`（新增 keyframes）。

## 6. Inspiration Labs 卡片去掉 GlassButton，改为文字背后半透明蒙层
当前每个 Lab 卡片底部右侧有一个 `GlassButton`（`Check It Out`）。

**修改**：
- 删除 Lab 卡片中的 `GlassButton`（第591-596行）
- 底部蒙层已有（第569-577行），但需要调整为：
  - 蒙层高度自适应文字内容（不固定 `height: 136`）
  - 上边缘改为渐变过渡：`background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.75) 100%)`
  - 去掉 `boxShadow` 和 `backdropFilter`，改为纯半透明渐变
  - 文字直接放在蒙层内，自然撑开高度

**改动位置**：`Home.tsx` LABS 卡片渲染区（~第562-599行）。

---

## 涉及文件
1. `src/pages/Home.tsx` — 主要改动
2. `src/index.css` — GlassButton 样式 + shake/glowPulse keyframes

