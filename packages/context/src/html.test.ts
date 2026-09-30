import { describe, expect, it } from "vitest";
import { parseHtml } from "./html.js";

describe("DocBook HTML examples", () => {
  it("preserves bare preformatted blocks, indentation and inline markup as code", () => {
    const parsed = parseHtml(
      `<h1>systemd.service</h1><h2>Example</h2>
      <pre class="programlisting">[Service]\nExecStart=/usr/bin/<em>example</em> \\\n        --flag=&lt;value&gt;</pre>`,
      "systemd.service.html",
    );
    expect(parsed.sections[0]?.hasCode).toBe(true);
    expect(parsed.sections[0]?.content).toContain(
      "[Service]\nExecStart=/usr/bin/example",
    );
    expect(parsed.sections[0]?.content).toContain("        --flag=<value>");
  });

  it("keeps backtick runs inside a single fenced code block", () => {
    const parsed = parseHtml(
      "<h1>Guide</h1><h2>Example</h2><pre>first\n```\nlast</pre>",
      "guide.html",
    );
    expect(parsed.sections).toHaveLength(1);
    expect(parsed.sections[0]?.hasCode).toBe(true);
    expect(parsed.sections[0]?.content).toContain(
      "````\nfirst\n```\nlast\n````",
    );
  });

  it("preserves language detection for existing pre/code blocks", () => {
    const parsed = parseHtml(
      '<h1>Guide</h1><h2>Example</h2><pre><code class="language-sh">echo hello</code></pre>',
      "guide.html",
    );
    expect(parsed.sections[0]?.content).toContain("```sh\necho hello\n```");
  });
});

describe("HTML headings", () => {
  it("keeps linked heading text and drops permalink anchors", () => {
    const parsed = parseHtml(
      `<h1>Design FAQ</h1>
      <h2><a class="toc-backref" href="#id3" role="doc-backlink">Why are Python strings immutable?</a><a class="headerlink" href="#why" title="Link to this heading">¶</a></h2>
      <p>There are several advantages.</p>
      <h3>Performance<a class="headerlink" href="#performance" title="Link to this heading">¶</a></h3>
      <p>Strings of fixed size can be stored efficiently.</p>
      <h2>Constants added by the <a class="reference internal" href="site.html#module-site"><code class="xref py py-mod docutils literal notranslate"><span class="pre">site</span></code></a> module<a class="headerlink" href="#constants" title="Link to this heading">¶</a></h2>
      <p>The site module adds several constants.</p>
      <h2 id="traits">Traits<a class="anchor" href="#traits">§</a></h2>
      <p>Shared behaviour for types.</p>
      <h2 id="setup"><span>Setup<a class="hash-link" href="#setup" aria-label="Direct link">&#8203;</a></span></h2>
      <p>Install the package first.</p>`,
      "faq/design.html",
    );
    expect(parsed.sections.map((s) => s.sectionTitle)).toEqual([
      "Why are Python strings immutable?",
      "Constants added by the site module",
      "Traits",
      "Setup",
    ]);
    // Only section titles change: anchors in other headings stay in the content, which
    // keeps its link ratio (and so the table-of-contents filter's verdict) as before.
    expect(parsed.sections[0]?.content).toContain("[¶](#performance");
  });
});
