# WoW Troubleshooting

Fixes for World of Warcraft script, injection, rotation, and client version issues. For launcher-wide errors like **Error 264**, **Driver Loading Failed**, or **Connection Failed**, see [Launcher Troubleshooting](troubleshooting.md).

---

## Error 430 - No Script Location Set

Error **430** during login means no WoW script location is saved in your User Dashboard.

1. Log in to the website and open **User Dashboard > Settings > Script Location**.
2. Enter the full local path to your scripts folder (such as `C:/Users/Alex/Documents/Scripts`).
3. Use **forward slashes (`/`) only**, not backslashes (`\`).
4. Click **Save**, then sign in to the launcher again.

**`C:/WGG` is a placeholder and must not be used as your script location.** See [Scripts & Management](wow-scripts.md#step-1-set-your-script-location) for details.

---

## Injection Failed: Try Again

A leftover WoW process is likely still running in the background.

1. Open **Task Manager** (`Ctrl + Shift + Esc`).
2. Look for any `wow.exe` process.
3. End the process.
4. Launch the WardenGG Launcher again and retry.

---

## Rotation Not Loading

Check both settings:

1. Confirm **Plugins are enabled** in your User Dashboard.
2. Confirm your **WoW client language is set to English**.
3. Verify your script filename starts with an underscore (`_`) and ends with `.wgg` or `.lua`.
4. After an in-game `/reload`, press **F3** to reload scripts.

---

## Unsupported WoW Version

### `LOCAL_VERSION_ERROR` - "Could not determine WoW version"

The launcher could not read your local World of Warcraft installation metadata.

- Open a ticket in **#support** on Discord and attach your `product.db` file.
- File location: `C:\ProgramData\Battle.net\Agent\product.db`
- Attach `product.db`, **not** `.product.db` (note the leading dot).

### `VERSION_MISMATCH` - "Unsupported WoW version"

Your WoW client version is not supported yet, usually right after a game patch or prepatch.

- Check **#news** on Discord for update announcements.
- Run **Scan and Repair** from the Battle.net Launcher (gear icon > **Scan and Repair**).
- Always launch WoW through the **Battle.net Launcher**, not directly via `wow.exe`.
- If the error persists after an update is announced, open a ticket in **#support**.

---

## Opening a WoW Crash Ticket

Include all of the following when opening a WoW crash or Lua error ticket in **#support**:

1. **Crash dump**: both the `.txt` and `.dmp` files from `WoWDirectory/Retail/Errors`.
2. **Crash condition**: exact details of when the crash occurs (for example after `/reload`, on startup, or inside a dungeon when targeting an enemy). Include this for each separate crash.
3. **BugGrabber report**: attach the BugGrabber output if you are seeing a Lua error.
