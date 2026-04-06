# Getting Started

## Requirements

Before you begin, make sure your system meets the following:

- Windows 10 (22H2) or Windows 11 (24H2 / 25H2)
- World of Warcraft Retail (US/EU) or Classic MoP (US/EU)
- WardenGG Launcher - download from your Dashboard
- Everything must be run as Administrator

---

## Previously Banned or Used Another Unlocker?

If you've ever been banned or used a different unlocker/cheat on this PC, your machine may already be flagged. **Do not skip this section.**

1. Run the **WGG_AntiFlag** tool and follow its instructions fully.
2. We strongly recommend a clean Windows reinstall with a fresh WoW account on the clean system.

> ⚠️ If you skip this, we cannot guarantee your safety. Your PC could still be flagged.

If this is your first time and you've never used any unlocker before, you can skip this step entirely.

---

## Preparations

Complete all of these steps **before** installing or launching anything.

### Step 1 - Download Defender Control

Download **Sordum Defender Control** from [sordum.org](https://www.sordum.org/9480/defender-control-v2-1/).

### Step 2 - Disable Windows Defender

Open Defender Control and turn off Windows Defender completely.

### Step 3 - Uninstall All Other Antivirus Software

Fully uninstall any third-party antivirus programs, restart your PC, and continue.

### Step 4 - Disable the Vulnerable Driver Blocklist

Run the following in an elevated CMD or PowerShell:
```powershell
reg add HKLM\SYSTEM\CurrentControlSet\CI\Config /v "VulnerableDriverBlocklistEnable" /t REG_DWORD /d 0 /f
```

### Step 5 - Disable Core Isolation / Memory Integrity (HVCI)

Run the following in an elevated CMD or PowerShell:
```powershell
reg add HKLM\SYSTEM\CurrentControlSet\Control\DeviceGuard\Scenarios\HypervisorEnforcedCodeIntegrity /v "Enabled" /t REG_DWORD /d 0 /f
```

### Step 6 - Enable Hyper-V Dependencies

Run the Hyper-V script found in the **#scripts** channel on Discord.

> ⚠️ If you are using VM Compliant you can skip this.

### Step 7 - Reboot & Disable Secure Boot

1. Reboot your PC.
2. Enter your UEFI/BIOS settings.
3. Locate and disable **Secure Boot**.

> ⚠️ Make sure all overlays are disabled before launching. This includes Nvidia Overlay, Xbox GameBar, Discord Overlay, and Medal.tv.

Once all steps above are complete, move on to installation.

---

## Install and Launch

### Step 1 - Download Your Files

Head to your **User Dashboard > Downloads** and grab:

- `UNLKR.exe`
- `_wardengg.zip`

### Step 2 - Place the Files

- `UNLKR.exe` - save this anywhere you like.
- `_wardengg.zip` - extract it to `C:/WGG` so that `wardengg.wgg` sits directly inside `C:/WGG`.

If `C:/WGG` doesn't exist yet, create the folder manually.

> ℹ️ The unlocker only loads files with a `.wgg` or `.lua` extension that start with an underscore (`_`). Multiple scripts can run simultaneously.

### Step 3 - Run the Launcher

1. Right-click `UNLKR.exe` and run it as Administrator.
2. Log in with your registered account.
3. Click **Inject**.

### Step 4 - Launch WoW

Once the status reads **"Waiting for WoW..."**, start World of Warcraft. You can launch through the Battle.net Launcher or directly via the WoW `.exe`, both work.

### Step 5 - You're In

- The injection will begin and the launcher will close automatically.
- In-game chat will display: `[+] WGG-Core Ready!`
- All `.wgg` and `.lua` files in `C:/WGG` will load automatically (e.g. `_wardengg.wgg`, `_phoenix.wgg`).

---

## Scripts After /reload

After every `/reload` in-game, you'll need to press **F3** to reload your scripts manually.

---

## Need Help?

Check the [Troubleshooting](troubleshooting.md) page first. If nothing there helps, open a ticket in **#technical-support** on Discord.
