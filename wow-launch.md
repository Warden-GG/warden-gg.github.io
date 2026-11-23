# Launching WoW

Complete [PC Preparations](getting-started.md#preparations) and [Scripts & Management](wow-scripts.md) before launching World of Warcraft with WardenGG.

## Supported WoW Clients

- World of Warcraft Retail (EU / US / CN)
- World of Warcraft Classic MoP
- WoW Forever Beta

Keep your WoW client language set to **English** and make sure **Plugins are enabled** in your User Dashboard so rotations load properly.

## Launch Sequence

1. Right-click the **WardenGG Launcher** and select **Run as Administrator**.
2. Sign in with your registered WGG account.
3. Select **World of Warcraft** and click **Launch / Inject**.
4. Wait until the launcher status reads **"Waiting for WoW..."**.
5. Start World of Warcraft through the **Battle.net Launcher** (recommended; launching via Battle.net avoids version detection mismatches).

## Confirming Injection

Once World of Warcraft starts:

- The WardenGG Launcher attaches automatically and closes.
- In-game chat prints `[+] WGG-Core Ready!`.
- All active `_*.wgg` and `_*.lua` files in your configured Script Location load automatically.

## In-Game Reminders

- Press **F3** after every `/reload` to reload your scripts.
- Keep overlays disabled (Nvidia Overlay, Xbox Game Bar, Discord Overlay, Medal.tv).
- If injection fails, rotations do not load, or you see a version error, check [WoW Troubleshooting](wow-troubleshooting.md).
