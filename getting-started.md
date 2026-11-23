# Getting Started

This guide covers shared Windows setup and launching **WardenGG** for **both World of Warcraft and Overwatch 2**. System requirements and PC preparations (TPM 2.0, Defender/AV, Vulnerable Driver Blocklist, HVCI, and Secure Boot) are identical for both games up through starting the WardenGG Launcher.

## Requirements

> **TPM 2.0 is required for both WoW and Overwatch 2**
>
> You cannot run WardenGG without TPM 2.0 enabled. Follow [Enable TPM 2.0](enable-tpm.md) to verify your PC and find the BIOS setting for your motherboard brand.

Before you begin, make sure your PC meets all of the following:

- **Windows 10 Pro (22H2)** or **Windows 11 Pro (22H2, 24H2, or 25H2)**. Windows Home and other editions are not supported.
- **TPM 2.0** enabled in BIOS/UEFI.
- **World of Warcraft** (Retail, Classic MoP, or WoW Forever Beta) and/or **Overwatch 2**.
- **WardenGG Launcher** downloaded from your User Dashboard.
- Run the launcher as **Administrator**.

## Preparations

Complete every step below **before** launching World of Warcraft or Overwatch 2 with WardenGG. These steps are the same for both games.

### Step 1 - Download Defender Control

Download **Sordum Defender Control** from [sordum.org](https://www.sordum.org/9480/defender-control-v2-1/).

### Step 2 - Disable Windows Defender

Open Defender Control and turn off Windows Defender completely.

### Step 3 - Uninstall All Other Antivirus Software

Fully uninstall any third-party antivirus programs, restart your PC, and continue.

### Step 4 - Disable the Vulnerable Driver Blocklist

Run this command in an elevated CMD or PowerShell:

```powershell
reg add HKLM\SYSTEM\CurrentControlSet\Control\CI\Config /v "VulnerableDriverBlocklistEnable" /t REG_DWORD /d 0 /f
```

### Step 5 - Disable Core Isolation / Memory Integrity (HVCI)

Run this command in an elevated CMD or PowerShell:

```powershell
reg add HKLM\SYSTEM\CurrentControlSet\Control\DeviceGuard\Scenarios\HypervisorEnforcedCodeIntegrity /v "Enabled" /t REG_DWORD /d 0 /f
```

### Step 6 - Enable Hyper-V Dependencies

Run the Hyper-V script or `SystemChecker.exe` from Discord.

> If you are using VM Compliant, you can skip this step.

### Step 7 - Reboot & Disable Secure Boot

1. Reboot your PC.
2. Enter your UEFI/BIOS settings.
3. Locate and disable **Secure Boot**.

> Disable overlays before launching (Nvidia Overlay, Xbox Game Bar, Discord Overlay, Medal.tv).

Once all preparation steps above are complete, continue to installation and launch below.

---

## Install and Launch

> **Playing Overwatch 2?**
>
> Script folders and `.wgg` / `.lua` script files are for **World of Warcraft only**. Overwatch 2 does not use script files. Download the launcher in **Step 2**, skip Steps 1 and 3, and continue directly at **Step 4**.

### Step 1 - Set Your Script Location (World of Warcraft Only)

*Skip this step if you only play Overwatch 2.*

Go to **User Dashboard > Settings > Script Location**, enter your local script folder path using forward slashes only (for example `C:/Users/Alex/Documents/Scripts`), and click **Save**. Full rules and script toggling instructions are in [Scripts & Management](wow-scripts.md).

### Step 2 - Download the Launcher

Go to **User Dashboard > Downloads** and download:

- **WardenGG Launcher** (required for both World of Warcraft and Overwatch 2)
- Your script archive *(World of Warcraft only)*

### Step 3 - Place Script Files (World of Warcraft Only)

*Skip this step if you only play Overwatch 2.*

- Save the **WardenGG Launcher** anywhere on your PC.
- Extract your WoW scripts into your Step 1 script folder so files starting with an underscore (`_your-script.wgg`) sit directly inside it. See [Scripts & Management](wow-scripts.md) for `_` prefix rules, `.wggBAK` disabling, and `F3` reloads.

### Step 4 - Run the WardenGG Launcher (WoW & Overwatch 2)

1. Right-click the **WardenGG Launcher** and select **Run as Administrator**.
2. Sign in with your registered WGG account.
3. Select **World of Warcraft** or **Overwatch 2** in the launcher and press **Launch / Inject**.

### Step 5 - Launch Your Game

#### World of Warcraft

1. Wait until the launcher reads **"Waiting for WoW..."**, then start World of Warcraft via Battle.net.
2. The launcher attaches automatically and closes; in-game chat prints `[+] WGG-Core Ready!` and loads your active scripts.
3. Press **F3** after any `/reload` to reload scripts.

Full WoW launch checklist: [Launching WoW](wow-launch.md).

#### Overwatch 2

1. Before launching with WGG the first time, open Overwatch 2, set **V-Sync** to **OFF** and **Display Mode** to **Fullscreen (Windowed)**, save, and **close Overwatch 2 completely**.
2. In the WardenGG Launcher, select **Overwatch 2**, press **Launch**, wait for **"Waiting for Overwatch"**, then start Overwatch 2.
3. Enter **Practice Range**, pick a hero, and press **Home** (`Pos1` on German/ISO keyboards) to open the menu.
4. Pick a top-bar preset (`Legit`, `Semi-Legit`, or `Rage`), open **Advanced > Settings > Mouse & Sensitivity**, keep **Auto-Read from Game** turned **OFF**, click **Read**, then click **Calibrate**.

Illustrated walkthrough with screenshots: [Overwatch 2 First Steps](overwatch-setup.md).

---

## Need Help?

- Launcher-wide errors (Error 264, Driver Loading Failed, server connection): [Launcher Troubleshooting](troubleshooting.md).
- World of Warcraft errors (Error 430, `wow.exe`, rotations, client versions): [WoW Troubleshooting](wow-troubleshooting.md).
- Still stuck? Open a ticket in **#support** on Discord with your game, Windows version, and exact error message.
