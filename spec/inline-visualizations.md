# Inline visualizations

Status: approved specification. Uses [shared runtime contracts](runtime-contracts.md). Adapts T3's `html_render` idea to a standalone page; server-based `html_preview` screenshots are not included.

## Intent and actors

An agent-facing `html_render` tool displays a self-contained chart, diagram, or interactive explanation in chat. The user can expand, inspect source, download, or remove the artifact from view. Artifact scripts are isolated presentation code; they have no task mutation, model-session, attachment, authentication, or policy APIs.

## Contract

Required input: `version: 1`, `title` (1–120 characters), `html` (1–48000 characters), and `height` (integer 160–1200 CSS pixels). All fields are closed and validated. The HTML is a complete document containing its own styles and optional script. Reject network resources and content that exceeds the budget; do not silently cut a document. Inputs do not include JavaScript callbacks or task-store handles.

```json
{"type":"tool_call","name":"html_render","arguments":{"version":1,"title":"Tasks by priority","html":"<!doctype html><html lang=\"en\"><meta charset=\"utf-8\"><title>Tasks by priority</title><style>body{font:16px system-ui;padding:16px}</style><h1>Tasks by priority</h1><p>High: 2. Normal: 5. Low: 1.</p></html>","height":240}}
```

Success: `{ success: true, version: 1, artifactId: ID, title, status: 'rendered', height }`. It means the frame was mounted, not that the model's facts or JavaScript are correct. Return `unsupported` or `invalid_arguments` on isolation/resource-policy failure. Never report a screenshot or visual quality check that did not occur. Error events may later update artifact diagnostics outside the original tool result.

## UI and isolation mapping

Map title to a plain-text card heading and iframe `title`; HTML goes only into the frame's `srcdoc`; height sets a bounded wrapper height. Use `<iframe sandbox="allow-scripts">` without `allow-same-origin`, popup, download, form, or top-navigation privileges. Embed an application-supplied restrictive CSP before model content: default/network/connect/object/base/form/frame/worker sources denied; only inline script/style and local `data:` image resources needed by this feature are allowed. Do not grant `language-model` or WebMCP permissions to the frame. Test actual browser enforcement, including CSS resource URLs and nested frames.

The parent never inserts generated HTML with `innerHTML` or executes its scripts. Do not implement arbitrary postMessage commands. If resizing/diagnostics are supported, inject a fixed application bridge into the isolated document and accept only bounded diagnostic/resize messages from that exact `contentWindow`, with a per-mount nonce and exact message schema. Opaque-origin `event.origin === 'null'` is not sufficient authentication. No returned message may invoke parent tools or write state. The frame's requested size never bypasses parent limits.

Show a static heading, requested viewport, scrollable content, and source/download controls outside the frame. User interaction stays inside it; keyboard focus may leave it normally. Downloads are initiated by the parent after a user gesture and contain the HTML, without embedded task credentials or app handles. Removal disposes the frame and revokes parent-created object URLs; history may retain the artifact metadata/content subject to retention settings.

## Model instructions and context

Description: “Display a finished self-contained visualization of information already obtained for the current request. Supply accessible HTML, inline CSS, and optional local interaction. No external resources or app access. Rendering does not change saved tasks. Keep it concise and include text alternatives.”

Prefer compact static charts for small results; include only task fields needed for the visualization. Do not keep full HTML in every subsequent observation or compaction summary: return an artifact reference and short title. An artifact cannot serve as a new permission prompt or pretend that clicking it applies task changes. For actual changes use existing tools or a separate reviewed proposal.

## Integration, limits, and acceptance

Add `artifacts.js` and `artifact-view.js`; compose local execution and render via `onAgentEvent()`. Persist content separately from thread messages in IndexedDB, with ownership and removal/tombstone references for future sync. Default maximum: 10 artifacts or 1 MiB per thread; reject new ones with a clear limit until the user removes retained artifacts. Unmount on Stop/teardown if still mounting.

Test malicious HTML cannot access parent storage, navigate the page, fetch URLs, open windows, run tools, or forge another artifact's bridge messages. Test a working local interaction, long content/mobile scrolling, errors, download cleanup, ownership, disabled dispatch, and no invented screenshot support. Infinite loops and resource-heavy generated scripts remain a limitation of in-page rendering; provide a user Close artifact control and document the option to disable script execution entirely. No claim of a perfect resource sandbox is made.
