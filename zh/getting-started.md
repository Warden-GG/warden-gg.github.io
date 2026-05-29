# 新手入门

## 系统要求

开始前，请确保您的系统满足以下要求：

- Windows 10 (22H2) 或 Windows 11 (24H2 / 25H2)
- 魔兽世界正式服 (US/EU) 或 怀旧服 MoP (US/EU)
- WardenGG 启动器 - 从您的控制台下载
- 所有程序必须以管理员身份运行

---

## 曾被封号或使用过其他外挂？

如果您曾在此电脑上被封号或使用过其他外挂，您的机器可能已被标记。**请勿跳过此部分。**

1. 运行 **WGG_AntiFlag** 工具并按照说明完整操作。
2. 强烈建议重新安装 Windows，并在干净的系统上使用全新的魔兽世界账号。

> ⚠️ 如果跳过此步骤，我们无法保证您的安全，您的电脑可能仍处于被标记状态。

如果您是第一次使用且从未使用过任何外挂，可以完全跳过此步骤。

---

## 准备工作

在安装或启动任何程序之前，请完成以下所有步骤。

### 第一步 - 下载 Defender Control

从 [sordum.org](https://www.sordum.org/9480/defender-control-v2-1/) 下载 **Sordum Defender Control**。

### 第二步 - 禁用 Windows Defender

打开 Defender Control，完全关闭 Windows Defender。

### 第三步 - 卸载所有其他杀毒软件

完全卸载所有第三方杀毒程序，重启电脑后继续。

### 第四步 - 禁用易受攻击驱动程序阻止列表

以管理员身份打开 CMD 或 PowerShell 并运行以下命令：
```powershell
reg add HKLM\SYSTEM\CurrentControlSet\CI\Config /v "VulnerableDriverBlocklistEnable" /t REG_DWORD /d 0 /f
```

### 第五步 - 禁用核心隔离 / 内存完整性

以管理员身份打开 CMD 或 PowerShell 并运行以下命令：
```powershell
reg add HKLM\SYSTEM\CurrentControlSet\Control\DeviceGuard\Scenarios\HypervisorEnforcedCodeIntegrity /v "Enabled" /t REG_DWORD /d 0 /f
```

### 第六步 - 启用 Hyper-V 依赖项

运行 Discord **#scripts** 频道中的 Hyper-V 脚本。

> ⚠️ 如果您使用的是 VM Compliant 版本，可以跳过此步骤。

### 第七步 - 重启并禁用安全启动

1. 重启您的电脑。
2. 进入 UEFI/BIOS 设置。
3. 找到并禁用 **安全启动 (Secure Boot)**。

> ⚠️ 启动前请确保所有覆盖层已禁用，包括 Nvidia Overlay、Xbox GameBar、Discord 覆盖层和 Medal.tv。

完成以上所有步骤后，进入安装环节。

---

## 安装与启动

### 第 1 步 - 设置脚本位置

在开始之前，请先登录网站，进入你的 **用户面板 > 设置 > 脚本位置 (User Dashboard > Settings > Script Location)**。

输入你希望解锁器从中加载脚本的文件夹，例如：

- `C:/WGG`
- `D:/Users/yourname/Documents/scripts`

> ℹ️ 该路径必须是带有盘符的 **本地绝对路径**（例如 `C:/WGG`）。不允许使用网络路径（`\\server\share`）、`..` 以及特殊字符。留空则使用默认路径（`C:/WGG`）。

点击 **保存 (Save)**。该路径会被安全地发送到解锁器——它决定了你的脚本文件从哪里加载。

### 第 2 步 - 下载文件

进入你的 **用户面板 > 下载 (User Dashboard > Downloads)**，获取：

- `UNLKR.exe`
- `_wardengg.zip`

### 第 3 步 - 放置文件

- `UNLKR.exe` - 可以保存到任意你喜欢的位置。
- `_wardengg.zip` - 将其解压到 **你在第 1 步设置的脚本位置文件夹** 中，使 `wardengg.wgg` 直接位于该文件夹内。

  示例：如果你将脚本位置设置为 `D:/Users/yourname/Documents/scripts`，则解压后文件应位于 `D:/Users/yourname/Documents/scripts/wardengg.wgg`。

如果该文件夹尚不存在，请手动创建——它必须与你在设置中输入的路径完全一致。

> ℹ️ 解锁器只会加载以下划线（`_`）开头、扩展名为 `.wgg` 或 `.lua` 的文件。多个脚本可以同时运行。

### 第 4 步 - 运行启动器

1. 右键点击 `UNLKR.exe`，以管理员身份运行。
2. 使用你已注册的账号登录。
3. 点击 **注入 (Inject)**。

### 第 5 步 - 启动魔兽世界

当状态显示 **"Waiting for WoW..."（等待魔兽世界...）** 时，启动《魔兽世界》。你可以通过战网启动器（Battle.net Launcher）启动，也可以直接运行 WoW 的 `.exe`，两种方式均可。

### 第 6 步 - 成功进入

- 注入将开始，启动器会自动关闭。
- 游戏内聊天框将显示：`[+] WGG-Core Ready!`
- **你所配置的脚本位置** 中的所有 `.wgg` 和 `.lua` 文件将自动加载（例如 `_wardengg.wgg`、`_phoenix.wgg`）。

> 💡 你可以随时在 **设置 (Settings)** 中更改脚本位置。在会话运行期间，更改会在约 30 秒内生效（在下一次游戏内重载或切换区域时应用）——无需登出。


---

## /reload 后的脚本加载

每次在游戏内执行 `/reload` 后，需要按 **F3** 手动重新加载脚本。

---

## 需要帮助？

请先查阅 [故障排查](zh/troubleshooting.md) 页面。如仍无法解决，请在 Discord 的 **#technical-support** 频道开启工单。
