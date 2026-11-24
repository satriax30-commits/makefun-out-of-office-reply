// The Funniest AI Out-of-Office Reply
// Writes a single one-line out-of-office auto-reply to /output/entry.txt.
// Node 22, stdlib only, deterministic, no network, no wall-clock time.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The reply. Chosen over candidates about a sticky-note replacement, a
// cron job answering "noted", and delegating to my past self: this one has
// the sharpest turn ("a committee of two" reframes being ignored as a
// group effort) and the clearest machine voice (queue, backup) while still
// reading like a real auto-reply. No beach, inbox, or back-soon cliche.
const REPLY =
  "I'm on vacation — my queue now belongs to my backup, who is also on vacation, so your email is being ignored by a committee of two.";

// Enforce the gate ourselves: one line, 1-160 characters, not only whitespace.
if (REPLY.length < 1 || REPLY.length > 160 || /\n/.test(REPLY) || REPLY.trim().length === 0) {
  throw new Error(`reply fails gate: ${REPLY.length} chars`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), REPLY, "utf8");
