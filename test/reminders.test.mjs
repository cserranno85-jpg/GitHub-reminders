import test from "node:test";
import assert from "node:assert/strict";
import {
  parseCommand,
  createReminder,
  encodeMarker,
  decodeMarker,
  isDue,
  sanitizeMentions,
  deliveryMarker
} from "../src/reminders.mjs";

const now = new Date("2026-09-11T12:00:00Z");

test("parses relative reminders", () => {
  const parsed = parseCommand("/remind in 7 days Revisit PR #100", now);
  assert.equal(parsed.kind, "create");
  assert.equal(parsed.dueAt, "2026-09-18T12:00:00.000Z");
  assert.equal(parsed.text, "Revisit PR #100");
});

test("parses absolute ISO reminders", () => {
  const parsed = parseCommand("/remind at 2026-10-15T16:00:00Z Check release", now);
  assert.equal(parsed.dueAt, "2026-10-15T16:00:00.000Z");
});

test("parses list and cancellation commands", () => {
  assert.deepEqual(parseCommand("/reminders", now), { kind: "list" });
  assert.deepEqual(parseCommand("/remind cancel deadbeef", now), { kind: "cancel", id: "deadbeef" });
});

test("ignores unrelated comments", () => {
  assert.deepEqual(parseCommand("looks good", now), { kind: "ignore" });
});

test("rejects past and malformed reminders", () => {
  assert.throws(() => parseCommand("/remind at 2020-01-01T00:00:00Z nope", now), /future/);
  assert.throws(() => parseCommand("/remind someday maybe", now), /Usage/);
});

test("marker round trips reminder data", () => {
  const reminder = createReminder({ creator: "octocat", issueNumber: 42, dueAt: "2026-10-15T16:00:00.000Z", text: "Check this", now });
  const decoded = decodeMarker(`${encodeMarker(reminder)}\nvisible`);
  assert.deepEqual(decoded, reminder);
});

test("due logic only fires active due reminders", () => {
  const reminder = { status: "active", dueAt: "2026-09-11T11:59:00Z" };
  assert.equal(isDue(reminder, now), true);
  assert.equal(isDue({ ...reminder, status: "cancelled" }, now), false);
  assert.equal(isDue({ ...reminder, dueAt: "2026-09-11T12:01:00Z" }, now), false);
});

test("sanitizes embedded mentions", () => {
  assert.equal(sanitizeMentions("tell @all and @octocat"), "tell @\u200ball and @\u200boctocat");
});

test("delivery marker is deterministic for idempotency", () => {
  assert.equal(deliveryMarker("deadbeef"), "<!-- github-reminders:delivered:deadbeef -->");
});
