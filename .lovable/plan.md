

# 首页 4 项修复计划

## 1. For You 轮播 — 加大 + 3D 倾斜 + 丝滑水平切换动效

当前 `ForYouShowcase` 容器只有 `height: 200`，卡片太小；切换时虽有 `translateX` 但缺少 3D 透视倾斜效果。

**修改**：
- 容器高度改为 `280px`，`maxWidth: 1100px`
- 外层加 `perspective: 1200px` 开启 3D
- 中心卡 `width: 380px`，两侧 `width: 200px`，首尾 `width: 160px`
- 3D 倾斜效果：
  - 左侧卡片：`rotateY(35deg) scale(0.82)`，左偏移
  - 右侧卡片：`rotateY(-35deg) scale(0.82)`，右偏移
  - 中心卡：`rotateY(0) scale(1)`
  - 第 2/4 位：`rotateY(±18deg) scale(0.9)`
- 切换时使用 `transition: all 0.65s cubic-bezier(0.33, 0, 0.2, 1)` 实现丝滑平移
- 保留圆角和 `overflow: hidden`
- 左右箭头间距保持 `16px`

**关键**：用 `transform-style: preserve-3d` 让 3D 旋转生效，每张卡根据与 center 的距离计算 `rotateY` 和 `translateZ`。

## 2. Inspiration Labs 卡片底部恢复半透明玻璃蒙层

当前第 573-579 行的蒙层 div 仍然存在，但文字在它之外（第 580-584 行），导致蒙层与文字分离，视觉上蒙层不可见或不对。

**修改**：
- 把文字放回蒙层 div 内部，蒙层自适应文字高度
- 蒙层样式：`background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.75) 100%)`
- `padding: 40px 12px 12px`，文字在蒙层内自然撑开
- 删除第 580-584 行的独立文字 div，合并进蒙层

## 3. glowPulse 光晕闪烁放慢

当前 `animation: glowPulse 0.6s ease 5` — 0.6s 一次太快。

**修改**：
- `glowPulse` 动画时长从 `0.6s` 改为 `1.2s`
- 总闪烁 5 次，总时长约 6 秒
- `setTimeout` 从 3000 改为 6500（`1.2s * 5 + 余量`）
- 保持柔光 halo 不变

## 4. 快速导览配色统一为深蓝渐变

当前 QUICK_LINKS 用了 5 种不同的蓝绿色 CSS 变量。统一改为深蓝色系渐变，更沉稳高级。

**修改**：
- 将 6 个快速导览圆形背景改为统一的深蓝色调，但每个略有渐变差异以保持区分度
- 配色方案：使用深蓝 → 靛蓝渐变，每个圆圈用不同角度或微调色相
  - All: `linear-gradient(135deg, #1e3a5f, #2d5a8e)`
  - Toolkit: `linear-gradient(135deg, #1a3352, #264d7a)`
  - Lab: `linear-gradient(135deg, #162d4a, #1f4470)`
  - Assets: `linear-gradient(135deg, #1b3557, #2a5285)`
  - AIdeo World: `linear-gradient(135deg, #142840, #1c3d65)`
  - Fun: `linear-gradient(135deg, #112238, #19365c)`
- 直接在 QUICK_LINKS 数组中把 `bg` 改为渐变字符串，渲染时用 `background` 而非 `backgroundColor`

## 涉及文件
1. `src/pages/Home.tsx` — ForYouShowcase 3D 重做、Labs 蒙层修复、快速导览配色、glowPulse 时长
2. `src/index.css` — 无需改动（glowPulse keyframes 不变，只改组件内引用的 duration）

