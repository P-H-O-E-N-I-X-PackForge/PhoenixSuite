---
title: Usage Examples
---

## What does Wiki's Markdown/Rich Text Engine actually support?
It supports *block level and inline level* elements for showing information to users.
These include formatting, custom logic (as such in the case as links), and sizing.

## Block Level Markdown
| Element                 | Syntax / Tag                                         | Description & Behavior                                                                                                                                                                    |
|:------------------------|:-----------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Headings**            | `# H1` through `###### H6`                           | Collapsible by default. Append `{flat}` or `{nocollapse}` after the text to opt out.                                                                                                      |
| **Lists**               | `-`, `*`, `+` or `1.`                                | Supports unordered (`-`, `*`, `+`) and ordered (`1.`) lists.                                                                                                                              |
| **Checklists**          | `- [ ] text` / `- [x] text`                          | Persisted checkmark boxes that fire an "All checks complete!" banner when all items are checked.                                                                                          |
| **Blockquote**          | `> text`                                             | Consecutive lines join with a space.                                                                                                                                                      |
| **Rule**                | `---`, `***`, `___`                                  | Horizontal divider rendered with 3 or more matching characters in a row.                                                                                                                  |
| **Tables**              | Standard pipe syntax                                 | Header row, `\| - \| - \|` separator row, followed by data rows.                                                                                                                          |
| **Footnotes**           | `[^1]: text` / `[^1]`                                | Defined anywhere and referenced inline. Supports guarded/conditional variants (`[^1?condition]:`) with unconditioned fallbacks.                                                           |
| **Collapsible Details** | `:::details Title` / `:::spoiler`                    | Expandable container that opens on click.                                                                                                                                                 |
| **Loading Callout**     | `:::loading Title`                                   | Same as details, but displays `"⚛ Consulting the reactor…"` for ~550ms before content appears.                                                                                            |
| **Hotspots**            | `:::hotspots ns:path,W,H`                            | A clickable-hotspot image using `@x,y` tooltip text lines inside.                                                                                                                         |
| **Scaling**             | `{scale:X}`                                          | Placed on its own line to scale everything after it until reset.                                                                                                                          |

### Customized callouts.
There are also some more "special" callouts.

| Container Type (`:::type`)   | Aliases                           | Description & Behavior                                                                                            |
|:-----------------------------|:----------------------------------|:------------------------------------------------------------------------------------------------------------------|
| **Warning**                  | `:::warning`, `:::warn`           | Callout for warnings and cautions.                                                                                |
| **Danger**                   | `:::danger`, `:::error`           | Callout for errors and critical dangers.                                                                          |
| **Tip**                      | `:::tip`, `:::success`            | Callout for helpful tips and successes.                                                                           |
| **Note**                     | `:::note`, `:::info`              | Callout for general notes and information.                                                                        |
| **Skill Issue**              | `:::skill_issue`, `:::skillissue` | Callout for user errors.                                                                                          |
| **Cope**                     | `:::cope`, `:::copium`            | Callout for coping statements.                                                                                    |
| **Details / Spoiler**        | `:::details`, `:::spoiler`        | Collapsible container with a title, click to expand.                                                              |
| **Generic (Any other type)** | *Any custom string*               | Renders generically with a purple dot icon and a title-cased label for free extensibility.                        |

### Code Blocks: Supports lang tags and renders a button on the right side that is clicked to copy.
` ```js ``` `
Current languages supported are: JavaScript, Rust, Hot Chocolate, Python, TypeScript, C, C++, C#, Kotlin, and Java.

More can be added, if you want to learn how to do that check out [Language Parsing](./Language-Parsing.md).

## Inline Markdown

| Element              | Syntax / Tag                                                               | Description & Behavior                                                                                     |
|:---------------------|:---------------------------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------|
| **Text Styling**     | `**bold**`, `*italic*`, `~~strikethrough~~`, `==highlight==`, `` `code` `` | Standard formatting. Code spans are click to copy..                                                        |
| **Keycap**           | `<kbd>Ctrl</kbd>`                                                          | Renders a styled keycap.                                                                                   |
| **Colors & Scaling** | `{#RRGGBB}text{reset}`, `{scale:N}`                                        | Hex color runs and inline scaling (applies inline as well as on its own line).                             |
| **Smart Quotes**     | `"`                                                                        | Auto-alternates open/close curly quotes (skipped inside code spans).                                       |
| **Inline Image**     | `[img:ns:path,W,H]`                                                        | Inline image with optional width and height (defaults to 48×48).                                           |
| **Item Icon**        | `[item:ns:id]` or `[item:ns:id\|tooltip text]`                             | Renders an item icon with an optional tooltip.                                                             |
| **Links**            | `[label](url)`                                                             | Supports HTTP(S), wiki deep-links (`wiki:namespace/basePath#pageId`) or hover tooltips (`tip:hover text`). |
| **Image Links**      | `[img:ns:path](anything)`                                                  | Allows using an inline image as a clickable link label.                                                    |
| **404 Handling**     | Automatic                                                                  | Unresolved wiki links or initial deep-links display a themed page with a return link.                      |


