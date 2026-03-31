

# 修复计划：7项UI问题

## 问题总结与方案

### 1. 侧边栏icon间距改为20px
**文件**: `src/components/Sidebar.tsx`
- 当前nav pill的`gap`是`12`，改为`20`
- 同时确保hover时40x40圆形和tooltip不会重叠（icon 24px + gap 20px = 44px间距，40px圆形刚好不重叠）

### 2. 恢复页面滚动（隐藏滚动条但保留滚动）
**文件**: `src/index.css`, `src/pages/Home.tsx`, `src/pages/Index.tsx`, `src/pages/Toolkit.tsx`
- 当前`body`有`overflow: hidden`，这是正确的（防止双滚动条）
- 问题在于各页面的主内容区需要`overflow-y: auto`配合`hide-scrollbar`类
- 检查Home页的`minHeight: 1180`容器是否限制了下方内容显示——当前结构中，快速导航和下方sections都在`</div>`闭合之后的`px-9 pb-16`区域，应该是可以滚动到的。需要确认`overflow-y-auto hide-scrollbar`确实生效
- 确保`html, body, #root`都是`height: 100%`，主容器`min-h-screen`

### 3. Home页样式结构按Figma修正
**文件**: `src/pages/Home.tsx`
- 根据图2参考，Home页整体结构已基本正确，主要微调：
  - 标题"Ideas Spark Movies"对应Figma的`top: 64px`
  - 输入框选项（EN/Enhance on等）在输入框内部底部，间距8px，距底部8px（当前是`bottom-2 gap-2`，改为`bottom-[8px] gap-[8px]`）
  - ForYou showcase距输入框32px，距快速导航32px（当前`mt-8`约32px，OK）
  - 快速导航行间距`gap: 64px`对应Figma

### 4. Assets页Type筛选下方卡片间距与My Project一致
**文件**: `src/pages/Index.tsx`
- 当前`paddingTop: 32`在content区。对比My Project里AIdeo/Toolkit按钮到ProjectGrid的距离也是32px。
- 问题可能是TabBar内的`marginTop: 32`（筛选区到横线）加上Index.tsx的`paddingTop: 32`（筛选区到卡片）。需要确保两者相等且一致。
- 实际检查：My Project的AIdeo按钮在TabBar内`marginTop: 32`，然后Index.tsx `paddingTop: 32`到ProjectGrid。Asset Library的filter也在TabBar内同样`marginTop: 32`，然后同样`paddingTop: 32`到AssetLibrary grid。逻辑上应该一致。
- 如果用户仍说不对，需要确保AssetFilterBar的filter dropdown高度不会影响——可能filter dropdown button高度和AIdeo/Toolkit TabButton高度不同导致视觉差异。统一高度。

### 5. 新增"切换模型"下拉选项
**文件**: `src/pages/Home.tsx`
- 在输入框底部选项的最前面加一个模型选择下拉
- 选项：Seedance、Kling
- 下拉样式参考图3：深色背景圆角容器，每项`padding: 8px 16px`，icon与文字间距8px，字体Arial Regular 16px/16px
- 下拉位于所有选项首位
- 不同模型选中时可以在后续扩展展示不同功能，首版先做UI切换

### 6. 所有输入框下拉选项样式统一
**文件**: `src/pages/Home.tsx`
- 需要把上传的SVG icon复制到`src/assets/`：
  - `user-uploads://语言.svg` → `src/assets/icon-language.svg`
  - `user-uploads://魔法棒_1.svg` → `src/assets/icon-enhance.svg`
  - `user-uploads://time.svg` → `src/assets/icon-time.svg`
  - `user-uploads://new.svg` → `src/assets/icon-new-badge.svg`
- 每个OptionPill改为可点击展开下拉的组件
- 下拉容器：深色背景(`#1a1a1a`或类似)、圆角、border `foreground/10`
- 每项：icon 16x16 + 8px间距 + 文字(Arial Regular 16px/16px) + padding 8px/16px
- 三态：默认（foreground/70）、hover（foreground/100 + bg foreground/10）、选中（primary色文字）
- EN下拉展示语言列表，Enhance on展示开/关，6min展示时间选项等

### 7. My/Public切换改为青色滑块丝滑滑动
**文件**: `src/components/AssetLibrary.tsx`
- 去掉当前的两个独立按钮样式
- 改为一个容器内含"My"和"Public"两个tab，容器内有一个绝对定位的青色背景滑块
- 滑块用`transition: transform 0.3s ease`实现丝滑滑动效果
- 滑块位置根据选中的tab计算`translateX`
- 每个选项padding 8px/16px，字号16px/24px，文字居中

## 涉及文件清单
1. `src/components/Sidebar.tsx` — gap改20px
2. `src/index.css` — 确认滚动设置
3. `src/pages/Home.tsx` — 主要改动：输入框选项间距、新增模型下拉、下拉样式统一
4. `src/pages/Index.tsx` — 确认padding一致性
5. `src/components/AssetLibrary.tsx` — My/Public滑块动画
6. `src/components/TabBar.tsx` — 可能需要统一filter按钮高度
7. 新增icon资产文件4个

## 技术细节

**滑块实现方式**：
```text
Container: relative, rounded-full, bg foreground/8, border
Slider:    absolute, rounded-full, bg primary, transition transform 300ms
           width = 选中按钮宽度, translateX = 选中按钮偏移
My/Public: relative z-10, 文字在滑块上方
```

**下拉组件模式**：
```text
OptionPillDropdown:
  - state: open/closed, selectedValue
  - trigger: 带icon的pill按钮，点击toggle
  - dropdown: absolute定位，top: 100% + 4px
  - 每项: flex row, icon 16x16, gap 8px, text, padding 8/16
  - click outside关闭
```

