# Hero schemes

**Hero Schemes** contains Aim, Trigger, Target Priority, Skills, Combos and Alert. These pages use the hero selected in the sidebar or the **All** fallback.

## Aim slots

An aim slot groups one set of settings for the selected hero. A hero can have multiple slots, so separate actions can keep their own key, movement behaviour and field of view. Confirm the hero and slot at the top of the editor before changing a control.

| Control | What it changes |
| --- | --- |
| Slot Enable | Whether the selected slot is active. |
| Base Speed and Speed Scale | How quickly movement responds. Both contribute to the final behaviour. |
| FOV Mode | Uses a fixed angle or a saved Dynamic FOV preset. |
| Minimum and maximum distance | The distance range for the selected slot. |
| Behaviour | Selects the movement behaviour for the slot. Its advanced controls are grouped under **Global > Behaviour**. |
| Target filters | Limits the slot to the selected targets and conditions. |

## Trigger settings

The **Action** selector chooses the relevant fire action. **Hold** uses the activation key while it’s pressed, **Toggle** switches the mode on and off, and **Always** keeps it active continuously. **Shot Interval** defines the minimum time between shots. A value of zero uses automatic timing. Reload checks and charge settings appear where the selected action supports them.

## Target priority

Target priority applies rules to eligible targets. Review the base filters first, then open the rules editor for conditional preferences. Check the order of rules and any hero-specific overrides when a selected hero behaves differently from **All**.

## Dynamic FOV

A fixed FOV uses one angle. A Dynamic FOV preset changes the angle based on distance. Presets are managed in **Global > Dynamic FOV** and selected per slot under **Hero Schemes > Aim > Field of View**. Each slot also has a fallback angle. If you remove a preset, recheck any slots that previously used it.
