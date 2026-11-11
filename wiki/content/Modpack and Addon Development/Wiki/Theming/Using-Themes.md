---
title: Using themes.
---


## Theme basics.


shared mode means all theme using mods use the same one
perMod allows each mod to have it's own shared theme

there are two ways to add your own mod to this system

Implicit way
easier to use, done through mod bus. Slower for animated themes
PhoenixTheme.registerMod("net.phoenixvine.continuum", "phoenix_continuum");

Explicit
harder to use, done in theme handler class. Faster
var theme = PhoenixTheme.current(YoudMod.MOD_ID);
PhoenixTheme.getActiveName(YoudMod.MOD_ID);
PhoenixTheme.setCurrent(MOD_ID, "OCEAN");

getColor every frame, don't cache it if you want animated colors to be animated
each color value has it's own animation offset, for example rainbow will look slightly different in different places
hex format is AARRGGBB, always include the alpha as it defaults to transparent, failing parsed strings will default to white


PhoenixTheme.REGISTRY.keySet(); // All theme names

PhoenixTheme.isBuiltin("DARK"); // Checks to see if a theme is built in.

PhoenixTheme.setCurrent(MOD_ID, "EMBER"); // Programmitcly set current theme.

PhoenixTheme.deleteCustom("MY THEME"); // Deleting

## Reacting to changes
To react when someone changes thier theme you can do.
PhoenixTheme.addChangeListener(() -> myScreen.rebuildPalette());
It fires on setCurrent, saveCustomTheme, createNewTheme, deleteCustom theme events.

## Reading/using available color values.
12 theme colors
3 sections of colors
Base Layers: bg, panel, header, border
Typography: text, textDim, textFaint
State Colors: accent, done, activeColor, locked, ally

default animated effects
RAINBOW, PASTEL_RAINBOW, MAGMA, AURORA, and GALAXY

only rainbow, pastel rainbow, and magma are in default themes


reading colors
@Override
public void render(GuiGraphics g, int mx, int my, float pt) {
var t = PhoenixTheme.current();          // fetch every frame
g.fill(x, y, x + w, y + h, t.panel.getColor());
g.renderOutline(x, y, w, h, t.border.getColor());
g.drawString(font, title, x + 6, y + 6, t.accent.getColor(), false);
g.drawString(font, sub,   x + 6, y + 18, t.textDim.getColor(), false);
}

## How to open the theme screen.
you can open the theme screen by passing in your mod's display name,
for example,
new PhoenixThemeEditorScreen(this, "YourMod"))

## Where themes are stored.
themes are saved to config/phoenix_wiki/theme.json
```json
{
  "active": "RAINBOW",
  "sharedMode": false,
  "perMod": {
    "phoenix_chronicles": "MAGMA",
    "solaris": "PHANTOM"
  },
  "custom": {}
}
```


## Some things to know

calling loadTheme rebuilds and clears everything, do not call it yourself mid session



SuiteHudBar and SuiteHudSettingsScreen are good examples of reading PhoenixTheme.current once per render




## Other mod examples of using them
SuiteHudBar and SuiteHudSettingsScreen are good examples of reading PhoenixTheme.current once per renderes.