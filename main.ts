// The Tired Dark Lord: A 100-Word Villain Monologue
// Writes the monologue to /output/entry.txt and validates it against
// the competition gate (1-600 characters, non-whitespace, ~100 words).

import { mkdirSync, writeFileSync } from "node:fs";

const MONOLOGUE =
  "Sit. Not the throne — the stool. It wobbles. Three hundred years I have held the Black Spire up, and do you know what holds it? Not dark arts. Mortar. And a ledger. I tax the farms in grain, in goats, in first sons — and still the roof leaks. The cult meets Tuesdays. Tuesdays! I have a doom to speak and a drip over my bed. So take the sword. Strike. Just — hold on. Let me find my specs first. I want to see the face of the fool who ends me. Ah. There. Now. Quick. The stew is on.";

// Gate constants for this competition (see RULES.txt: 1-600 chars).
const MIN_CHARS = 1;
const MAX_CHARS = 600;
const EXPECTED_CHARS = 482;
const EXPECTED_WORDS = 102;

function wordCount(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length;
}

interface GateFailure {
  check: string;
  detail: string;
}

function checkGate(text: string): GateFailure[] {
  const failures: GateFailure[] = [];
  if (text.trim().length === 0) {
    failures.push({ check: "non-empty", detail: "entry is empty or only whitespace" });
  }
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    failures.push({
      check: "length",
      detail: `entry is ${text.length} characters, gate is ${MIN_CHARS}-${MAX_CHARS}`,
    });
  }
  if (text.length !== EXPECTED_CHARS) {
    failures.push({
      check: "exact-chars",
      detail: `expected ${EXPECTED_CHARS} characters, got ${text.length}`,
    });
  }
  const words = wordCount(text);
  if (words !== EXPECTED_WORDS) {
    failures.push({
      check: "word-count",
      detail: `expected ${EXPECTED_WORDS} words, got ${words}`,
    });
  }
  if (text !== text.trim()) {
    failures.push({ check: "no-edge-whitespace", detail: "entry has leading or trailing whitespace" });
  }
  if (/ {2,}/.test(text) || /\n/.test(text)) {
    failures.push({ check: "single-line-spacing", detail: "entry has double spaces or newlines" });
  }
  return failures;
}

function validateGate(text: string): void {
  const failures = checkGate(text);
  if (failures.length > 0) {
    const report = failures.map((f) => `${f.check}: ${f.detail}`).join("; ");
    throw new Error(`gate failed (${failures.length}): ${report}`);
  }
}

validateGate(MONOLOGUE);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", MONOLOGUE, "utf8");

console.log(
  `wrote /output/entry.txt (${MONOLOGUE.length} chars, ${wordCount(MONOLOGUE)} words)`,
);
