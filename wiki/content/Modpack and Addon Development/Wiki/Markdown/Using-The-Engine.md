---
title: Using Wiki's Rich text engine.
---

**Wiki's** **RichText**/**Markdown** parsing/rendering can be used outside **Wiki**. This page will show how to 
set up the strings to be sent to the parser, render the actual formatting in your screen, and add onto the engine.

First, we need to clarify a few key classes.

 - `RichSpan`: This class handles inline parsing/rendering such as **bold** or *italic* ingame.
 - `RichBlock`: This class handles block level rendering such as parapgrahs or headings.
 - `WikiMarkdownParser`: The actual parser that produces a parsed result and sends it to the next class.
 - `WikiRichTechRenderer`: The rendering engine that takes in the information sent to it by the above to give information to an actual render call.

This will be a very basic example. **Phoenix Chronicles** and **Phoenix Archives** are good examples for going more in depth.

For this example, rich text is parsed and rendered using one Screen class. 
However, you can have a separate file parse the Markdown and then pass that into your screen's renderer.

There are six parts to using the engine.

1. Making a list of `RichBlock` entries.
2. Passing the string into `WikiMarkdownParser`.
3. Rendering the parsed text from `WikiRichTextRenderer`.
4. Iterating through the rendered `RichBlock` entries with click actions 
for interactive **Markdown** elements such as links.
5. Optionally overwriting the base resloc of texture/image handling of `wiki` to your own mod's assets.
6. Optionally add onto the engine as noted on the bottom of this page.

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

You can also add onto the engine.

There are three entry points. 

- `BlockParserRegistry.DEFAULT.register(new BlockParser() {}`
Handles registry for adding more block level elements to the parser. Some default examples include callouts and headings.
```java
public static void registerCustomBlock() {
    BlockParserRegistry.DEFAULT.register(new BlockParser() {
        @Override
        public boolean accepts(String line) {
            // (1)
            return line.startsWith(":::notice");
        }

        @Override
        public BlockParserResult parse(List<String> lines, int index, List<String> footnotes) {
            String line = lines.get(index);
            String message = line.replace(":::notice", "").trim();

            // (2)
            RichBlock block = new RichBlock.Callout("notice", message, List.of());
            return new BlockParserResult(block, 1); // (3)
        }
    });
}
```

    1. Trigger for the new block level entry.

    2. Link your new trigger to an existing entry. (Existing ones can be found here [Usage Examples](./Usage-Examples.md).)

    3. How many lines the new entry consumes when active.

- `InlineHandlerRegistry.DEFAULT.register("custom_highlight", (matcher, spans) -> {}`
Handles registry for adding more inline elements to the parser. Default examples include bold or italic.
```java
public static void registerCustomInline() {
        // (1)
        InlineHandlerRegistry.DEFAULT.register("custom_highlight", (matcher, spans) -> {
            String content = matcher.group(1);
            // (2)
            spans.add(new RichSpan.Text(content, Style.EMPTY.withColor(0xFFFF5555)));
        });
    }
```

    1. Register and name your new handler pattern.
    
    2. Add a custom text span or interactive elements such as mob rendering or custom link types.

- `BlockRendererRegistry.DEFAULT.register(MyCustomBlock.class, new BlockRenderer<MyCustomBlock>() {}`
This is where you go through for creating your own parsed elements outside block/inline elements. A basic example is provided below.
```java
public record MyCustomBlock(String data) implements RichBlock {
        @Override public List<RichSpan> spans() { return List.of(); }
    }

    public static void registerCustomRenderer() {
        // (1)
        BlockRendererRegistry.DEFAULT.register(MyCustomBlock.class, new BlockRenderer<MyCustomBlock>() {
            @Override
            public int measure(RenderContext ctx, MyCustomBlock block, int y, int maxW) {
                // (2)
                return 20; 
            }

            @Override
            public int render(RenderContext ctx, MyCustomBlock block, int x, int y, int maxW) {
                // (3)
                ctx.g.fill(x, y, x + maxW, y + 20, 0xFF333333);
                ctx.g.drawString(ctx.font, block.data(), x + 4, y + 6, 0xFFFFFFFF, false);
                return y + 20; 
            }
        });
    }
```

    1. Register your custom block type.

    2. How much pixels in height your custom block takes.

    3. Your own rendering logic taking the defined trigger and using it. 