# Scripts & Management

World of Warcraft External loads your `.wgg` and `.lua` scripts from a local folder configured in your User Dashboard.

> **Using Overwatch 2?**
>
> Overwatch 2 External does not use script folders or script files. Head to [Overwatch 2 First Steps](overwatch-setup.md) instead.

## Step 1 - Set Your Script Location

1. Sign in to the website and open **User Dashboard > Settings > Script Location**.
2. Enter the full local path to the folder where you store your WoW scripts (for example `C:/Users/Alex/Documents/Scripts`, using your own Windows username and folder).
3. Click **Save**.

Rules for the path:

- Use a **local absolute path** starting with a drive letter.
- Use **forward slashes (`/`) only**, not backslashes (`\`).
- Create the folder first if it does not exist yet.
- Do not use `C:/WGG` (placeholder only), network shares, `..`, or special characters.

You must save a valid script location before signing in to the launcher for WoW, otherwise login fails with [Error 430](wow-troubleshooting.md#error-430-no-script-location-set).

## Step 2 - Download & Place Script Files

1. Go to **User Dashboard > Downloads** and download your script archive.
2. Extract the archive directly into the exact script folder from Step 1 so files such as `_your-script.wgg` sit inside that folder (for example `C:/Users/Alex/Documents/Scripts/_your-script.wgg`).

## How Scripts Load & How to Disable Them

The WoW unlocker automatically loads every file inside your Script Location that:

- Ends in `.wgg` or `.lua`
- Starts with an underscore (`_`)

Multiple matching scripts in that folder load at the same time.

To disable a script without deleting it, append `BAK` to the filename:

- `_your-script.wgg` (active)
- `_your-script.wggBAK` (disabled)

## Changing Your Script Location Later

You can change your Script Location anytime under **User Dashboard > Settings**. Updates apply within about 30 seconds on your next `/reload` or zone transition without logging out.

## Reloading Scripts After /reload

After every `/reload` in World of Warcraft, press **F3** to reload your scripts manually.
