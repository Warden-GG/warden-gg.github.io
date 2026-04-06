# WardenGG 文档

欢迎使用 WardenGG 官方文档。遇到问题请先查阅故障排查部分，如仍无法解决请在 Discord 的 **#technical-support** 频道开启工单。

---

## 快速链接

- 📋 [新手入门](#新手入门) — 第一次使用？从这里开始。
- 🔧 [故障排查](#故障排查) — 遇到问题？先查这里。

---

# 新手入门

## 系统要求

开始前，请确保您的系统满足以下要求：

- Windows 10 (22H2) 或 Windows 11 (24H2 / 25H2)
- 魔兽世界正式服 (US/EU) 或 怀旧服 MoP (US/EU)
- WardenGG 启动器 — 从您的控制台下载
- 所有程序必须以管理员身份运行

---

## 曾被封号或使用过其他外挂？

如果您曾在此电脑上被封号或使用过其他外挂/解锁器，您的机器可能已被标记。**请勿跳过此部分。**

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

### 第五步 — 禁用核心隔离 / 内存完整性 (HVCI)

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

当状态显示 **"Waiting for WoW…"** 时，启动魔兽世界。可以通过 Battle.net 启动器或直接运行 WoW `.exe` — 两种方式均可。

### 第五步 — 成功进入

- 注入将开始，启动器会自动关闭。
- 游戏内聊天框将显示：`[+] WGG-Core Ready!`
- `C:/WGG` 中所有 `.wgg` 和 `.lua` 文件将自动加载（如 `_wardengg.wgg`、`_phoenix.wgg`）。

---

## /reload 后的脚本加载

每次在游戏内执行 `/reload` 后，需要按 **F3** 手动重新加载脚本。

---

## 需要帮助？

请先查阅下方的故障排查部分。如仍无法解决，请在 Discord 的 **#technical-support** 频道开启工单。

---

# 故障排查

在开启工单前，请先查阅以下相关内容。

---

## 错误代码 264

### 第一步 — 以管理员身份打开 PowerShell

右键点击开始菜单，选择 **Windows PowerShell（管理员）** 或 **终端（管理员）**。

### 第二步 — 运行以下命令

将以下所有命令复制粘贴到 PowerShell 中并按 Enter：

```powershell
reg add "HKLM\SYSTEM\CurrentControlSet\Control\CI\Config" /v VulnerableDriverBlocklistEnable /t REG_DWORD /d 0 /f
reg add "HKLM\SYSTEM\CurrentControlSet\Control\DeviceGuard\Scenarios\HypervisorEnforcedCodeIntegrity" /v Enabled /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows Defender\Windows Defender Exploit Guard\ASR" /v ExploitGuard_ASR_Rules /t REG_DWORD /d 0 /f
Remove-Item -Path "C:\Windows\System32\CodeIntegrity\SIPolicy.p7b" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "C:\Windows\System32\CodeIntegrity\driversipolicy.p7b" -Force -ErrorAction SilentlyContinue
```

### 第三步 — 重启电脑

### 第四步 — 重试

重新启动 `UNLKR.exe` 并尝试注入。

> 仍然无法解决？请在 **#technical-support** 开启工单。

---

## 驱动加载失败

请确认以下两点：

- **易受攻击驱动程序阻止列表**已禁用 — 请参阅准备工作第四步中的注册表命令。
- **所有杀毒软件已完全卸载**。卸载后重启电脑再试。

---

---

## 注入失败：请重试

后台可能仍有残留的 WoW 进程在运行。

1. 打开**任务管理器**（`Ctrl + Shift + Esc`）。
2. 查找所有 `wow.exe` 进程。
3. 结束该进程。
4. 重新尝试注入。

---

## 旋转技能未加载

请检查以下两点：

1. 确认您的控制台中**插件已启用**。
2. 确认您的**魔兽世界客户端语言设置为英语**。

---

## 不支持的魔兽世界版本

可能有以下几种原因：

- **服务器停机** — 请查看 Discord 的 **#news** 频道获取最新公告。
- **魔兽世界启动方式不正确** — 请始终通过 **Battle.net 启动器**启动魔兽世界，而非直接运行 `wow.exe`。
- **`product.db` 文件已过期** — 通过 Battle.net 启动器修复魔兽世界安装（点击开始旁边的齿轮图标 → **扫描并修复**）。如果修复后仍无效，请开启工单并附上 `C:\ProgramData\Battle.net\Agent\product.db` 文件，注意文件名应为 `product.db` 而非 `.product.db`。

> 如果以上方法均无法解决您的问题，请在 **#technical-support** 开启工单。

---

## 开启工单须知

为了让我们尽快解决您的问题，请在开启工单时提供以下信息：

1. **崩溃转储文件** — 位于 `WoWDirectory/Retail/Errors` 目录下（请同时附上 `.txt` 和 `.dmp` 文件）。
2. **崩溃发生时的情况** — 详细描述崩溃发生的时机（如 `/reload` 后、启动时、在副本中锁定目标时等）。每次崩溃都需单独描述。
3. **BugGrabber 报告** — 如果遇到 Lua 错误，请附上 BugGrabber 报告。
