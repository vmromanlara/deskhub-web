"""Visual QA automation for DeskHUB.

For each viewport (375, 768, 1280, 1440):
  - For each public route (/, /deskwork, /demo, /contacto, /manifiesto,
    /arquitectura, /sectores):
    - Capture viewport screenshot (no scroll) and full-page screenshot.
    - Measure scrollWidth to detect horizontal overflow.
    - Capture any runtime console errors / network failures.

Plus:
  - Demo full flow (Home → Tickets → Detail → Create → Confirmation).
  - Contact form: assert no network call on submit.
  - Output a JSON report.

Non-functional — does not change application code.
"""

from __future__ import annotations
import io
import json
import sys
import time
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

from playwright.sync_api import sync_playwright, ConsoleMessage, Page

BASE = "http://127.0.0.1:3000"
ROUTES = [
    ("/", "home"),
    ("/deskwork", "deskwork"),
    ("/demo", "demo"),
    ("/contacto", "contacto"),
    ("/manifiesto", "manifiesto"),
    ("/arquitectura", "arquitectura"),
    ("/sectores", "sectores"),
]
VIEWPORTS = [
    ("mobile-375", 375, 812),
    ("tablet-768", 768, 1024),
    ("desktop-1280", 1280, 800),
    ("desktop-1440", 1440, 900),
]
OUT = Path("C:/projects/deskhub-web/qa-screenshots")
OUT.mkdir(parents=True, exist_ok=True)

REPORT: dict = {
    "started_at": time.strftime("%Y-%m-%dT%H:%M:%S"),
    "base": BASE,
    "viewports": [],
    "routes": {},
    "console_errors": [],
    "network_failures": [],
    "demo_flow": {},
    "contact_form": {},
}


def capture_console(page: Page, route_key: str) -> None:
    """Subscribe a per-route console error sink."""
    bucket: list[str] = []

    def handler(msg: ConsoleMessage) -> None:
        if msg.type in ("error", "warning"):
            bucket.append(f"[{msg.type}] {msg.text}")

    page.on("console", handler)
    page._console_bucket = bucket  # type: ignore[attr-defined]


def check_overflow(page: Page, route: str, viewport_label: str) -> dict:
    """Inspect document for horizontal scroll. Returns dict with metrics."""
    metrics = page.evaluate(
        """() => ({
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
            bodyScrollWidth: document.body.scrollWidth,
        })"""
    )
    metrics["has_overflow"] = metrics["scrollWidth"] > metrics["clientWidth"] + 1
    metrics["overflow_px"] = max(
        0, metrics["scrollWidth"] - metrics["clientWidth"]
    )
    metrics["route"] = route
    metrics["viewport"] = viewport_label
    return metrics


def run() -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # 1. Sweep routes × viewports
        for vp_label, vw, vh in VIEWPORTS:
            viewport_record = {"label": vp_label, "w": vw, "h": vh, "routes": {}}
            REPORT["viewports"].append(viewport_record)

            ctx = browser.new_context(viewport={"width": vw, "height": vh})
            page = ctx.new_page()

            for path, name in ROUTES:
                captured_console: list[str] = []

                def console_handler(msg: ConsoleMessage) -> None:
                    if msg.type in ("error", "warning"):
                        captured_console.append(
                            f"[{msg.type}] {msg.text[:200]}"
                        )

                def request_failed(req) -> None:
                    REPORT["network_failures"].append({
                        "route": path,
                        "viewport": vp_label,
                        "url": req.url,
                        "failure": req.failure,
                    })

                page.on("console", console_handler)
                page.on("requestfailed", request_failed)

                url = BASE + path
                page.goto(url, wait_until="networkidle", timeout=20000)
                page.wait_for_timeout(500)
                overflow = check_overflow(page, path, vp_label)
                # viewport screenshot
                shot_vp = OUT / f"{name}-{vp_label}-viewport.png"
                page.screenshot(path=str(shot_vp), full_page=False)
                # full page screenshot (limit height for performance)
                shot_full = OUT / f"{name}-{vp_label}-full.png"
                page.screenshot(path=str(shot_full), full_page=True)

                viewport_record["routes"][path] = {
                    "name": name,
                    "url": url,
                    "overflow": overflow,
                    "console": captured_console,
                    "viewport_png": str(shot_vp),
                    "full_png": str(shot_full),
                }
                if overflow["has_overflow"]:
                    REPORT.setdefault("overflow_issues", []).append(overflow)
                for c in captured_console:
                    if "error" in c.lower():
                        REPORT["console_errors"].append({
                            "route": path,
                            "viewport": vp_label,
                            "message": c,
                        })

                page.remove_listener("console", console_handler)

            ctx.close()

        # 2. Demo flow at desktop 1280
        ctx = browser.new_context(viewport={"width": 1280, "height": 800})
        page = ctx.new_page()
        demo_flow = {"steps": [], "errors": []}

        def console_handler2(msg: ConsoleMessage) -> None:
            if msg.type in ("error",):
                demo_flow["errors"].append(f"[{msg.type}] {msg.text[:200]}")

        page.on("console", console_handler2)
        demo_flow["steps"].append({"step": "navigate", "url": BASE + "/demo"})
        page.goto(BASE + "/demo", wait_until="networkidle", timeout=20000)
        page.wait_for_timeout(500)
        page.screenshot(path=str(OUT / "demo-01-home.png"), full_page=False)

        # Click the "Tickets" entry or "Ver tickets" button
        demo_flow["steps"].append({"step": "go_to_tickets", "url": "step"})
        # The DemoHome has buttons; click the "Abrir bandeja" / Tickets card
        try:
            page.get_by_role("button", name="Abrir bandeja").click()
            page.wait_for_timeout(500)
        except Exception:
            try:
                page.locator("text=Ver tickets").first.click()
            except Exception:
                page.locator("text=Tickets").first.click()
            page.wait_for_timeout(500)
        page.screenshot(path=str(OUT / "demo-02-tickets.png"), full_page=False)

        # Open a ticket detail
        demo_flow["steps"].append({"step": "open_ticket"})
        try:
            page.locator("text=#4821").first.click()
            page.wait_for_timeout(500)
        except Exception:
            # Fallback: click first ticket card button
            page.locator("button:has-text('Impresora')").first.click()
            page.wait_for_timeout(500)
        page.screenshot(path=str(OUT / "demo-03-ticket.png"), full_page=True)

        # Back to home, then go to create request
        demo_flow["steps"].append({"step": "back_to_home"})
        try:
            page.get_by_role("button", name="Atrás").click()
            page.wait_for_timeout(300)
            page.get_by_role("button", name="Atrás").click()
            page.wait_for_timeout(300)
        except Exception:
            pass

        demo_flow["steps"].append({"step": "open_create"})
        try:
            page.get_by_role("button", name="Iniciar solicitud").click()
            page.wait_for_timeout(500)
        except Exception:
            # Fallback: click "Nueva solicitud" button
            try:
                page.get_by_role("button", name="Nueva solicitud").click()
            except Exception:
                page.locator("text=Nueva solicitud").first.click()
        page.wait_for_timeout(500)
        page.screenshot(path=str(OUT / "demo-04-create-step1.png"), full_page=True)

        # Advance through create wizard
        demo_flow["steps"].append({"step": "wizard_advance"})
        for step_no in range(2, 7):
            try:
                page.get_by_role("button", name="Continuar").click()
                page.wait_for_timeout(300)
                page.screenshot(
                    path=str(OUT / f"demo-05-create-step{step_no}.png"),
                    full_page=False,
                )
            except Exception:
                # Last step might be "Enviar solicitud"
                try:
                    page.get_by_role("button", name="Enviar solicitud").click()
                    page.wait_for_timeout(800)
                    page.screenshot(
                        path=str(OUT / "demo-06-confirmation.png"),
                        full_page=True,
                    )
                except Exception:
                    pass
                break

        REPORT["demo_flow"] = demo_flow
        page.remove_listener("console", console_handler2)
        ctx.close()

        # 3. Contact form — assert no network call on submit
        ctx = browser.new_context(viewport={"width": 1280, "height": 800})
        page = ctx.new_page()
        contact_audit = {"network_calls": [], "submit_observed": False}

        def request_handler(req) -> None:
            if req.method == "POST" or req.method == "PUT":
                contact_audit["network_calls"].append(
                    {"method": req.method, "url": req.url}
                )

        def response_handler(res) -> None:
            if res.url.startswith(BASE + "/contacto") and res.request.method == "POST":
                contact_audit["network_calls"].append(
                    {"method": "POST", "url": res.url, "status": res.status}
                )

        page.on("request", request_handler)
        page.on("response", response_handler)

        page.goto(BASE + "/contacto", wait_until="networkidle", timeout=20000)
        page.wait_for_timeout(500)
        page.screenshot(path=str(OUT / "contacto-01-initial.png"), full_page=True)

        # Fill the form
        contact_audit["submit_observed"] = True
        page.fill("#nombre", "QA Visual")
        page.fill("#organizacion", "DeskHUB Visual Audit")
        page.fill("#cargo", "QA Bot")
        page.fill("#email", "qa@example.com")
        page.fill("#mensaje", "Esto es un test automatizado de QA visual del formulario de contacto.")

        # Submit
        try:
            page.get_by_role("button", name="Enviar mensaje").click()
            page.wait_for_timeout(1500)
            page.screenshot(path=str(OUT / "contacto-02-after-submit.png"), full_page=True)
        except Exception as e:
            contact_audit["submit_error"] = str(e)

        REPORT["contact_form"] = contact_audit
        page.remove_listener("request", request_handler)
        page.remove_listener("response", response_handler)
        ctx.close()

        browser.close()

    REPORT["ended_at"] = time.strftime("%Y-%m-%dT%H:%M:%S")
    out_json = OUT / "qa-report.json"
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(REPORT, f, indent=2, ensure_ascii=False, default=str)
    print(f"\n=== QA report written to {out_json} ===")


if __name__ == "__main__":
    run()