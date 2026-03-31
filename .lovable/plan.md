
目标：这次不再“局部补丁”，而是把首页 Hero 区的 5 个核心问题一起重构到可用状态：For You、模型适配、下拉层级、弹窗、玻璃按钮。

1. 先把玻璃按钮体系彻底修正
- 用一个可复用的 `GlassButton` 基组件统一 `Make / Subscribe Now / Check It Out / 弹窗CTA`，不要再让 `MakePill` 和其他蓝色按钮各写一套。
- 严格按你给的 Figma 结构还原：外层浅蓝玻璃壳 + 内层发光模糊层 + 上层文字/图标层。
- 补齐默认 / hover / active / focus-visible 四态，hover 时蓝光晕增强，active 时轻微按压。
- `Check It Out` 当前“不可见”一起修：按钮内容层明确 `z-index`，banner 文案层和按钮层都提到遮罩之上，避免被背景/模糊层吞掉。
- 顺手把当前控制台里的 `GlassButton` ref warning 一起清掉，改成可安全复用的 `forwardRef` 写法。

2. 模型下拉改成 3 项，并按文档做输入框能力适配
- `MODEL_OPTIONS` 改为固定 3 项，顺序就是：
  1) `Seedance 2.0`
  2) `Kling 3.0`
  3) `Standard`
- 新增一个 `MODEL_CONFIG` 配置源，统一管理每个模型的：
  - placeholder
  - CTA 文案/图标
  - 参考图上限
  - style 数量
  - 辅助文案
  - 是否显示 `Lock Character`
  - 是否显示 Agent 思考交互
- 按文档映射成 3 种体验，但保留当前黑色毛玻璃输入框外观：
  - `Seedance 2.0`：旗舰模式，支持最多 5 张参考图，style 选项最多，保持当前最完整控制面板。
  - `Kling 3.0`：脚本/剧情模式，placeholder 改成 `Paste your script, let the Agent do the rest...`，高亮 `Lock Character`，参考图上限 4，CTA 改成 `Summon Agent`，点击后有简短 typing/分析感交互。
  - `Standard`：基础导演模式，placeholder 更简洁，参考图上限 3，CTA 回到普通生成流。
- 现在左上角静态 `+` 会改成真正的上传入口/参考图状态入口，不再只是装饰。
- 为了不把底栏挤爆，模型切换时会“替换型显示”控件，而不是无脑新增一排。

3. 所有选择下拉都改成真正向下展开，并且永远在最上层
- 当前问题的根因不是只有透明度，而是 Hero 区本身有 `overflow-hidden`，再叠加本地 `absolute` 下拉，导致菜单容易被裁切、被别的层盖住。
- 解决方式：把 `ModelPillDropdown` 和其他 `OptionPillDropdown` 都切到现有 `Popover` 方案，用 portal 挂到页面顶层。
- 统一规则：
  - 只从下方展开
  - 不再被 Hero / For You / section 遮挡
  - z-index 提到页面交互层最高级
  - 背景改成更实的深色磨砂面板，不再像现在这样太透看不清
- 模型下拉的 trigger 和 option 样式按你发的红框截图重做：
  - trigger 更宽
  - 左侧图标 + 中间标题 + 右侧箭头
  - option 行带 badge / 描述 / 选中勾
  - 选中项有整行高亮底

4. For You 改成默认展示 5 个 16:9 视频，并删掉标题
- 删除 `For You` 标题，只保留视频带、左右箭头、底部圆点。
- 现有 3 张图分组逻辑会改成真正的 5 槽位 coverflow 结构，不再是现在这种 3 图布局。
- 默认视觉结构：
  ```text
  [small] [medium] [large] [medium] [small]
  ```
- 要求全部满足：
  - 5 个都是 16:9
  - 中间最大
  - 第 2 / 4 个中尺寸
  - 首尾最小
  - 首尾加边缘拉伸/透视感，营造参考站那种立体感
- 左右箭头保留并补齐三态，点击后循环切换。
- 圆点保留在中间卡片下方。
- 数据层会改成“中心索引 + 5 槽位推导”，这样切换才自然。
- 资源上优先复用现有 `public/banner-video.mp4` + 不同 poster，先把结构、尺寸、切换和层级做准。

5. 弹窗改成更轻、更透的输入框同系毛玻璃
- 当前弹窗太厚重，会改成参考输入框那种更清透、更淡的玻璃质感。
- 外层遮罩保留，但减淡；内容容器改成：
  - 更低不透明度
  - 更柔和的 blur
  - 更细的高光边框
  - 更接近输入框的内阴影/玻璃质感
- 布局参考你最后一张图，但文案全部英文，主色统一 `#71F0F6`：
  - 顶部大图
  - 主标题
  - 亮点条目
  - 底部说明
  - 右下 CTA
- 这部分会切到现有 `Dialog`/portal 方案，保证关闭按钮、遮罩点击、Esc 关闭都稳定。

6. 这次会一起修掉的已知回归问题
- `GlassButton` / `AnnouncementModal` 的 ref warning
- `Check It Out` 不可见
- 下拉背景太透明、被遮挡、被裁切
- 模型下拉仍是旧的 2 项和旧文案
- `For You` 仍是 3 图而不是你要的 5 视频结构

技术细节
- 主要改动文件：`src/pages/Home.tsx`
- 直接复用现有：
  - `src/components/ui/popover.tsx`
  - `src/components/ui/dialog.tsx`
  - `public/banner-video.mp4`
- 建议新增的本地配置结构：
  ```text
  MODEL_CONFIG
  - seedance: maxRefs=5, styleCount=20, full controls
  - kling: maxRefs=4, script-first, lockCharacter, agent thinking
  - standard: maxRefs=3, simpler generate flow
  ```
- 玻璃按钮统一规则：
  ```text
  shell: rgba(69,196,246,0.05)
  glow : inset 6px 4px 5px 6px / rgba(69,196,246,0.6)
  hover: glow stronger + blur(10px)
  active: slight press + darker shell
  text/icons always above glow
  ```
- For You 布局将从“图片分组”改成“单列表 + 5 槽位变换”：
  ```text
  slot1 small
  slot2 medium
  slot3 large
  slot4 medium
  slot5 small
  ```
- QA 会重点核对：
  - 3 个模型切换后 placeholder / 上传上限 / CTA / 辅助控件是否同步变化
  - 所有下拉是否都只出现在下方且不再被遮挡
  - `Make / Subscribe Now / Check It Out` 的默认态、hover 态、active 态是否都清晰可见
  - For You 是否默认就是 5 个 16:9 视频且中间最大
  - 控制台是否不再出现 ref warning
