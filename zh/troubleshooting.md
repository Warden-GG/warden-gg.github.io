# 故障排查

在开启工单前，请先查阅以下相关内容。如仍无法解决，请在 Discord 的 **#technical-support** 频道开启工单。

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
- **所有杀毒软件已完全卸载**，卸载后重启电脑再试。

---

---

## 注入失败：请重试

后台可能仍有残留的 WoW 进程。

1. 打开**任务管理器**（`Ctrl + Shift + Esc`）
2. 查找 `wow.exe` 进程
3. 结束该进程
4. 重新尝试注入

---

## 旋转技能未加载

1. 确认控制台中**插件已启用**
2. 确认**魔兽世界客户端语言设置为英语**

---

## 不支持的魔兽世界版本

出现了三种不同的错误，请找到你遇到的那个：

**`CONNECTION_FAILED` — "无法连接到服务器！"**

启动器无法连接到验证服务器。

- 检查 Discord 的 **#news** 频道 — 服务器可能正在维护
- **国服用户：** VPN、防火墙或地区封锁可能造成干扰，尝试切换或关闭 VPN
- 检查防火墙或杀毒软件是否拦截了启动器
- 如果确认服务器正常但问题仍然存在，请在 **#technical-support** 提交工单

**`LOCAL_VERSION_ERROR` — "无法确定魔兽世界版本"**

启动器无法读取你本地的魔兽世界安装文件。

- 请在 **#technical-support** 提交工单，并附上你的 `product.db` 文件
- 文件路径：`C:\ProgramData\Battle.net\Agent\product.db`
- ⚠️ 请确认是 `product.db` — **不是** `.product.db`（注意有没有前面的点）

**`VERSION_MISMATCH` — "不支持的魔兽世界版本"**

你的客户端版本暂不支持，通常发生在版本更新或预补丁之后。

- 请在 **#news** 等待更新公告
- 同时可以尝试：通过战网启动器进行 **扫描并修复**（齿轮图标 → **扫描并修复**）
- 始终通过 **战网启动器** 启动游戏，不要直接运行 `wow.exe`
- 如果确认已更新但问题仍然存在，请在 **#technical-support** 提交工单

---

## 开启工单须知

请提供以下信息以便我们快速处理：

1. **崩溃转储文件** — `WoWDirectory/Retail/Errors` 目录下的 `.txt` 和 `.dmp` 文件
2. **崩溃情况描述** — 详细说明崩溃发生时机，每次崩溃单独描述
3. **BugGrabber 报告** — 如遇 Lua 错误请附上
