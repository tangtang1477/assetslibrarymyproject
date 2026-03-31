

# 修复计划：5项UI问题

## 1. 恢复 Free Credit 积分展示
**文件**: `src/pages/Home.tsx`

当前 `TopRightHeader` 只有 Free Credit 按钮和 Subscribe Now，缺少积分显示 `✦ 0`。

改动：
- 复制 `credit.svg`（四角星）和 `gift.svg`（礼物盒）到 `src/assets/`
- `TopRightHeader` 中：
  - Free Credit 按钮前面加 `gift.svg` icon（替换当前的🎁 emoji）
  - Free Credit 按钮后面加积分显示：`credit.svg` icon + `0`（用 `#71F0F6` 色）
  - 布局：`[gift icon] Free Credit` | `[credit icon] 0` | `Subscribe Now`

## 2. 修复 GlassButton + Check It Out
**文件**: `src/pages/Home.tsx`

当前 `GlassButton` 和 `Check It Out` 代码存在（第341行、381行），如果视觉上不可见可能是因为：
- 内层 glow div 的 `inset` 值不对导致按钮文字被遮盖
- 需要确保 `GlassButton` 的 `overflow: hidden` + 内层 glow 不超出

修复：
- GlassButton 加 `overflow: hidden`
- 内层 glow 改用 `inset: 6px 4px 5px 6px`（绝对定位）
- hover 态通过 CSS 增强光晕：`rgba(69,196,246,0.85)` + `blur(10px)`
- Subscribe Now 也确认使用相同结构

## 3. For You 样式调整
**文件**: `src/pages/Home.tsx`

参考截图，For You 区域是3张大图水平排列、中间图最大最突出、左右图较小有遮盖效果。当前用了5张图+百分比定位。

调整为更接近参考站的布局：
- 3张主要可见图片，左右各露出一小部分边缘
- 中间图最大，z-index 最高
- 左右图稍暗、稍小
- 底部加分页圆点指示器（当前set index）
- 轮播箭头保持不变

## 4. 下拉方向改为向下 + 视频banner + 模型下拉重新设计
**文件**: `src/pages/Home.tsx`

**下拉方向**：当前 `OptionPillDropdown` 用 `bottom-full`（向上展开），改为 `top-full mt-2`（向下展开）。

**视频banner**：当前已有 `<video>` 标签（第122行），但 `src="/banner-video.mp4"` 可能不存在。改为使用一个公开的演示视频URL或降级为图片。调整尺寸和遮罩使其更接近参考站（输入框后面的全宽视频背景）。

**模型下拉重新设计**（参考第二张截图-小云雀样式）：
- 模型选项每项包含：左侧icon + 标题 + 模型badge标签 + 可选NEW标签 + 描述文字
- 下拉顶部加标题 "Select Mode"（青色文字）
- 选中项右侧加 ✓ 
- 数据结构扩展：

```text
MODEL_OPTIONS = [
  { label: "Seedance", value: "seedance", badge: "Seedance 2.0", desc: "Full-featured Agent for images, clips & long videos", isNew: false },
  { label: "Kling", value: "kling", badge: "Kling 1.6", desc: "High-quality video generation with cinematic style", isNew: true },
]
```

- 专门为模型选择写 `ModelPillDropdown` 组件，不复用通用 `OptionPillDropdown`
- 每项高度约 72px，padding 12px 16px

## 5. 新增弹窗（参考最后一张图）
**文件**: `src/pages/Home.tsx`

设计一个符合当前网站UI的磨砂玻璃弹窗，参考最后一张截图的布局（2.0公告风格），文案改为英文，主色 `#71F0F6`：

结构：
- 右上角 X 关闭按钮
- 顶部大图区域（圆角，展示宣传图 — 用现有 banner 图片代替）
- 下方文字区：
  - 大标题：如 "The Most Powerful Model 2.0 is Coming"
  - 若干 ✓ 亮点条目（#71F0F6 色勾 + 文字，重点文字加粗）
  - 底部小字说明
  - 右下角 CTA 按钮（用 GlassButton 样式，文字如 "Get Started"）

样式：
- 背景：`rgba(26, 26, 26, 0.85)` + `backdrop-filter: blur(20px)` 磨砂玻璃
- 外层暗色遮罩 overlay（`rgba(0,0,0,0.6)`）
- 圆角 `20px`，padding `24px`
- 宽 `480px`，居中显示
- 关闭按钮：圆形，`foreground/10` 背景，hover 变亮

触发：页面加载时显示（可通过 state 控制，关闭后不再显示）

## 涉及文件
1. `src/pages/Home.tsx` — 所有改动集中于此
2. 复制 `credit.svg` → `src/assets/icon-credit.svg`
3. 复制 `gift.svg` → `src/assets/icon-gift.svg`

