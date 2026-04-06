# 新手入门

## 系统要求

开始前，请确保您的系统满足以下要求：

- Windows 10 (22H2) 或 Windows 11 (24H2 / 25H2)
- 魔兽世界正式服 (US/EU) 或 怀旧服 MoP (US/EU)
- WardenGG 启动器 — 从您的控制台下载
- 所有程序必须以管理员身份运行

---

## 曾被封号或使用过其他外挂？

如果您曾在此电脑上被封号或使用过其他外挂，您的机器可能已被标记。**请勿跳过此部分。**

1. 运行 **WGG_AntiFlag** 工具并按照说明完整操作。
2. 强烈建议重新安装 Windows，并在干净的系统上使用全新的魔兽世界账号。

> ⚠️ 如果跳过此步骤，我们无法保证您的安全 — 您的电脑可能仍处于被标记状态。

如果您是第一次使用且从未使用过任何外挂，可以完全跳过此步骤。

---

## 准备工作

在安装或启动任何程序之前，请完成以下所有步骤。

### 第一步 — 下载 Defender Control

从 [sordum.org](https://www.sordum.org/9480/defender-control-v2-1/) 下载 **Sordum Defender Control**。

### 第二步 — 禁用 Windows Defender

打开 Defender Control，完全关闭 Windows Defender。

### 第三步 — 卸载所有其他杀毒软件

完全卸载所有第三方杀毒程序，重启电脑后继续。

### 第四步 — 禁用易受攻击驱动程序阻止列表

以管理员身份打开 CMD 或 PowerShell 并运行以下命令：
```powershell
reg add HKLM\SYSTEM\CurrentControlSet\CI\Config /v "VulnerableDriverBlocklistEnable" /t REG_DWORD /d 0 /f
```

### 第五步 — 禁用核心隔离 / 内存完整性

以管理员身份打开 CMD 或 PowerShell 并运行以下命令：
```powershell
reg add HKLM\SYSTEM\CurrentControlSet\Control\DeviceGuard\Scenarios\HypervisorEnforcedCodeIntegrity /v "Enabled" /t REG_DWORD /d 0 /f
```

### 第六步 — 启用 Hyper-V 依赖项

运行 Discord **#scripts** 频道中的 Hyper-V 脚本。

> ⚠️ 如果您使用的是 VM Compliant 版本，可以跳过此步骤。

### 第七步 — 重启并禁用安全启动

1. 重启您的电脑。
2. 进入 UEFI/BIOS 设置。
3. 找到并禁用 **安全启动 (Secure Boot)**。

> ⚠️ 启动前请确保所有覆盖层已禁用，包括 Nvidia Overlay、Xbox GameBar、Discord 覆盖层和 Medal.tv。

完成以上所有步骤后，进入安装环节。

---

## 安装和启动

### 第一步 — 下载文件

前往您的 **用户控制台 → 下载**，获取以下文件：

- `UNLKR.exe`
- `_wardengg.zip`

### 第二步 — 放置文件

- `UNLKR.exe` — 保存到任意位置。
- `_wardengg.zip` — 解压到 `C:/WGG`，确保 `wardengg.wgg` 直接位于 `C:/WGG` 目录下。

如果 `C:/WGG` 文件夹不存在，请手动创建。

> ℹ️ 解锁器仅加载以下划线（`_`）开头且扩展名为 `.wgg` 或 `.lua` 的文件。多个脚本可以同时运行。

### 第三步 — 运行启动器

1. 右键点击 `UNLKR.exe`，以管理员身份运行。
2. 使用您注册的账号登录。
3. 点击 **Inject（注入）**。

### 第四步 — 启动魔兽世界

当状态显示 **"Waiting for WoW…"** 时，启动魔兽世界。可通过 Battle.net 启动器或直接运行 WoW `.exe`，两种方式均可。

### 第五步 — 成功进入

- 注入将开始，启动器会自动关闭。
- 游戏内聊天框将显示：`[+] WGG-Core Ready!`
- `C:/WGG` 中所有 `.wgg` 和 `.lua` 文件将自动加载。

---

## /reload 后的脚本加载

每次在游戏内执行 `/reload` 后，需要按 **F3** 手动重新加载脚本。

---

## 需要帮助？

请先查阅 [故障排查](zh/troubleshooting.md) 页面。如仍无法解决，请在 Discord 的 **#technical-support** 频道开启工单。
