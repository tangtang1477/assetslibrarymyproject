

# 通知面板重构 — 改为带底部 Tab 的完整面板

## 现状
当前 `NotificationDropdown` 是一个简单的下拉框，只有 All/Unread 两个顶部 tab 和通知列表。

## 目标
参照参考图，改成带 3 个底部 tab（Home / Messages / Help）的完整面板，主题色 cyan `#71F0F6`。

## 改法（`src/pages/Home.tsx` 中的 `NotificationDropdown`）

### 结构重写

```text
┌──────────────────────────────┐
│  Logo区 + ✕ 关闭按钮         │  ← 顶部 header
├──────────────────────────────┤
│                              │
│  Home Tab:                   │
│    "Hi Dear 👋               │
│     How can we help?"        │
│    ┌─ Send us a message ─→┐  │
│    ├─ Search for help ─🔍─┤  │
│    │ FAQ 列表项 + > 箭头   │  │
│    └──────────────────────┘  │
│                              │
│  Messages Tab:               │
│    空状态: 图标 + 文案       │
│                              │
│  Help Tab:                   │
│    空状态: 图标 + 文案       │
│                              │
├──────────────────────────────┤
│  🏠 Home  💬 Messages  ❓ Help│ ← 底部 tab bar
└──────────────────────────────┘
```

### 具体实现

1. **底部 Tab Bar**：3 个 tab — Home（`Home` icon）、Messages（`MessageSquare` icon）、Help（`HelpCircle` icon）。选中态：主题色图标 + 文字 + 底部指示条；未选中：`rgba(255,255,255,0.45)`；hover：`rgba(255,255,255,0.7)`；active：轻微缩放。

2. **Home Tab 内容**：
   - 顶部渐变背景区（主题色渐变），显示 "Hi Dear 👋 / How can we help?"
   - "Send us a message" 行 — 白底圆角卡片，右侧发送图标，hover 背景变灰，active 按压
   - "Search for help" 搜索框 — 输入框 + 搜索图标
   - FAQ 列表 — 4 条预设问题，每行右侧 `ChevronRight`，hover/active 三态

3. **Messages Tab**：空状态 — `MessageSquare` 图标 + "No messages yet" + 辅助文案

4. **Help Tab**：空状态 — `HelpCircle` 图标 + "Help center" + 辅助文案

5. **交互**：
   - 点击外部关闭（已有，保留）
   - 入场动画保留现有 `notifDropIn`
   - 所有按钮/列表项 hover（背景变亮 `0.04`→`0.08`）、active（缩放 `0.97`）三态
   - 关闭按钮 hover 高亮

6. **配色**：顶部 header 渐变用主题色系（从 `#71F0F6` 到深蓝紫），面板主体深色背景 `rgba(24,26,30,0.98)`，FAQ 卡片白色文字

### 涉及文件

| 文件 | 操作 |
|------|------|
| `src/pages/Home.tsx` | 重写 `NotificationDropdown` 组件 |

