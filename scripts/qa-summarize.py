import json
import io
import os
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

with open("qa-screenshots/qa-report.json", encoding="utf-8") as f:
    r = json.load(f)

print("=== SUMMARY ===")
print("Started:", r.get("started_at"))
print("Ended:", r.get("ended_at"))
print()

print("=== Overflow issues ===")
overflows = r.get("overflow_issues", [])
print(f"Found {len(overflows)} horizontal-overflow issues")
for o in overflows:
    print(
        f"  {o['viewport']:14s} {o['route']:18s} scrollW={o['scrollWidth']} "
        f"clientW={o['clientWidth']} overflow={o['overflow_px']}px"
    )
print()

print("=== Console errors ===")
errs = r.get("console_errors", [])
print(f"Found {len(errs)} console errors")
for e in errs[:20]:
    print(f"  [{e['viewport']}] {e['route']}: {e['message']}")
print()

print("=== Network failures ===")
nets = r.get("network_failures", [])
print(f"Found {len(nets)} network failures")
for n in nets[:20]:
    print(f"  [{n['viewport']}] {n['route']} - {n['url']}: {n['failure']}")
print()

print("=== Demo flow ===")
df = r.get("demo_flow", {})
print("Steps:", len(df.get("steps", [])))
print("Errors:", df.get("errors", []))
print()

print("=== Contact form ===")
cf = r.get("contact_form", {})
print("Submit observed:", cf.get("submit_observed"))
print("Network POST calls:", len(cf.get("network_calls", [])))
if cf.get("network_calls"):
    for nc in cf["network_calls"]:
        print(f"  {nc}")
if cf.get("submit_error"):
    print("submit_error:", cf["submit_error"])
print()

print("=== Files generated ===")
for f in sorted(os.listdir("qa-screenshots")):
    size = os.path.getsize(f"qa-screenshots/{f}")
    print(f"  {size:>8d}  {f}")