# Troubleshooting

Before opening a ticket, work through the relevant section below. If nothing here resolves your issue, open a ticket in **#technical-support** on Discord — free remote setup is available.

---

## Error 264

### Step 1 — Open PowerShell as Administrator
Right-click the Start menu and select **Windows PowerShell (Admin)** or **Terminal (Admin)**.

### Step 2 — Run the Following Commands
Copy and paste all of the following into PowerShell and hit Enter:
```powershell
reg add "HKLM\SYSTEM\CurrentControlSet\Control\CI\Config" /v VulnerableDriverBlocklistEnable /t REG_DWORD /d 0 /f
reg add "HKLM\SYSTEM\CurrentControlSet\Control\DeviceGuard\Scenarios\HypervisorEnforcedCodeIntegrity" /v Enabled /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows Defender\Windows Defender Exploit Guard\ASR" /v ExploitGuard_ASR_Rules /t REG_DWORD /d 0 /f
Remove-Item -Path "C:\Windows\System32\CodeIntegrity\SIPolicy.p7b" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "C:\Windows\System32\CodeIntegrity\driversipolicy.p7b" -Force -ErrorAction SilentlyContinue
```

### Step 3 — Reboot Your PC

### Step 4 — Retry
Launch `UNLKR.exe` again and attempt to inject.

> Still not working? Open a ticket in **#technical-support** — free remote setup is available.

---

## Driver Loading Failed

Make sure both of the following are true:

- The **Vulnerable Driver Blocklist** is disabled — see [Step 4 in Getting Started](getting-started.md#step-4--disable-the-vulnerable-driver-blocklist) for the exact registry commands.
- **All antivirus software is fully disabled or uninstalled.** If disabling isn't enough, uninstall it completely, restart your PC, and try again.

---

## Double Script Execution

The unlocker loads every `.lua` and `.wgg` file inside `C:/WGG` simultaneously. If you have multiple scripts in there, they will all run at the same time and cause conflicts.

**Only keep 1 active script in `C:/WGG` at a time.**

### The Problem

Your `C:/WGG` folder looks like this:
```
C:/WGG/
  _phoenix.wgg
  _warden.wgg
  blabla.lua
```

All three files will load — this causes double script execution.

### The Fix

Rename any files you don't want to load by appending `BAK` to the extension:
```
C:/WGG/
  _phoenix.wgg
  _warden.wggBAK
  blabla.luaBAK
```

Now only `_phoenix.wgg` will be loaded.

### Swapping Scripts

1. Rename the active script you want to deactivate — e.g. `_phoenix.wgg` → `_phoenix.wggBAK`
2. Rename the script you want to activate back to `.wgg` or `.lua` — e.g. `_warden.wggBAK` → `_warden.wgg`
3. Type `/reload` in-game.
4. Wait for the prompt **"Press F3 to load a script"**.
5. Press **F3**.

---

## Injection Failed: Try Again

A leftover WoW process is likely still running in the background.

1. Open **Task Manager** (`Ctrl + Shift + Esc`).
2. Look for any `wow.exe` process.
3. End the process.
4. Try injecting again.

---

## Rotation Not Loading

Two things to check:

1. Make sure **Plugins are enabled** in your Dashboard.
2. Make sure your **WoW client language is set to English**.

---

## Unsupported WoW Version

This can have a few different causes:

- **Servers are down** — check the **#news** channel on Discord for any announcements.
- **WoW launched incorrectly** — always start WoW through the **Battle.net Launcher**, not directly via `wow.exe`.
- **Outdated `product.db` file** — repair your WoW installation via the Battle.net Launcher (gear icon next to Play → **Scan and Repair**). If that doesn't help, open a ticket and attach your `C:\ProgramData\Battle.net\Agent\product.db` file. Make sure it's the correct one — `product.db` not `.product.db`.

> If none of the above resolves your issue, open a ticket in **#technical-support**.

---

## Opening a Ticket — What to Include

To help us resolve your issue as fast as possible, please include the following when opening a ticket:

1. **Crash dump** — found in `WoWDirectory/Retail/Errors` (include both the `.txt` and `.dmp` file).
2. **Crash condition** — describe in detail when the crash happens (e.g. after `/reload`, on startup, inside a dungeon when targeting an enemy). Include this for every individual crash.
3. **BugGrabber report** — if you're experiencing a Lua error, attach the BugGrabber report.
