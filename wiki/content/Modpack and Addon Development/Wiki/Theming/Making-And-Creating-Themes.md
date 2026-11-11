---
title: Making and Creating Themes.
---

## Editing Existing Themes
Existing themes can be edited in memory but are not persisted.

This can be done via the ingame editor. 

## Making New Themes
There are two ways to make new themes: ingame and in code.



String name = PhoenixTheme.createNewTheme(MOD_ID, "MY THEME", PhoenixTheme.current(MOD_ID)); // Creates new theme

PhoenixTheme.saveCustomTheme("MY THEME", new PhoenixTheme(
"FF0B0B0F","FF14141A","FF0C0C10","FF353548","FF00AA55",
"FFD8D8E4","FF7A7A8A","FF404050","FF44CC88","FFFFBB33","FF606070","FF4499FF")); // Sets the theme's colors.
The 11 value overload treats ally as accent.


## How to use the color picker
click the color box in the ingagme editor to open it's subscreen

## Existing Themes

default themes
dark, light, pastel, crimson, ocean, phantom, ember, rainbow, pastel rainbow,magma
