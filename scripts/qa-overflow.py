"""Identify which DOM element causes horizontal overflow at 768px viewport."""
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    ctx = browser.new_context(viewport={"width": 768, "height": 1024})
    page = ctx.new_page()
    page.goto("http://127.0.0.1:3000/", wait_until="networkidle", timeout=20000)
    page.wait_for_timeout(500)

    # Walk every element; report those whose right edge exceeds viewport.
    result = page.evaluate(
        """() => {
            const out = [];
            const vw = document.documentElement.clientWidth;
            const all = document.querySelectorAll('*');
            for (const el of all) {
                const rect = el.getBoundingClientRect();
                if (rect.right > vw + 1) {
                    out.push({
                        tag: el.tagName.toLowerCase(),
                        cls: (el.className && el.className.toString().slice(0, 120)) || '',
                        right: Math.round(rect.right),
                        width: Math.round(rect.width),
                        overflow: Math.round(rect.right - vw),
                        text: (el.textContent || '').trim().slice(0, 80),
                    });
                }
            }
            return { vw, count: out.length, offenders: out.slice(0, 30) };
        }"""
    )
    print(f"Viewport width: {result['vw']}px")
    print(f"Elements overflowing: {result['count']}")
    print()
    for o in result["offenders"]:
        print(
            f"<{o['tag']}> +{o['overflow']}px (right={o['right']} w={o['width']}) "
            f"cls=\"{o['cls']}\" text=\"{o['text']}\""
        )

    browser.close()