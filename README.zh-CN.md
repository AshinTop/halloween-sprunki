[English](README.md) · [简体中文](README.zh-CN.md) · [Español](README.es.md) · [Português (Brasil)](README.pt-BR.md) · [日本語](README.ja.md)

# Pumpkin Jam 南瓜音乐会 — 万圣节原创音乐创作与记忆小游戏

🎃 给南瓜鼓手找几个幽灵队友吧。温暖鼓点、冒泡低音、糖果铃声和月光和声，会在 Pumpkin Jam 的小舞台上凑成一支原创乐队。选好角色、按下播放，再一层层换声音，听四个小声部怎样改变整个夜晚。

**[立即试玩](https://halloween-sprunki.crazy3d.org/)** · [浏览全部 12 款万圣节游戏](https://github.com/AshinTop/halloween-games) · [⭐ 在 GitHub 点亮 Star](https://github.com/AshinTop/halloween-sprunki)

README 提供五种语言版本。**游戏界面目前仅支持英语和简体中文**；文档翻译不代表新增了对应界面语言。

![南瓜音乐会的万圣节音乐创作界面，展示四名怪物演奏者、音色选择和播放控制](docs/images/gameplay.jpg)

## 这款游戏有什么特别

- 鼓点、低音、旋律、和声四个声部，每个声部有两位原创角色。
- 三个预设、三种隐藏乐队组合，替换角色会在下一小节整齐进入。
- 逐轨静音、独奏、移除和总音量控制，方便听清每个声部的作用。
- 幽灵回声：用四个音符完成五轮音乐记忆挑战，没有答题倒计时。
- 原创 SVG 角色与浏览器合成乐器，支持编曲链接和减少动态效果。

## 怎么玩

每个声部选择一名角色，或先用预设开场。按 **Start / 开始音乐** 后才会发声，浏览器需要这次主动操作来启动音频。点击其他角色即可替换对应声部；桌面也可以拖动到匹配的舞台位置。低音角色不能放进旋律声部。

所有乐段统一使用 **96 BPM、C 小调、每小节 16 个十六分音符步进**。播放时更换角色，会先显示等待状态，在下一小节开始时一起进入。静音可以暂时隐藏一轨；独奏只听指定轨；移除会清空该声部。

### 挑战幽灵回声

点击“听小幽灵演奏”，记住亮起角色对应的音符，再按相同顺序敲四个音符按钮。五轮从三个音符逐步增加到七个。答错可以重听再试。打开回声挑战会暂停乐队；页面隐藏会暂停播放并取消尚未完成的试听流程。回来后，主动点击播放或试听即可继续。

## 操作方式

| 操作 | 输入方式 |
| --- | --- |
| 选择演奏者 | 点击角色卡；桌面也可拖到对应声部 |
| 播放或暂停 | 播放按钮；焦点不在控件或弹窗时按**空格** |
| 调整声部 | 角色下的静音、独奏和移除按钮 |
| 总音量 | 音量滑块 |
| 重复回声音符 | 轮到自己时使用四个音符按钮或 **1–4** |
| 分享编曲 | 打开分享窗口，再复制显示的链接 |

## 一点小策略

先放鼓点和低音，再逐个加上旋律与和声，会更容易听出每次变化。用独奏认识一轨，再恢复全队合奏。隐藏组合需要在正确的完整乐队实际播放时发现：取消所有静音、关闭独奏，保持音量大于零，并等下一个小节到来。

## 存档与挑战链接

编曲、静音状态、音量、语言、已发现乐队和回声成绩保存在当前浏览器。不同浏览器分别记录；存储不可用时仍可玩。

这个[编曲示例链接](https://halloween-sprunki.crazy3d.org/#mix=v1-1010-0000)记录四个角色及各轨静音设置，不包含独奏状态。朋友打开后需自己按播放，才会听到组合。分享的是配置，没有上传录音，也不会自动播放声音。

## 实机界面截图与视频介绍

![南瓜音乐会在紧凑 iframe 中的乐器选择与开始播放按钮](docs/images/mobile.jpg)

实际游戏在紧凑浏览器 iframe 中的截图，用于展示小窗口布局，不代表实体手机测试。

[打开视频播放器与文字介绍](https://halloween-sprunki.crazy3d.org/intro.html) · [下载 MP4](docs/media/intro.mp4)

**24 秒无声介绍视频**由真实游戏截图与字幕编排而成，用于介绍画面与玩法，并非连续操作录像或音效演示。

## 常见问题

### 这是第三方 Sprunki 游戏的模组吗？

不是。本作拥有为项目创作的角色、插画、合成乐器、音乐模式和代码，是同一站点系列中的原创万圣节音乐小游戏。

### 为什么没有声音？

先按开始音乐，再检查总音量、各轨静音、设备音量和浏览器声音权限。页面从隐藏状态返回后，也需要重新主动点击播放或试听。

### 可以录音或导出歌曲吗？

当前版本可以分享编曲链接，不录制麦克风，不导出 WAV 音频，也不上传演奏。

## 本地运行与嵌入

在仓库根目录启动 HTTP 服务：

```sh
python3 -m http.server 4173
```

打开 **http://localhost:4173/**。无需构建或安装依赖；直接使用 `file://` 可能阻止 JavaScript 模块加载。

使用 Node 运行内置检查：

```sh
npm test
```

检查覆盖编曲链接、隐藏组合、音乐事件、回声序列，以及用模拟时钟运行的实际音频调度器，包括后台长时间停顿和取消操作。这些检查不代表已测量实体设备音频延迟，也不能代替真人试听。

```html
<iframe src="https://halloween-sprunki.crazy3d.org/?embed=1"
  title="Pumpkin Jam"
  style="display:block;width:100%;height:654px;border:0"
  allow="autoplay; fullscreen" allowfullscreen></iframe>
```

浏览器布局检查覆盖 **1160×654、390×794、390×650、844×340**。小窗口中的预设和额外说明放入紧凑弹窗。需要 Web Audio 与 JavaScript 模块支持。iframe 的 autoplay 权限不会代替玩家点击开始，隐藏页面回来后也不会自行恢复声音。

尺寸、存储、焦点和权限说明见[嵌入文档](EMBEDDING.md)。请按扣除主站工具栏后的实际剩余高度设置 iframe。

## 继续逛逛万圣节小游戏集

- **[Midnight Rhythm Parade](https://halloween-rhythm-parade.crazy3d.org/)** · [源码](https://github.com/AshinTop/halloween-rhythm-parade) — 在四条音轨上演奏三首原创曲目。
- **[Ghost Lanterns 3D](https://halloween-3d.crazy3d.org/)** · [源码](https://github.com/AshinTop/halloween-3d) — 用翻灯规则与灵魂连线点亮南瓜花园。
- **[Haunted Hearts](https://halloween-love-game.crazy3d.org/)** · [源码](https://github.com/AshinTop/halloween-love-game) — 帮助两只幽灵开门、让路，并分享一盏灯。
- **[Trick-or-Treat TriPeaks](https://halloween-tripeaks.crazy3d.org/)** · [源码](https://github.com/AshinTop/halloween-tripeaks) — 串连相邻点数纸牌，挑战八个营救牌局。

## 创作说明与支持

为 **AshinTop** 与 **Midnight Candy Club** 制作，由人主导、AI 辅助设计、编程和审查。插画与合成音效为本项目创作。游戏无需远程账号；托管服务可以独立加入脚本或请求日志。

喜欢的话，欢迎**[点亮 GitHub Star](https://github.com/AshinTop/halloween-sprunki)**。反馈问题时，请附浏览器、iframe 尺寸、挑战链接与复现步骤。
