目标：只改你这次点名的4 处，其它区域不动。

1. 输入框改成“图文混排的 prompt composer”

- 现在的 `textarea + referencedAssets[]` 结构只能把素材缩略图固定渲染在一个位置，做不到“用户在任意位置输入 @，缩略图就插入到那个位置”。这一块需要从纯文本输入改成富文本/令牌化编辑区。
- 在 `src/pages/Home.tsx` 中保留现有三段结构不变：
  - 顶部素材位固定；
  - 底部筛选项 + Make 固定；
  - 只有中间 prompt 区滚动，`maxHeight: 1600px`，隐藏滚动条。
- 中间 prompt 区改为 mixed-content 数据模型（text / asset-ref），不再用当前“整段文字 + 单独引用数组”的固定展示方式。
- 用户在任意光标位置输入 `@` 时：
  - `@` 本身先正常显示；
  - 选中下拉素材后，删除这个 `@`；
  - 在当前光标处插入对应的素材缩略图 token；
  - 点击缩略图不取消引用。
- 行内对齐统一重做：文字与缩略图按同一行基线对齐，统一 `line-height: 28px`，缩略图 token 用 inline-flex / baseline 对齐，避免现在的错位感。
- 删除逻辑也改成“删除当前光标旁边的 token”，而不是现在这种只删最后一个引用。

2. @ 下拉框改成“跟随光标的最上层浮层”

- 现在看不见的根因不只是 z-index，而是下拉框被渲染在中间 `overflow-y-auto` 区域里，已经被滚动容器裁切了。
- 下拉框会从滚动层里移出来，改成挂在输入框外层或 portal 层，通过 caret / DOM Range 坐标定位到当前 `@` 的正下方，并且左边与 `@` 左对齐。
- 保持深色不透明背景、内容宽度自适应、最高层级，不再被 For You 或输入区裁掉。
- 只在当前光标仍处于 mention 上下文时显示；光标移走、选中素材、删除 `@` 后关闭。

3. 把订阅页的顶部三行文字的文案做修改，只修改文案内容，样式尺寸不修改。
  The Road to 1 Million: Celebration Sale!修改为MovieFlow Epic Sale:Unlock Seedance 2.0 & Bonus Time!    
  We're approaching 1,000,000 creators. Lock in our biggest annual savings before we hit the milestone.修改为Level up: Upgrade to annual plans to unlock exclusive access to Seedance 2.0 (above Ultra Annual) and Kling 3.0 (above Pro Annual).   
  ⏳ Limited Time Offer. Deal ends when we reach 1M users. 修改为⏳ Claim your massive bonuses: Get +6 Free Ultra months with Creator 2-Year, +3 Free months with Ultra Annual, or +1 Free month with Pro Annual.
4. For You 改成“卡片容器本身丝滑移动”，不是固定位置换内容

- 现在的问题是槽位固定、内容直接替换，所以用户看到的是内容闪切，不是你要的“原来旁边那张卡真的滑到中心并放大”。
- `src/pages/Home.tsx` 里的 `ForYouShowcase` 会改成：
  - 5 张卡按真实卡片 key 渲染；
  - 点击箭头后，已有卡片通过 transform / size / opacity / z-index 过渡到新槽位；
  - 用户看到的是卡片容器移动和缩放，而不是中心容器里换图。
- 三档尺寸继续拉开：
  - 中心最大；
  - 第 2 / 第 4 中等；
  - 首尾最小；
  - 最大卡尺寸保持不动。
- 间距不再平均：第 2 与第 1、更第 4 与第 5 更近；第 2 / 第 4 与中心的距离相对更开。这里会改成显式 slot transform/translateX 控制，不再只靠 `flex gap`。
- 保留 3D 透视和卡片内小圆点规则；修闪烁的关键是保持 DOM 复用，只让容器位置和尺寸动画，不做内容重挂载。

4. Buy Credits 主按钮只改样式

- `src/components/BuyCreditsModal.tsx`
- `Buy Now` 改成主题色底色、白色文字。
- 增加 3 态：
  - default：主题色实底；
  - hover：更亮、轻微发光；
  - active：轻压下沉/缩放。
- 不改积分档位、弹窗结构和文案。

涉及文件

- `src/pages/Home.tsx`：输入框 mixed-content 重构、@ 浮层重做、For You 容器动画重做
- `src/components/BuyCreditsModal.tsx`：主按钮主题色 + 3态
- `mem://design/for-you-carousel`：把旧的“equal gaps / 固定槽位换内容”约束更新为新的“容器位移动画 + 外侧更紧间距”锁定规则

技术说明

- 这次输入框不能再继续沿用 `textarea` 补丁方案，因为 `textarea` 无法把图片真正插入到用户输入的任意位置；如果继续修补，会反复出现“位置固定、对不齐、下拉框错位、被裁切”这些问题。
- 最稳的方案是：中间 prompt 区改为富文本式编辑层，素材引用作为 inline token；下拉框根据当前 caret 坐标定位到 `@` 下方；For You 改为“稳定 key + 槽位 transform 变化”的动画模型。
- 其余区域不动：顶部素材位、底部筛选项、Make 按钮、订阅页、Asset Library 锁定位置都不碰。