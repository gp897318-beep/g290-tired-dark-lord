import { mkdirSync, writeFileSync } from "node:fs";

// The Tired Dark Lord: a 100-word monologue for a fantasy villain
// who is secretly just very tired. The tiredness lives in the
// rhythm — short fragments, pauses, small deflections — never in a
// plain statement. Three hundred years holding the Black Spire up,
// and what holds it is not dark arts but mortar and a ledger: taxes
// in grain, goats and first sons, a cult that meets Tuesdays, a
// leak over his bed. He is specific, with a history and a scheme,
// and the sting lands in the last line: the stew is on.
const monologue =
  "Sit. Not the throne — the stool. It wobbles. Three hundred years I have held the Black Spire up, and do you know what holds it? Not dark arts. Mortar. And a ledger. I tax the farms in grain, in goats, in first sons — and still the roof leaks. The cult meets Tuesdays. Tuesdays! I have a doom to speak and a drip over my bed. So take the sword. Strike. Just — hold on. Let me find my specs first. I want to see the face of the fool who ends me. Ah. There. Now. Quick. The stew is on.";

// The gate: UTF-8 text, 1-600 characters. Near 100 words: keep it
// between 90 and 110 so an invalid monologue can never ship.
const MAX_CHARS = 600;
const MIN_WORDS = 90;
const MAX_WORDS = 110;

function oneParagraph(text: string): string {
  const line = text.replace(/\s+/g, " ").trim();
  const words = line === "" ? 0 : line.split(" ").length;
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`monologue must be 1-${MAX_CHARS} chars, got ${line.length}`);
  }
  if (words < MIN_WORDS || words > MAX_WORDS) {
    throw new Error(`monologue must be ${MIN_WORDS}-${MAX_WORDS} words, got ${words}`);
  }
  if (line.includes("\n")) {
    throw new Error("monologue must be a single paragraph");
  }
  return line;
}

const line = oneParagraph(monologue);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");
