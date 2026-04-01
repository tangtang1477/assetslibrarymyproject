
# 首页修订计划

## 目标
这次不做泛泛微调，而是直接修正 5 个“用户能感知到没改”的问题：模型 pill hover、For You 尺寸与水平切换、pill 闪烁光晕、GlassButton 默认态、明日再来触发方式。

## 1. 模型选择 pill 补全 hover 态
当前 `ModelPillDropdown` 只有 open / flash，没有 hover 态；用户 hover 时不会出现边框增强、背景提亮、外圈 glow。

实施：
- 给触发按钮增加 hover 视觉层级：
  - 背景从 `rgba(255,255,255,0.06)` 提升到 `rgba(113,240,246,0.10)`
  - 边框变为 `rgba(113,240,246,0.38)`
  - 外圈 glow 用柔和阴影，不用实心 ring
- open 态与 hover 态区分：
  - hover = 轻 glow
  - open = 更强 glow + 更亮边框
- 下拉项本身也补 hover：icon 微发光、右侧提示箭头或高亮层，避免只是 `hover:bg-white/5`

## 2. For You 轮播重做为真正“水平切换”
我核对了现状：虽然尺寸已经写成 220px，但卡片仍然是绝对定位静态 coverflow，没有“滑动经过”的运动感，所以用户会觉得根本没改。

实施：
- 保留 5 卡结构，但改为“轨道式”切换：
  - 用一个 track 容器包住 5 张可见卡
  - 点击左右箭头时，通过统一 transform/left 插值让所有卡片一起横向位移
  - transition 用更丝滑的 cubic-bezier
- 修正布局约束，避免遮挡：
  - 整体放回箭头中间的安全区
  - 最大高度控制在不压到输入框/下方导航的范围内
  - 首尾卡与左右箭头固定 16px
  - 中心卡尺寸明显大于两侧，但总高度不越界
- 增加动画细节：
  - 卡片切换时同时带轻微 scale / opacity / rotateY 过渡
  - 禁止因 React 重建 DOM 导致“瞬移”
- hover 圆点仅保留在中心卡内部底部 4px，不参与切换控制

## 3. 模型 pill 闪烁改成“玻璃按钮同款光晕”
当前 `glowPulse` 是实心 box-shadow 脉冲，观感偏硬，不是你要的“漂亮的光晕”。

实施：
- 把 `modelPillFlash` 的动画改成与玻璃按钮 hover 同风格：
  - 以外发光为主，不加实心填充脉冲
  - 颜色与主题青色一致
  - glow 半径更大、更柔和，像 hover 到玻璃按钮时的高光
- 动画规则：
  - 5 次
  - 每次由弱到强再回落
  - 不改变按钮本体填充，只强化外圈和边框反光
- `Try Surprise` 后仍然自动触发，3 秒左右结束

## 4. GlassButton 改成更像苹果液态玻璃
我核对了当前 `.glass-btn-v2`：默认态确实偏淡，主体只有浅渐变底色 + 顶部 gloss，不够像“液态玻璃”。

实施：
- 强化默认态，不等 hover 才可见：
  - 提高主体填充存在感
  - 增加更真实的内高光、底部冷色反射、边缘折射感
  - 保留你当前青蓝配色，不改成黄色
- 结构上改成三层观感：
  1. 主体半透明液态填充
  2. 渐变边框高光
  3. 顶部高光 + 底部柔和 cyan glow
- hover:
  - 发光增强
  - 边缘更亮
  - 阴影更扩散
- active:
  - 按压缩放保留
  - 发光同步略收缩
- 统一应用到：
  - `Check It Out`
  - `Subscribe Now`
  - `Make`
  - 其他复用玻璃按钮的位置

## 5. “明日再来”触发方式做成可见的 dev 入口
当前代码里虽然有 `quotaExhausted`，但没有任何 UI 入口，所以用户不知道怎么触发。

实施：
- 增加一个明确、可发现的测试入口，仅开发态展示：
  - 方案优先：放在弹窗右上角关闭按钮附近，加一个小型文字切换入口
  - 文案如：`Simulate exhausted`
- 点击后：
  - `quotaExhausted` 在 true/false 间切换
  - 标题/副标题/主按钮文案即时联动
- exhausted 态主按钮点击：
  - 轻微 shake 0.8s
  - 不切模型
  - 然后关闭或保持，按你之前确认的方案执行
- 这样你在预览里可以直接复现“Come Back Tomorrow”交互，不需要猜隐藏手势

## 涉及文件
- `src/pages/Home.tsx`
- `src/index.css`

## 技术细节
- `ModelPillDropdown` 需要拆出 hover/open/flash 三套视觉状态，不能再只靠 inline style 的二元切换。
- `ForYouShowcase` 需要从“静态绝对定位”升级到“带统一位移动画的轨道/槽位系统”，否则看起来不会像水平滚动播放。
- `glowPulse` 需要重写，目标是柔光 halo，不是实心 ring。
- `.glass-btn-v2` 默认态要增强液态玻璃层次：填充、折射、边缘、内高光、底部反射一起做。
- `quotaExhausted` 需要一个显式 UI toggle，否则测试不可达。
