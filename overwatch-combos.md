# Skills, combos and alerts

Use this guide to locate hero-specific skill controls, read the visual combo editor and manage on-screen notifications.

## Skills

Open **Hero Schemes > Skills** and select the hero. Available controls vary by hero. Check the selection in the top bar before editing and use **All** only when working on a shared fallback.

## Combo builder

Open **Hero Schemes > Combos**. Select an existing combo in the toolbar or choose **New Combo**. The main canvas shows action nodes, condition gates and the links between them. Delays appear on the connections. The lower editor shows the details of the selected condition.

| Part of the editor | What to look for |
| --- | --- |
| Combo toolbar | The selected combo, its enabled state and trigger mode. |
| Action nodes | The hero actions included in the sequence. |
| Condition gates | Checks that govern whether the sequence can continue, such as range, health or ability availability. |
| Condition editor | The selected condition’s comparison, grouping and behaviour if the check fails. |

Trigger choices include **On Press**, **While Held** and **Always**. Check the trigger and save after editing. If a sequence stops unexpectedly, inspect its condition gates and the action they take when a check fails.

## Alerts

Open **Hero Schemes > Alert** to review these notification groups:

- **Skill alerts.** Choose which enemy abilities should generate a notice and edit the announcement where supported.
- **Flanking warning.** Configure the warning for an approach behind your view.
- **Aimed-at warning.** Review the detection range and announcement for this warning.
- **Ultimate alerts.** Set the default notice and review per-hero overrides in the ultimate browser.

If a warning appears on one hero only, compare the hero’s override with the shared default.
