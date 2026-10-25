---
title: Using Wiki's Rich text engine.
---

**Wiki's** **RichText**/**Markdown** parsing/rendering can be used outside **Wiki**. This page will show how to 
set up the strings to be sent to the parser, then render the actual formatting in your screen.

This will be a very basic example. **Phoenix Chronicles** and **Phoenix Archives** are good examples for going more in depth.

For this example, rich text is parsed and rendered using one Screen class. 
However, you can have a separate file parse the Markdown and then pass that into your screen's renderer.

There are five parts to using the engine.

1. Making a list of `RichBlock` entries.
2. Passing the string into `WikiMarkdownParser`.
3. Rendering the parsed text from `WikiRichTextRenderer`.
4. Iterating through the rendered `RichBlock` entries with click actions 
for interactive **Markdown** elements such as links.
5. Optionally overwriting the base resloc of texture/image handling of `wiki` to your own mod's assets.

```java
public class CustomWikiWidgetScreen extends Screen {

    private List<RichBlock> parsedBlocks;
    private List<RichSpan.Region> lastRegions = new ArrayList<>();

    public CustomWikiWidgetScreen() {
        super(Component.literal("Interactive Wiki View"));

        // (1)
        WikiRichTextRenderer.registerImageResolver(loc -> {
            if (loc.getNamespace().equals("wiki")) {
                return new ResourceLocation("yourmodid", loc.getPath()); // (2)
            }
            return loc;
        });
    }

    @Override
    protected void init() {
        super.init();

        // (3)
        String markdownContent = """
                # Interactive Wiki Example
                Check out our [documentation website](https://example.com).
                
                ![Wiki Icon](wiki:textures/gui/icon.png)
                
                Click this code block to copy it:
                `code_snippet_example.gradle`
                """;

        this.parsedBlocks = WikiMarkdownParser.parse(markdownContent); // (4)
    }

    @Override
    public void render(GuiGraphics guiGraphics, int mouseX, int mouseY, float partialTick) {
        super.render(guiGraphics, mouseX, mouseY, partialTick);

        // (5)
        if (parsedBlocks != null) {
            int x = 40;
            int y = 40;
            int maxWikiWidth = 200;

            
            lastRegions = WikiRichTextRenderer.renderBlocks(
                    guiGraphics,
                    this.font,
                    parsedBlocks,
                    x, y,
                    maxWikiWidth,
                    0,
                    0,
                    this.height
            );
        }
    }

    @Override
    public boolean mouseClicked(double mouseX, double mouseY, int button) {
        if (button == 0) {
            for (RichSpan.Region region : lastRegions) {
                if (region.contains(mouseX, mouseY)) {
                    RichSpan span = region.span();

                    if (span instanceof RichSpan.Link link) {
                        // (6)
                        if (this.minecraft != null && this.minecraft.keyboardHandler != null) {
                            // (7)
                            Util.getPlatform().openUri(link.url());
                        }
                        return true;
                    } else if (span instanceof RichSpan.CodeCopy copy) {
                        if (this.minecraft != null) {
                            this.minecraft.keyboardHandler.setClipboard(copy.code()); // (8)
                        }
                        return true;
                    }
                }
            }
        }
        return super.mouseClicked(mouseX, mouseY, button);
    }
}
```

1. Make a new image resolver instance to allow your screen to use Wiki's image parsing.

2. Overriding Wiki's default resource location to your mod's.

3. Pretty much any String can be used for Markdown parsing.

4. Register your string(s) into the parser.

5. Render the parsed blocks of text into your Screen like so.

6. Handling clicks through RichSpan text.

7. Handling links.

8. Handling clipboard actions.

