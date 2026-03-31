

# 修改计划：标题 + 比例选择器

## 1. 标题改为参考站 MovieFlow 风格
**文件**: `src/pages/Home.tsx`

- 主标题改为: **"Your idea. A movie. In minutes."**
- 副标题改为参考站风格（或保留当前副标题）

## 2. 比例选择器改为 16:9 / 9:16（去掉1:1）
**文件**: `src/pages/Home.tsx`

- `RATIO_OPTIONS` 改为：
  - `{ label: "16:9", value: "16:9" }`
  - `{ label: "9:16", value: "9:16" }`
- 默认值改为 `"16:9"`
- pill 按钮内显示 CSS 绘制的比例矩形图标 + 比例文字 + 下拉箭头
- 新增 `RatioIcon` 组件用 CSS border 画矩形框：
  - `16:9` → 宽14px 高8px
  - `9:16` → 宽8px 高14px
- 下拉菜单每项也带对应比例图标，样式与其他下拉保持一致（`padding: 8px 16px`，`gap: 8px`）

## 涉及文件
- `src/pages/Home.tsx` — 标题文案 + RATIO_OPTIONS + RatioIcon组件

