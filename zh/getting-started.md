# 新手入门

本指南同时适用于 **魔兽世界** (World of Warcraft) 与 **守望先锋 2** (Overwatch 2)。两款游戏的系统要求和电脑准备工作（TPM 2.0、Defender/杀毒软件、易受攻击驱动阻止列表、HVCI、安全启动）在启动 WardenGG 启动器之前完全一致。

## 系统要求

> **魔兽世界与守望先锋 2 均必须开启 TPM 2.0**
>
> 没有 TPM 2.0 将无法使用 WardenGG。查看 [启用 TPM 2.0](zh/enable-tpm.md)，检查电脑并找到对应主板品牌的 BIOS 设置方法。

开始前，请确保您的系统满足以下要求：

- **Windows 10 专业版（Pro，22H2）** 或 **Windows 11 专业版（Pro，22H2、24H2 或 25H2）**。家庭版（Home）及其他版本不受支持。
- 已开启 **TPM 2.0**。
- 魔兽世界（正式服 / 怀旧服 MoP / Forever）和/或 守望先锋 2。
- 从控制台下载的 **WardenGG 启动器**。
- 所有启动程序必须以**管理员身份**运行。

## 准备工作

在安装或启动任何程序之前，请完成以下所有步骤（魔兽世界与守望先锋 2 通用）。

### 第一步 - 下载 Defender Control

从 [sordum.org](https://www.sordum.org/9480/defender-control-v2-1/) 下载 **Sordum Defender Control**。

### 第二步 - 禁用 Windows Defender

打开 Defender Control，完全关闭 Windows Defender。

### 第三步 - 卸载所有其他杀毒软件

完全卸载所有第三方杀毒程序，重启电脑后继续。

### 第四步 - 禁用易受攻击驱动程序阻止列表

以管理员身份打开 CMD 或 PowerShell 并运行以下命令：

```powershell
reg add HKLM\SYSTEM\CurrentControlSet\Control\CI\Config /v "VulnerableDriverBlocklistEnable" /t REG_DWORD /d 0 /f
```

### 第五步 - 禁用核心隔离 / 内存完整性 (HVCI)

以管理员身份打开 CMD 或 PowerShell 并运行以下命令：

```powershell
reg add HKLM\SYSTEM\CurrentControlSet\Control\DeviceGuard\Scenarios\HypervisorEnforcedCodeIntegrity /v "Enabled" /t REG_DWORD /d 0 /f
```

### 第六步 - 启用 Hyper-V 依赖项

运行 Discord 中的 Hyper-V 脚本（或运行 `SystemChecker.exe` 自动检测修复）。

> 如果您使用的是 VM Compliant 版本，可以跳过此步骤。

### 第七步 - 重启并禁用安全启动

1. 重启您的电脑。
2. 进入 UEFI/BIOS 设置。
3. 找到并禁用 **安全启动** (Secure Boot)。

> 启动前请关闭所有游戏覆盖层（Nvidia Overlay、Xbox Game Bar、Discord 覆盖层、Medal.tv）。

完成以上所有步骤后，进入安装与启动环节。

---

## 安装与启动

> **守望先锋 2 玩家请注意**
>
> 脚本文件夹与 `.wgg` / `.lua` 脚本文件**仅限《魔兽世界》使用**，守望先锋 2 不需要任何脚本文件。完成上方准备工作后，在第 2 步下载启动器，跳过第 1 步与第 3 步，直接从**第 4 步**开始。

### 第 1 步 - 设置脚本位置（仅限魔兽世界）

*仅游玩守望先锋 2 可跳过本步骤。*

登录网站进入 **用户面板 > 设置 > 脚本位置** (User Dashboard > Settings > Script Location)，填写存放 WoW 脚本的完整本地路径（例如 `C:/Users/Alex/Documents/Scripts`）：

- 必须使用以盘符开头的本地绝对路径。
- **只能使用正斜杠（`/`）**，不能使用反斜杠（`\`）。
- 如果文件夹不存在，请先手动创建并将脚本放入其中。
- 不允许使用网络路径、`..` 或特殊字符。

点击 **保存** (Save)。魔兽世界玩家必须在登录启动器前保存脚本位置，否则会遇到 [登录错误 430](zh/troubleshooting.md#错误代码-430-未设置脚本位置)。

### 第 2 步 - 下载启动器与文件

进入 **用户面板 > 下载 (User Dashboard > Downloads)** 获取：

- **WardenGG 启动器**（魔兽世界与守望先锋 2 通用）
- 脚本压缩包 *（仅限魔兽世界）*

### 第 3 步 - 放置脚本文件（仅限魔兽世界）

*仅游玩守望先锋 2 可跳过本步骤。*

- 将 **WardenGG 启动器** 保存到电脑任意位置。
- 将 WoW 脚本压缩包解压到**第 1 步设置的脚本位置文件夹**，使 `_your-script.wgg` 直接位于该目录中。

> 解锁器只会加载以下划线（`_`）开头、扩展名为 `.wgg` 或 `.lua` 的文件。多个脚本可同时运行。

### 第 4 步 - 运行启动器（魔兽世界 & 守望先锋 2 通用）

1. 右键点击 WardenGG 启动器，选择**以管理员身份运行**。
2. 使用已注册的 WGG 账号登录。
3. 选择 **World of Warcraft** 或 **Overwatch 2**，点击 **Launch / Inject**。

### 第 5 步 - 启动游戏

#### 魔兽世界

1. 等待状态显示 **"Waiting for WoW..."** 后启动《魔兽世界》（战网启动器或直接运行 `.exe` 均可）。
2. 启动器自动注入并关闭。
3. 游戏内聊天框显示 `[+] WGG-Core Ready!`，并自动加载脚本目录中的 `.wgg` / `.lua` 文件。

> 可随时在 **设置 (Settings)** 中修改脚本路径，会在约 30 秒内或下次 `/reload` / 切图时自动生效，无需重新登录。

#### 守望先锋 2

1. 首次使用前，先打开守望先锋 2 将 **垂直同步** (V-Sync) 设为 **关闭** (`OFF`)，**显示模式** 设为 **无边框窗口化** (`Fullscreen (Windowed)`)，保存后**完全关闭游戏**。
2. 在 WardenGG 启动器中选择 **Overwatch 2** 并点击 **Launch**，等待提示 **"Waiting for Overwatch"** 后启动守望先锋 2。
3. 进入**训练靶场 (Practice Range)** 选择任意英雄，按 **Home**（德语/ISO 键盘为 **Pos1**）开关菜单。
4. 在顶部选择全英雄预设（`Legit` / `Semi-Legit` / `Rage`），进入左下角 **Advanced > Settings > Mouse & Sensitivity**，保持 **Auto-Read from Game** 为**关闭**状态，先点 **Read** 读取灵敏度，再点 **Calibrate** 完成校准。

完整图文教程请查看 [Overwatch 2 First Steps](overwatch-setup.md)。

---

## /reload 后的脚本加载（仅限魔兽世界）

每次在魔兽世界内执行 `/reload` 后，按 **F3** 手动重新加载脚本。

---

## 需要帮助？

请先查阅 [故障排查](zh/troubleshooting.md)。如仍未解决，请在 Discord 的 **#support** 频道开启工单，并注明游戏名称与报错信息。
