# 帮助中心面板修改 — 固定尺寸 + Messages 集成通知 + 位置对齐

## 要改的 3 点

### 1. 面板固定尺寸

当前面板 `maxHeight: 520`，但各 tab 内容高度不一致导致切换时面板大小变化。改为固定 `height: 520px`，内容区 `flex: 1` 填满。

### 2. Messages tab 显示真实通知

- `NotificationDropdown` 接收 `notifications` 数组 prop（从 `TopRightHeader` 传入，`TopRightHeader` 从 `Home` 接收）
- Messages tab：有通知时渲染通知列表（时间 + 内容），无通知时显示参考图中的空状态（消息气泡图标 + "没有消息" + "来自系统的消息将显示在此处"）
- 底部加 "向我们发送消息" 按钮（黑底圆角 + Send 图标，hover/active 三态）
- 点击 Make 产生的通知 toast 同时写入 notifications 数组，面板 Messages tab 同步显示

### 3. Help tab 改为文章列表

参照参考图（image-27），Help tab 不再是空状态，改为：

- 顶部搜索框 "Search for help"
- "5 collections" 标题
- 文章分类列表（Getting Started / Subscription, Refund and Payment / Topview Popular Tools / Editing You Video / Basic Trouble Shooting Guide），每项显示标题 + 描述（可选）+ 文章数 + ChevronRight
- 每行 hover/active 三态

### 4. 面板位置改为 fixed 定位

当前面板 `position: absolute` 相对于铃铛按钮。改为 `position: fixed`，`top: 80px`，`right: 32px`（与通知 toast 位置一致），确保面板和 toast 出现在同一位置。

## 涉及文件


| 文件                   | 操作                                                                                                                      |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `src/pages/Home.tsx` | 重写 `NotificationDropdown`（固定高度、接收 notifications prop、Messages/Help 内容）；`TopRightHeader` 传 notifications；通知 toast 位置保持一致 |
