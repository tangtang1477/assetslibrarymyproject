# 5项修改计划

## 1. For You 轮播改造

**当前问题**：5个视频gap不均匀、未铺满页面、小圆点是拉长形、默认自动轮播、无缩放滑动效果。

**改法** — `ForYouShowcase` 组件重写：

- 展示 5 个卡片，宽度铺满整个页面（减去左右箭头+16px间距），5个卡片之间 gap 相等
- 首尾卡片距离左右箭头间距 16px
- 删除 `setInterval` 自动轮播，仅点击左右箭头切换
- 小圆点指示器改为：仅 hover 轮播区域或切换操作时显示（淡入淡出），所有圆点尺寸一致（6px圆形），当前位置圆点亮度更高（纯白），其他为半透明白
- 点击箭头时做丝滑的缩小放大滑动动效（中心卡片放大、两侧卡片缩小，transition 0.5s cubic-bezier）
- 存入记忆，锁定此行为

## 2. 素材区移入输入框内部 + @ 交互修正

**当前问题**：素材区在输入框上方；@选中态有青色色块；placeholder和素材不在同一行；输入@不显示字符只显示下拉框；下拉框在上方且太大太透明。

**改法**：

- 素材位移到输入框内部第一行（`px-6 pt-4`区域），选中引用后（点击素材位右下角的@键和在placeholder后输入@下拉选择）会在下一行同一位置出现已引用素材缩略图
-  placeholder 和已引用素材缩略图在同一行内排列，这两者都在素材位的下一行
- 点击素材右下角@后选中态：仅保留青色描边（`border: 2px solid #71F0F6`），去掉@键后面的青色色块（`background: "#71F0F6"` 的小块删除）
- 输入@时：正确在输入框中显示@字符，同时在@字符下方弹出引用列表
- 引用列表下拉框改造：出现在输入框内部@文字下方（而非输入框外），背景改为不透明深色（`rgba(20,20,22,0.98)`），z-index 提高，添加三态交互（normal / hover / active）
- 在下拉框中点击素材也会在 placeholder 后出现该素材缩略图，键盘点击delete键就可以删除该素材

## 3. Make 按钮文案改为四角星 + "18/s"

**当前问题**：`MakePill` 当前显示 "Make" + Sparkles icon。

**改法**：

- 将 Make + Sparkles icon 放前面，后面添加文字`18/s`
- 保持 `padding: 8px 16px`

## 4. Surprise → Seedance 2.0 文案替换

**改法**：全局替换 `Home.tsx` 中所有 "Surprise" 文案：

- `MODEL_OPTIONS[0].label`: "Surprise" → "Seedance 2.0"
- 弹窗标题: "Meet Seedance 2.0 — The Most Powerful Video Model on MovieFlow"
- 弹窗副标题： "MovieFlow now supports Seedance 2.0, with 50,000 free daily spots for 8s clip creation."
- "Try Surprise" 按钮 → "Try Seedance 2.0"
- `handleTrySurprise` 中 `setSelectedModel("surprise")` 保持不变（仅文案变）
- `config.placeholder` 中 "Surprise" → "Seedance 2.0"

## 5. 右上角消息通知

**改法**：

- 添加状态 `showNotification`，点击 Make 按钮时设为 true
- 通知面板出现在页面右上角（fixed定位，`top: 80px, right: 32px`），参考截图样式：
  - 白色/浅色圆角卡片，标题 "Notification" + "New" 徽标
  - 内容：Your video is in progress. We’ll notify you when it’s ready.
  - 右上角有关闭按钮
- 出现动效：从右侧丝滑滑入（`slideInRight` + `fadeIn`），200-300ms
- 出现后固定在右上角，手动关闭
- 点击右下角铃铛icon也会在icon右侧8px的位置出现一样的消息列表

## 涉及文件


| 文件                              | 操作                                                |
| ------------------------------- | ------------------------------------------------- |
| `src/pages/Home.tsx`            | 大改 — ForYou重写、素材区移入、Make文案、Surprise→Seedance、通知组件 |
| `mem://design/for-you-carousel` | 新建 — 锁定 ForYou 行为规则                               |
