# Agent Prototype

Daylist is a browser-only to-do manager with a chatbot side panel. It uses Chrome’s Prompt API or an explicitly configured local text endpoint, WebMCP for page tools, and IndexedDB for tasks and runtime diagnostics. The assistant can ask structured questions and continue the same request after an answer.

The complete prototype lives in [`docs/`](docs/README.md). Its tools can add, edit, complete/reopen, list, and search tasks.

**GitHub Pages:** https://jpconstantineau.github.io/Agent-Prototype/

## Run locally

```sh
cd docs
npm start
```

Open http://localhost:5173 in desktop Chrome. Node 20+ is needed only for the local static server and development tests. Hosted visitors do not need Node or npm.

## Publishing

In **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, select **main** and **/docs**, then save. GitHub Pages serves `docs/index.html` at the site root and republishes updates pushed to `main`. The `.nojekyll` file lets Pages serve this static app directly.

The source directory is lowercase `docs`, matching GitHub Pages' branch publishing option. No custom build workflow is needed.

All asset and module URLs are relative, so the app works under the repository's `/Agent-Prototype/` URL. See [`docs/README.md`](docs/README.md) for Chrome model/WebMCP setup, tool contracts, framework details, and tests. Hosted WebMCP or Prompt API availability may depend on your Chrome version and applicable origin trials; the app reports actual browser capabilities and supports manual tasks when AI is unavailable.

The browser framework adapts the model → tool → observation loop from [early-signal-tech/duckdb-agent-loop-poc](https://github.com/early-signal-tech/duckdb-agent-loop-poc). No Python code or cloud inference service is needed.

The [foundation implementation guide](docs/README.md#foundation-implementation) covers structured questions, local-model Settings and Chrome fallback, shared runtime behavior, and test limitations. The remaining [epic specifications](spec/README.md) describe later capabilities.

Using Lemonade for local inference? Follow the [Lemonade setup guide](docs/README.md#using-lemonade), including its allowed-origin setting and Chrome network permission for the hosted app.

The proposed [UI guidelines and framework](UI-Spec/README.md) document design tokens, native click-to-edit forms, Bootstrap layouts and the user purpose of every CSS declaration. Inspect the [live UI reference](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/) after Pages publishes this revision.

The [dashboard research and contracts](UI-Spec/DASHBOARDS.md) compare native/CSS options from other component libraries. Inspect [dashboard examples](https://jpconstantineau.github.io/Agent-Prototype/ui-spec/dashboard.html) for sparklines, comparison bars, targets, capacity and observation strips.
