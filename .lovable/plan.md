

# 首页重构计划（10项改动）

## 概览
根据用户 10 个需求点 + PDF 文档中的4阶梯模型体系，对 `src/pages/Home.tsx` 进行全面重构。

---

## 1. 视频 Banner 替换 + 下边缘模糊
- 复制 `user-uploads://kling_20260304_...mp4` → `public/banner-video.mp4`
- Banner 区域参考截图：圆角更大，底部加渐变黑色模糊遮罩（`linear-gradient(transparent 60%, black 100%)`），不再用整面暗色 overlay
- 高度和圆角参考截图调整（约 `height: 400px`, `border-radius: 16px`）

## 2. 弹窗关闭按钮和图片重叠修复
- `AnnouncementModal` 的 `X` 按钮从 `right:16, top:16` 调整到不与顶部图片重叠的位置
- 方案：把关闭按钮移到弹窗容器右上角外侧（`right: -8, top: -8`），或在图片区上方留足 padding

## 3. GlassButton 样式彻底还原
当前 CSS hover/active 已在 `src/index.css` 中定义（`.glass-btn:hover .glass-btn-glow`），但按钮可能仍不可见。

根因分析：
- `GlassButton` 和 `MakePill` 的 glow 层可能遮盖了文字
- 需要确保文字层 `z-index: 2` 且 glow 层 `z-index: 1`
- 外层 shell 的 `background: rgba(69,196,246,0.05)` 要确保可见
- Check It Out 按钮在 lab 卡片底部，可能被 `backdrop-filter` 吞掉

修复：
- GlassButton 内层 glow 加 `z-index: 1`
- 文字层确保 `z-index: 2`（已有 `relative` + `zIndex: 2`）
- 外层加 `border: 1px solid rgba(69,196,246,0.15)` 让按钮在默认态也可见
- Lab 卡片的 Check It Out 确保在 `z-10` 之上

## 4. For You 立体效果增强 + 缩小 + 丝滑轮播
- 缩小整体高度让一屏能容下5个：中间 `height: 280px`，中间 `width: 35%`，第2/4 `width: 22%`，首尾 `width: 14%`
- 首尾加更强的透视拉伸：`perspective(500px) rotateY(±25deg) scale(0.85)`
- 第2/4：`perspective(700px) rotateY(±12deg)`
- 添加 `transition: all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)` 实现丝滑切换动画

## 5. 模型下拉框重做（4阶梯体系）
按 PDF 文档改为4个选项，去掉 "Select Mode" 字样：

| Tab | 前端展示 | badge | desc |
|-----|---------|-------|------|
| 1 | ⚡ Fast-Gen | Free | Instant text-to-video, daily free credits |
| 2 | AI Director | Standard | Character consistency, reference images, storyboarding |
| 3 | 🎬 Story Agent | ✨ New | Script-driven Agent with character lock & auto scenes |
| 4 | 🌪 Cinematic | Ultra | Cinema-grade physics, lighting & unlimited styles |

- Seedance/Kling 后面加 NEW icon（用 `iconNewBadge`）
- Standard 后面的 badge 改为 "MF"
- 去掉下拉顶部 "Select Mode" 标题

## 6. 语言和时长下拉框修改
- 缩小宽度：trigger `padding: 0 12px`，移除 icon（枚举项前不带 icon）
- 语言扩展到36种（含中日韩英法德西葡意俄等常见语言）
- 下拉内容区用 `max-height: 280px` + `overflow-y: auto` + 隐藏滚动条（`.hide-scrollbar`）

## 7. Enhance on 选中态颜色
- 当下拉选项被选中时，文字颜色改为 `#71F0F6`（当前用的是 `text-primary`，需确认 CSS 变量 `--primary` 对应 `#71F0F6`）

## 8. 横竖比例切换滑块丝滑动画
- `RatioToggle` 改成带滑块背景的切换：
  - 在两个按钮后面加一个绝对定位的圆角背景 div
  - 用 `transform: translateX()` + `transition: transform 0.3s ease` 实现丝滑滑动
  - 选中态背景色 `hsl(var(--foreground) / 0.15)`

## 9. 按文档做4阶梯模型适配
`MODEL_CONFIG` 改为4项，切换模型时输入框同步变化：

| 模型 | placeholder | CTA | maxRefs | 特殊UI |
|------|-----------|-----|---------|--------|
| Fast-Gen | "Describe your scene..." | ⚡ Generate | 0 | 隐藏上传按钮 |
| AI Director | "Describe your story..." | Generate | 3 | 5种风格，上传3图 |
| Story Agent | "Paste your script, let the Agent do the rest..." | 🚀 Summon Agent | 4 | Lock Character 高亮，点击CTA有打字机效果 |
| Cinematic | — | 🎟 Join Waitlist | 5 | 输入框锁定（毛玻璃不可输入），背景播放demo视频，中心悬浮闪烁按钮 |

- Cinematic(Ultra)选中时：
  - 输入框变为半透明锁定状态
  - 中心显示闪烁的 "Join Waitlist" 按钮
  - 点击弹窗提示邀请好友

## 10. 输入框上方角色选择 + @功能
- 在输入框上方添加角色列表：
  - 横向排列6个角色：Sara, Neko, Cindy, Queen, Sam, Jason
  - 每个角色：100x100 圆形头像 + 3px `#191E1F` 边框 + 底部名字（Arial 20px 白色）
  - 角色间距 `gap: 35px`，居中显示
  - 头像用 placeholder 色块（因为没有真实头像图片，用渐变色块代替）
  - 选中态：边框变为 `#71F0F6`
- 输入框内支持 `@` 触发：
  - 用户输入 `@` 时在光标位置弹出角色选择浮层
  - 选择后在输入中插入 `@角色名`
  - 需要把 `<span>` placeholder 改成真正的 `<textarea>` 或 contentEditable

---

## 涉及文件
1. `src/pages/Home.tsx` — 主要改动
2. `src/index.css` — 可能微调（已有 glass-btn 样式）
3. `public/banner-video.mp4` — 替换为用户上传的视频

## 技术要点
- 所有下拉继续用 `Popover` portal 方案
- For You 轮播用 CSS transition 而非 JS 动画库
- 角色 `@` 功能需要把当前静态 placeholder 改成可交互的输入组件
- Cinematic 模式的锁定态用 `pointer-events-none` + overlay 实现

