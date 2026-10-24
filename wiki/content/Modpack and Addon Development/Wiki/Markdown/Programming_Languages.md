---
title: Programming Examples
---

**PhoenixWiki** supports **Markdown** parsing for many programming languages.

The default ones include `rust`, `C`, `C#`, `HotChocolate`, `JavaScript`, `TypeScript`, Kotlin`, `Python`, and `Java`.
However, more can be added if your favorite one is missing.

Adding a new language is a client event and can be done in your mod's *main client class*.

```java
import net.phoenixvine.wiki.client.rich.highlight.LanguageDefinition;
import net.phoenixvine.wiki.client.rich.highlight.LanguageRegistry;
import java.util.Set;

public class MyModClientInit {

    public static void init() {
        LanguageDefinition luaDef = new LanguageDefinition( // (1)
            Set.of( 
                "and", "break", "do", "else", "elseif", "end", "false", "for", 
                "function", "if", "in", "local", "nil", "not", "or", "repeat", 
                "return", "then", "true", "until", "while"
            ), // (2)
            false, // (3)
            false  // (4)
        );

        // (5)
        LanguageRegistry.register(luaDef, "lua", "luau");
    }
}
```

1. Make a new instance of the LanguageDefinition.

2. Make a Set of the keywords for your chosen language.

3. Whether template literals are supported

4. Whether annotations are supported.

5. Register your instance of LanguageDefinition with the name of language and aliases.

After your language is registered, it should work ingame!

```lua
local function greet(name)
    print("Hello, " .. name .. "!")
end

greet("Wiki Editor")
```