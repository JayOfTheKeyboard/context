---
"@neuledge/context": patch
---

Keep bold, italic, link and inline-code text in section titles. Only a heading's top-level text was read, so words inside formatting or links were dropped from the title, which has the highest search weight. In the Python docs, 300 of 6,475 sections lost words (`Numeric Types — int, float, complex` became `Numeric Types — , , `), including 152 FAQ and guide sections whose heading is a link and which were titled "Introduction". Markdown was hit too: `## Using [superjson](...)` became "Using ". Heading permalinks such as Sphinx's "¶" stay out of the title.
