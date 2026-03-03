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

## 双脚本执行问题

解锁器会同时加载 `C:/WGG` 中所有的 `.lua` 和 `.wgg` 文件，多个脚本同时运行会产生冲突。

**每次只在 `C:/WGG` 中保留 1 个活动脚本。**

### 问题所在
```
C:/WGG/
  _phoenix.wgg
  _warden.wgg
  blabla.lua
```

三个文件都会被加载，这会导致冲突。

### 解决方法

将不需要加载的文件重命名，在扩展名后添加 `BAK`：
```
C:/WGG/
  _phoenix.wgg
  _warden.wggBAK
  blabla.luaBAK
```

### 切换脚本

1. 将当前脚本重命名：`_phoenix.wgg` → `_phoenix.wggBAK`
2. 将目标脚本重命名回：`_warden.wggBAK` → `_warden.wgg`
3. 游戏内输入 `/reload`
4. 等待提示 **"Press F3 to load a script"**
5. 按 **F3**

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

- **服务器停机** — 查看 Discord **#news** 频道
- **启动方式不正确** — 请通过 **Battle.net 启动器**启动，而非直接运行 `wow.exe`
- **`product.db` 已过期** — 通过 Battle.net 启动器扫描并修复魔兽世界。若仍无效，开启工单并附上 `C:\ProgramData\Battle.net\Agent\product.db` 文件

---

## 开启工单须知

请提供以下信息以便我们快速处理：

1. **崩溃转储文件** — `WoWDirectory/Retail/Errors` 目录下的 `.txt` 和 `.dmp` 文件
2. **崩溃情况描述** — 详细说明崩溃发生时机，每次崩溃单独描述
3. **BugGrabber 报告** — 如遇 Lua 错误请附上
