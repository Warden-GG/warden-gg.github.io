# Launcher Troubleshooting

These fixes apply to the **WardenGG Launcher** across both **World of Warcraft** and **Overwatch 2**. Work through the relevant section below before opening a ticket in **#support** on Discord.

> Looking for WoW-only issues (Error 430 script location, leftover `wow.exe`, missing rotations, or `product.db` / Unsupported WoW Version)? See [WoW Troubleshooting](wow-troubleshooting.md).

---

## Error 264

Error **264** occurs when Windows Code Integrity, HVCI, or Exploit Guard rules block the launcher driver.

### Step 1 - Open PowerShell as Administrator

Right-click the Start menu and select **Windows PowerShell (Admin)** or **Terminal (Admin)**.

### Step 2 - Run the Following Commands

Copy and paste all five lines into PowerShell and press Enter:

```powershell
reg add "HKLM\SYSTEM\CurrentControlSet\Control\CI\Config" /v VulnerableDriverBlocklistEnable /t REG_DWORD /d 0 /f
reg add "HKLM\SYSTEM\CurrentControlSet\Control\DeviceGuard\Scenarios\HypervisorEnforcedCodeIntegrity" /v Enabled /t REG_DWORD /d 0 /f
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows Defender\Windows Defender Exploit Guard\ASR" /v ExploitGuard_ASR_Rules /t REG_DWORD /d 0 /f
Remove-Item -Path "C:\Windows\System32\CodeIntegrity\SIPolicy.p7b" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "C:\Windows\System32\CodeIntegrity\driversipolicy.p7b" -Force -ErrorAction SilentlyContinue
```

### Step 3 - Reboot Your PC

Restart Windows completely so the registry and Code Integrity changes apply.

### Step 4 - Retry

Run the **WardenGG Launcher** as Administrator again and select your game.

> Still hitting Error 264 after rebooting? Open a ticket in **#support** on Discord.

---

## Driver Loading Failed

Verify all three of the following on your PC:

- The **Vulnerable Driver Blocklist** is disabled. See [Step 4 in Getting Started](getting-started.md#step-4-disable-the-vulnerable-driver-blocklist) or run the Error 264 commands above.
- **All antivirus software is fully disabled or uninstalled.** Windows Defender must be disabled with Defender Control, and any third-party antivirus must be uninstalled completely followed by a reboot.
- **Secure Boot** is disabled in UEFI/BIOS.

---

## Connection to Server Failed (`CONNECTION_FAILED`)

The WardenGG Launcher could not reach the authentication server.

- Check **#news** on Discord to confirm servers are online.
- **CN users:** a VPN, firewall, or regional route may be interfering. Try toggling your VPN or switching nodes.
- Check that Windows Firewall or antivirus software is not blocking the launcher.
- If servers are confirmed up and the issue persists, open a ticket in **#support**.

---

## Opening a Ticket - What to Include

To help support resolve your issue quickly, include:

1. **Game:** `World of Warcraft` or `Overwatch 2`.
2. **Windows version:** run `winver` (for example Windows 11 Pro 24H2).
3. **Exact error message or screenshot:** crop private account details and local paths before sharing.

For World of Warcraft crashes or Lua errors, see [Opening a WoW Crash Ticket](wow-troubleshooting.md#opening-a-wow-crash-ticket) for crash dump and BugGrabber instructions.
