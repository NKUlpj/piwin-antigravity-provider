# Antigravity for Piwin

Piwin provider extension for **Antigravity / Google Cloud Code Assist** — Gemini,
plus the Claude and GPT-OSS models Antigravity advertises.

## Features
- **Google OAuth (PKCE)**: native browser sign-in with automatic localhost callback,
  plus a paste-the-callback-URL fallback for remote/headless machines.
- **Dynamic model catalog**: runtime model discovery with thinking-level grouping
  (`gemini-3.8-flash` low/medium/high, and the Claude / GPT-OSS models your account
  advertises).
- **Quota diagnostics**: `/antigravity.usage`, `/antigravity.models`,
  `/antigravity.doctor`, `/antigravity.refresh`.
- **Linked accounts**: `/antigravity.accounts` switch/remove, with automatic failover
  to the next account on a hard quota wall.
- **Image generation**: `/antigravity.image` command plus the `generate_image` tool
  (native images API where the host supports it).
- **Web search**: `/antigravity.search` command plus the `google_search` grounding tool.
- **Zero runtime dependencies**: self-contained bundles compatible with Piwin's
  immutable extension store (only the `@earendil-works/pi-ai` /
  `@earendil-works/pi-coding-agent` host packages stay external).

## Install

Install the staged package directory into Piwin, then sign in:

```text
/login antigravity
```

Choose a model, for example:

```text
/model antigravity/gemini-3.8-flash
```

Adapted from [Rahularya01/pi-antigravity](https://github.com/Rahularya01/pi-antigravity) v0.10.0.
