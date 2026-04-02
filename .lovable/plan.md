# 8项修改计划

## 1. Asset Library 页 — 筛选项和内容卡片位置上移对齐

**问题**：从 My Project 切换到 Asset Library 时，Type 筛选按钮和下方内容卡片的垂直位置与 My Project 页的 AIdeo/Toolkit 按钮和瀑布流不一致，有明显跳动。

**改法**：`AssetFilterBar` 当前的渲染结构已经在 `TabBar` 的 `children` slot 内（`marginTop: 32` 位置），和 My Project 的 AIdeo/Toolkit 按钮共用同一个容器，理论上位置应该一致。检查 `AssetFilterBar` 内是否有额外 margin/padding 造成偏移，确保 `AssetFilterBar` 的第一行按钮和 AIdeo/Toolkit 按钮的顶边完全对齐。下方 `AssetLibrary` 内容也在同一个 `paddingTop: 32` 容器中，确认无额外间距。

**改后锁定**：在 memory 中记录此位置不可再改动。

## 2. Home 页 — banner 视频去圆角，与页面同宽

**问题**：视频 banner 有 `borderRadius: 16` 和 `left: 9, right: 9` 的内边距。

**改法**：

- 去掉 `borderRadius: 16` → `borderRadius: 0`
- 改为 `left: 0, right: 0`（或直接从 `left-9 right-9` 改为 `left-0 right-0`）使视频与页面同宽
- 其他不变

## 3. 输入框筛选项 — 加回 icon

**问题**：`OptionPillDropdown` 没有渲染 icon，虽然已有 `iconLanguage`、`iconEnhance`、`iconTime` 等图片导入。

**改法**：

- `OptionPillDropdown` 组件接收 `icon` prop（已在 interface 中声明但未使用）
- 在按钮内 label 前加上 `{icon && <img src={icon} ... />}`
- 调用处传入对应 icon：语言→`iconLanguage`，增强→`iconEnhance`，时间→`iconTime`
- 只加 icon，其他不改

## 4. 弹窗 Subscribe Now → 跳转订阅页

**问题**：弹窗非耗尽态的 "Subscribe Now" 按钮只是关闭弹窗，没有跳转。

**改法**：在 `AnnouncementModal` 的第二个按钮（非耗尽态显示 "Subscribe Now"）和耗尽态的第一个按钮（"Subscribe Now"）的 onClick 中加入 `navigate("/subscribe")`。需要将 `navigate` 传入 modal 或在 modal 内使用 `useNavigate`。

## 5. 订阅页 — Pro/Enterprise 色块位置 + Custom Amount 对齐

**色块位置**：当前 Pro 色块 `left: 656.06`、Enterprise 色块 `left: 987.63`，需要调整使其分别居中对齐到第3、4张卡片后方。卡片在 `1273.22px` 宽容器中，每张卡 `278.52px`，间距 `(1273.22 - 278.52*4) / 3 ≈ 53.05px`。第3张卡片 left = 2*(278.52+53.05) = 663.14，第4张 = 994.7。色块需要水平居中到卡片，但是视觉效果应该是上边更宽，左右下边距更窄，调整 left 值使色块中心对准卡片中心。

**Custom Amount 对齐**：当前 Custom Amount 输入框 `right: 64` 定位，但需要其左侧与上方 +100 按钮的左侧边框对齐。改为使用统一的 left 定位，或把两行放入同一个 flex 容器中 left 对齐。

## 6. Monthly/Annual 切换滑块平滑移动

**问题**：当前没有真正的滑块，是直接切换按钮 background。

**改法**：改为真正的滑块实现（类似 `RatioToggle` 的做法）：

- 容器内放一个 absolute 白色药丸作为滑块
- 根据 `period` 状态计算滑块 `left` 值
- Monthly 选中时滑块左侧距容器左侧 4px
- 用 `transition: left 0.3s ease` 实现平滑滑动
- 两个按钮文字颜色根据选中态切换

## 7. Make 按钮 padding 改为 8px/16px

**问题**：当前 `MakePill` 用 `px-[10px]`。

**改法**：改为 `padding: "8px 16px"`，同时调整 height auto。

## 8. 输入框素材区大改造

**删除**：

- 输入框内倾斜的素材上传按钮（`transform: rotate(-5.76deg)` 的那个）

**素材展示移到输入框上方**：

- 已上传素材在输入框上方的横排展示（保留当前的 `uploadedAssets` 网格）
- hover 时右上角出现白色半透明删除键，右下角出现青色 71F0F6`@` 键，做出具体的删除和引用效果交互：点击删除后该素材消失，点击右下角@键后在placeholder后显示小尺寸的素材缩略图同时素材位改素材中心默认态出现青色的@标识表示该素材已经被引用，如果用户在placeholder处删除已引用的图片那么默认态出现的青色的@标识消失
- 点击图片本身弹出放大预览（透明遮罩 + 大图，右上角有删除键关闭预览）
- 点击 `@` 后在 placeholder 处出现该素材小图

**已引用素材在输入框内的展示**：

- 去掉名字和外部容器，只在placeholder后显示小尺寸的素材缩略图
- 用户可用键盘 Delete 键删除已引用的图片

`**@` 弹出列表改造**：

- 宽度和内容自适应（不再全宽），出现在placeholder**下方**而非上方
- 中文部分替换为英文，标题"素材引用"替换为英文

**Placeholder 移到下行**：

- placeholder 文字和引用的素材小图在同一行，与素材位对齐

## 涉及文件


| 文件                                | 操作                                           |
| --------------------------------- | -------------------------------------------- |
| `src/pages/Home.tsx`              | 大改 — banner圆角、icon加回、素材区重构、Make padding、弹窗跳转 |
| `src/pages/Subscribe.tsx`         | 改 — 色块位置、Custom Amount对齐、Monthly/Annual滑块    |
| `src/components/AssetLibrary.tsx` | 小改 — 确认筛选项位置对齐                               |
| `src/components/TabBar.tsx`       | 可能微调 — 确保 children slot 无额外间距                |
| `mem://index.md`                  | 记录 Asset Library 位置锁定规则                      |
