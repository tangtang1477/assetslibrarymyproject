

# 首页输入区改造 + 订阅页 + Make按钮统一 + Kling付费引导

## 1. 新建订阅页 `/subscribe`

**新建文件 `src/pages/Subscribe.tsx`**

按照提供的 CSS 严格还原：

- **外层容器**：`width: 1622px`，`height: 914px`，`overflow-y: scroll` + `hide-scrollbar`，居中于页面
- **Banner 区**：`1491px × 176px`，`padding: 32px 64px`，`gap: 16px`，`border-radius: 32px`，`background: rgba(113,240,246,0.05)` + `box-shadow: inset 0px 0px 80px 15px rgba(113,240,246,0.2)`
  - 标题 "The Road to 1 Million: Celebration Sale!" — 24px bold，`#71F0F6`
  - 副文 + 限时信息 — 16px bold，`#FFFFFF`
- **Credit Purchase 区**：`1491px × 158px`，同背景+圆角
  - "Need more credits?" — 20px bold
  - 说明文字 — 16px bold，60% 白
  - 底部 "$0.01 per credit" — 14px SF Pro bold
  - 右侧金额按钮组（+100/$1, +500/$5, +1000/$10）— 各 `86~99px × 38px`，DIN Alternate 14px bold
  - Custom Amount 输入框 `197×38` + Buy 按钮 `89×38`（青色 `#71F0F6`）
- **Period 切换**：`172×46`，黑底圆角100，Monthly 文字 + Annual 白色药丸
- **"Tailored for all"** 标题 — 20px SF Pro bold
- **"Premium Perks"** 副标题 — 16px SF Pro 400，60% 白
- **4 张套餐卡片**：在 `1473×626` 深灰容器（`#252828`，`border-radius: 17.68px`）内
  - 卡片 `278.52×498.68`，间距均分
  - 背景色分别 `#1C2020`、`#252E2F`、`#000`、`#000`
  - 第3/4张后面分别有 `292.66×532.28` 的青色/紫色装饰条
  - Subscribe Now 按钮 `227×44`，蓝色光晕模糊，文字 `#71F0F6`
  - 青色小标签 `80×17.68`（`#71F0F6`，圆角 4.42）
- **三态交互**：按钮和卡片都有 normal / hover / active（pressed）三种状态
- **右上角退出按钮**：X 图标，点击 `navigate(-1)` 返回上一页

**路由注册**：`App.tsx` 加 `<Route path="/subscribe" element={<Subscribe />} />`

**Sidebar 钻石图标**：修改 `Sidebar.tsx`，让 `iconSubscribe` 按钮 `onClick={() => navigate("/subscribe")}`

## 2. 输入框区域大改造

**删除**：
- 角色选择列表（`CHARACTERS` 区域 + `Character Cast List` 整块）
- `@` 弹出角色菜单
- `selectedCharacter` 相关逻辑
- Lock Character 组件

**新增素材引用功能**：

状态新增：
- `uploadedAssets: { id, name, thumbnail }[]` — 模拟已上传素材（最多9个）
- `referencedAssets: number[]` — 已引用的素材 ID 列表
- `showAssetPanel: boolean` — 素材引用浮层是否展开

**素材位区域**（替代原来角色选择的位置）：
- 在输入框上方显示已上传素材的缩略图网格
- 每个素材位是一个小方块（圆角8px），点击 `+` 模拟上传（每次点击增加一个素材，使用现有 asset-char 图片，名称"图片1"~"图片9"）
- 最多 9 个
- 被引用的素材显示紫色 `@` 徽标

**已引用素材区**（输入框上方）：
- 已引用的素材以小卡片/标签形式水平排列
- 每个卡片包含：缩略图 + 名称 + `×` 删除按钮 + 紫色 `@` 胶囊徽标
- 删除时淡出 + 轻微缩小动效

**`@` 触发浮层**：
- 用户在输入框输入 `@` 时，在输入框上方展开"素材引用"浮层
- 浮层样式：浅色半透明背景、大圆角（16px）、弱阴影、弱边界
- 标题"素材引用"弱化显示
- 列表中每项：左侧缩略图 + 右侧"图片N"名称，大触控块
- 展开动效：opacity 淡入 + 轻微 y 轴上浮（`translateY(8px) → 0`），200ms
- 选中后：素材加入已引用区，浮层自然收起
- 吸附动效：选中时卡片有轻微的落位过渡

## 3. Make 按钮文案统一

修改 `MakePill` 组件：
- 所有模型的右下角按钮文案统一显示 **"Make"**
- 去掉 `10/s` 积分消耗显示
- 不再从 `config.cta` 取文案

## 4. Kling 模型付费引导

- 删除 `config.lockCharacter` 和 Lock Character 组件（已在第2步删除）
- 删除 `config.locked` 相关逻辑
- 当 `selectedModel === "kling"` 时：
  - MakePill 文案变为 **"Subscribe Now"**
  - 点击 MakePill → `navigate("/subscribe")`
  - 去掉积分消耗显示

## 涉及文件

| 文件 | 操作 |
|------|------|
| `src/pages/Subscribe.tsx` | 新建 — 完整订阅页 |
| `src/pages/Home.tsx` | 大改 — 删角色选择、加素材引用、Make 统一、Kling 引导 |
| `src/components/Sidebar.tsx` | 小改 — 钻石图标跳转 `/subscribe` |
| `src/App.tsx` | 小改 — 加 `/subscribe` 路由 |

