# 4项修改计划

## 1. @ 下拉框修正 + 输入框滚动结构重组

**问题**：@ 下拉框被遮挡；位置固定不跟随 @ 字符；输入框整体滚动而非仅 prompt 部分滚动。

**改法（`src/pages/Home.tsx`）**：

### 下拉框跟随 @ 定位

- 在 `handleInputChange` 中，当检测到 `@` 时，用 `textareaRef.current` 的 `selectionStart` 获取光标位置，结合 textarea 的位置计算 @ 字符的像素坐标
- 简化方案：创建一个隐藏的 mirror `<span>` 元素，将 textarea 中 `@` 之前的文本放入其中，测量其宽度作为下拉框的 `left` 偏移
- 下拉框 `position: absolute`，`top` 为当前行下方（约 `lineHeight + 4px`），`left` 与 @ 字符左对齐
- `z-index: 99999` 确保不被任何元素遮挡

### 输入框结构重组 — 固定顶部素材位和底部工具栏，中间 prompt 区可滚动

- 外层容器去掉 `overflowY: auto`，改为 `display: flex; flexDirection: column`，`maxHeight: 1600px`
- **顶部**（固定）：素材上传格子（Row 1），`flex-shrink: 0`
- **中间**（可滚动）：引用缩略图 + textarea 区域，`flex: 1; overflowY: auto; hide-scrollbar`
- **底部**（固定）：筛选项 + Make 按钮栏，改为 `position: relative`（从 `absolute bottom: 8` 改为 flex 布局底部），`flex-shrink: 0`

## 2. 弹窗的文案部分修改

副标题：8s修改为15s

正文：for videos up to 1 minutes修改为 for making whole video

## 3. For You 轮播 — 尺寸梯度加大 + 间距统一 + 切换动效修复

**问题**：中间尺寸和最小尺寸区别不明显；间距不一致；切换有闪烁。

**改法（`src/pages/Home.tsx` — `ForYouShowcase`）**：

### 尺寸梯度加大

- 中心（slot 2）：`height: 220, scale: 1.08` — 不变
- 中间（slot 1/3）：`height: 185, scale: 0.95`（原 200/1.0 → 185/0.95）
- 首尾（slot 0/4）：`height: 155, scale: 0.82`（原 180/0.92 → 155/0.82）
- opacity: `1 / 0.78 / 0.55`（原 0.85/0.65 → 差距加大）

### 箭头距页面边缘更近

- 去掉箭头外层 gap，箭头直接贴近页面左右（gap 改为 `padding: 0 8px`）

### 修复切换闪烁

- **关键**：去掉 `key={startIndex-slotPos}`，改为 `key={slotPos}`（固定 key），让 React 复用 DOM 节点而非重新挂载，这样 CSS transition 才能生效
- 图片 src 的切换通过 `visibleIndices` 数据驱动，不触发 DOM 重建
- 保持 `transition: all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)`

### 间距统一

- `gap: 12` 保持不变，但确保 `flex-1` 让 5 张卡片均分宽度

## 4. 右上角功能区重组 + 积分详情 + 购买弹窗

**问题**：左下角4个icon需要转移到右上角，需要积分详情下拉框和购买弹窗。

### 删除 Sidebar 底部 icon

- `src/components/Sidebar.tsx`：删除 `bottom-6` 的4个 icon（Subscribe、Profile、Notice、More）

### 右上角布局重组（`TopRightHeader` 组件）

从左到右排列：

1. **Free Credit** — 礼物 icon + 文字，pill 样式（已有）无需改变
2. **当前积分** — 四角星 icon + 数字 `427` + 下拉箭头 `ChevronUp/Down`，点击展开积分详情
3. **通知** — 铃铛 icon（已有）
4. **更多** — `iconMore` icon
5. **Subscribe Now** — glass button（已有）
6. **个人头像** — `iconProfile` icon，圆形

### 积分详情下拉框（新组件 `CreditPanel`）

参考图一，从积分按钮下方弹出：

- **头部**：`Available Credits` + 大号数字 `427` + `Buy Credits` 按钮（右侧）
- **分割线**
- **Credit History** 标题
- **列表项**：每项包含左侧（名称 + 日期 + 可选标签），右侧（正负积分，绿色正/红色负）
  - 示例数据：Seedance2.0Fast -75, +68 Daily Free Credits 等
- 样式：白色圆角卡片，`width: 380px`，`border-radius: 16px`，深色主题适配（暗色背景 `rgba(28,30,34,0.98)`）
- 三态：点击箭头展开/收起，hover 列表项高亮

### 购买积分弹窗（新组件 `BuyCreditsModal`）

参考图二，居中弹窗：

- 标题：`Buy Credits` + 右上角关闭 X
- **3×3 网格**（实际 3行，前两行3个，第三行左侧1个输入框）：
  - Row 1：100/$1, 500/$5, 1000/$10
  - Row 2：2000/$20, 5000/$50, 10000/$100
  - Row 3 左侧：Custom 输入框（用户自填数量）
- 每个选项卡片：四角星 icon + 大号积分数 + 小号价格
- 选中态：青色描边 + 浅青色背景（参考图二第一个选中的 500）
- 三态交互：normal（浅灰背景）/ hover（轻微亮度提升）/ selected（青色描边+浅青bg）
- 底部：全宽黑色 `Buy Now` 大按钮
- 弹窗 `width: 520px`，`border-radius: 20px`，暗色背景

### 交互链路

- 点击积分区的箭头 → 展开/收起 `CreditPanel`
- 在 `CreditPanel` 点击 `Buy Credits` → 打开 `BuyCreditsModal`
- 在 `BuyCreditsModal` 选择档位 → 点击 Buy Now（模拟交互）

## 涉及文件


| 文件                           | 操作                                                    |
| ---------------------------- | ----------------------------------------------------- |
| `src/pages/Home.tsx`         | 大改 — 输入框结构重组、@ 定位、ForYou 修复、TopRightHeader 重组、积分/购买组件 |
| `src/components/Sidebar.tsx` | 小改 — 删除底部4个 icon                                      |
