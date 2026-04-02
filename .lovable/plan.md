# 4项修改计划

## 1. @ 下拉框层级 + 选中后交互修正 + 输入框自适应

**问题**：下拉框被 ForYou 遮挡；选中后 @ 符号残留；placeholder 和缩略图垂直错位；输入框高度固定。

**改法（`Home.tsx`）**：

- **z-index**：素材引用浮层 `z-[100]` → `z-[9999]`，确保最上层
- **选中后逻辑**：`handleReferenceAsset` 中，选中素材后从 `inputText` 里移除末尾的 `@` 字符（`setInputText(prev => prev.replace(/@$/, ""))`）
- **垂直居中**：Row 2 的 flex 容器加 `items-center`，引用缩略图和 placeholder/textarea 在同一行垂直居中对齐。检查 textarea 的 `lineHeight` 与缩略图 `height: 28px` 匹配
- **输入框自适应高度**：去掉 textarea 固定 `height: 56`，改为 `minHeight: 28, height: "auto"`，textarea 用 `rows={1}` + JS 自动撑高。外层容器加 `maxHeight: 800, overflowY: "auto"` + `hide-scrollbar`

## 2. 小圆点定位器移入中心卡片内部

**问题**：圆点在轮播区域下方 `marginTop: 12` 位置。

**改法**：

- 将 dot 指示器从轮播容器下方移到中心卡片的 absolute 子元素内
- `position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%)`
- 移除外层 `marginTop: 12` 的 dot 容器
- 存入记忆，以后无论如何不许修改这个小圆点定位器

## 3. 卡片尺寸层级 — 首尾最小、二四中等、中心最大

**问题**：当前只有 center vs non-center 两档（220 vs 190）。

**改法**：三档尺寸

- `slotPos === 2`（中心）：height 220, scale 1.08
- `slotPos === 1 || slotPos === 3`（二四）：height 200, scale 1.0
- `slotPos === 0 || slotPos === 4`（首尾）：height 180, scale 0.92
- opacity 也分三档：1 / 0.85 / 0.65

## 4. 3D 透视 + 切换滑动效果

**问题**：缺少 3D 立体感和丝滑切换。

**改法**：

- 外层容器加 `perspective: 1200px`
- 根据 slotPos 计算 `rotateY`：
  - slot 0: `rotateY(35deg)` + `translateZ(-80px)`
  - slot 1: `rotateY(15deg)` + `translateZ(-30px)`
  - slot 2: `rotateY(0)` + `translateZ(40px)`（中心前凸）
  - slot 3: `rotateY(-15deg)` + `translateZ(-30px)`
  - slot 4: `rotateY(-35deg)` + `translateZ(-80px)`
- transition: `all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)`
- 切换时使用 `key={startIndex}` 保持动画连续性，不重新挂载

## 涉及文件


| 文件                   | 操作                                    |
| -------------------- | ------------------------------------- |
| `src/pages/Home.tsx` | ForYou 3D 透视改造、dot 移入卡片、@ 交互修正、输入框自适应 |
