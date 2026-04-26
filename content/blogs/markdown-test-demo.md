---
title: "Markdown Test: Every Feature Demo"
excerpt: "A comprehensive test of all markdown features supported by the blog system. Headings, lists, tables, code blocks, images, and more."
date: "2026-04-26"
readTime: "5 min read"
tags: ["Test", "Markdown", "Demo"]
thumbnail: "/images/test.png"
---

# Markdown Test: Every Feature Demo

This post tests **every** markdown feature to make sure the blog renders everything correctly.

---

## Headings

# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading

---

## Text Formatting

**Bold text** looks strong.

*Italic text* looks slanted.

***Bold and italic*** combines both.

~~Strikethrough~~ crosses things out.

`Inline code` for small snippets.

---

## Links

[External link to Google](https://google.com)

[Internal link to homepage](/)

---

## Lists

### Unordered List

- First item
- Second item
- Third item with nested:
  - Nested item A
  - Nested item B
    - Deep nested item
- Back to top level

### Ordered List

1. First step
2. Second step
3. Third step
   1. Sub-step A
   2. Sub-step B
4. Final step

### Mixed List

- Main point
  1. Sub-point one
  2. Sub-point two
- Another main point
  - Unordered sub
  - Another unordered sub

---

## Blockquotes

> This is a simple blockquote.

> This is a multi-line blockquote.
> It spans multiple lines.
>
> And has multiple paragraphs.

> Nested blockquotes:
>> This is nested inside.
>> Multiple lines too.
> Back to outer level.

---

## Code Blocks

### Inline Code

Use `console.log("hello")` for debugging.

### Code Block (No Language)

```
This is a plain code block.
No syntax highlighting here.
Just raw text.
```

### JavaScript

```javascript
function greet(name) {
  const message = `Hello, ${name}!`;
  console.log(message);
  return message;
}

greet("World");
```

### Python

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
```

### TypeScript

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "Nutt",
  email: "hi@itsnutt.me"
};
```

### Bash

```bash
#!/bin/bash
echo "Setting up project..."
npm install
npm run build
echo "Done!"
```

### CSS

```css
.blog-content img {
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

---

## Tables

### Simple Table

| Name | Role | Status |
|------|------|--------|
| Nutt | Developer | Active |
| Alice | Designer | Active |
| Bob | Manager | Away |

### Alignment Table

| Left | Center | Right |
|:-----|:------:|------:|
| L1 | C1 | R1 |
| L2 | C2 | R2 |
| L3 | C3 | R3 |

### Complex Table

| Feature | Firebase | Supabase | Self-hosted |
|:--------|:---------|:---------|:------------|
| Database | Firestore | PostgreSQL | MySQL/Postgres |
| Real-time | Yes | Yes | WebSocket |
| Auth | Built-in | Built-in | OAuth/Custom |
| Storage | Yes | Yes | MinIO/S3 |
| Pricing | Pay per read | Compute-based | Server costs |
| Self-host | No | Yes | Yes |

---

## Images

### Single Image

![Drone photo](/images/drone.png)

### Image with Emphasis Context

Here's a drone build photo:

![Test image](/images/test.png)

Images should be full-width with rounded corners.

---

## Horizontal Rules

Above the rule.

---

Below the rule.

***

Another style.

___

And another.

---

## HTML Elements (if supported)

<details>
<summary>Click to expand</summary>

This is hidden content inside a details element.

- Item 1
- Item 2

</details>

---

## Mixed Content

> **Note:** This blockquote contains **bold**, *italic*, and `code`.
>
> It also has a [link](/) inside.

Here's a paragraph with **bold**, *italic*, `code`, and a [link](https://example.com).

- List item with **bold**
- List item with `code`
- List item with [a link](https://example.com)

| Column 1 | Column 2 |
|----------|----------|
| Cell with **bold** | Cell with `code` |
| Cell with [link](/) | Plain cell |

---

## Long Content Test

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

---

## End

That's all the markdown features! If everything renders correctly, the blog system is working perfectly.
