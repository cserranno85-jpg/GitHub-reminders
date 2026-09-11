# GitHub Reminders

Free, open-source reminders for GitHub issues and pull requests.

GitHub Reminders is a deliberately small GitHub Action from **Caivra Tech LLC**. It lets a user leave a reminder command directly in an issue or pull-request conversation and receive a GitHub mention when the reminder becomes due.

No hosted backend. No external database. No account. No subscription.

## Commands

```text
/remind in 7 days Revisit this before deleting the branch
/remind in 3 hours Check CI again
/remind at 2026-10-15T16:00:00Z Review the release candidate
/reminders
/remind cancel deadbeef
```

A reminder belongs to the GitHub user who created it. `/reminders` lists that user's active reminders on the current issue or PR, and only the creator can cancel one through the command interface.

## How it works

GitHub itself is the durable reminder store. When a reminder is created, the Action posts a confirmation comment containing a small hidden versioned metadata marker. A scheduled workflow scans repository comments for due markers and posts the reminder back to the original issue or pull request.

This keeps the V1 architecture intentionally simple:

```text
issue/PR comment -> GitHub Action -> hidden reminder marker -> scheduled scan -> GitHub mention
```

Delivery comments include an idempotency marker so a partial workflow failure does not intentionally re-fire the same reminder on later scheduled runs.

## Install

Copy [`examples/reminders.yml`](examples/reminders.yml) into your repository as `.github/workflows/reminders.yml`.

The workflow needs only:

```yaml
permissions:
  contents: read
  issues: write
  pull-requests: write
```

After the first stable release, pin the Action to the `v1` tag as shown in the example workflow. For higher assurance, pin to an exact release commit SHA.

## Timing

Scheduled GitHub Actions are not real-time schedulers. The example checks every 15 minutes, but GitHub may delay scheduled runs during periods of load. Treat reminder times as approximate rather than deadline-grade guarantees.

All absolute V1 reminder times use explicit ISO-8601 timestamps. Example:

```text
/remind at 2026-10-15T16:00:00Z Check this again
```

Relative reminders use the time the command is processed by GitHub Actions.

## Privacy and safety

- Reminder data stays in the repository's GitHub issue/PR comments.
- V1 does not send reminder content to an external service.
- Reminder delivery always mentions the creator; V1 does not provide arbitrary recipient targeting.
- `@` characters inside reminder text are neutralized on delivery to prevent stored reminder text from unexpectedly pinging third parties.
- Reminder text is limited to 500 characters.
- Reminder times must be in the future and no more than 10 years away.

Because reminder metadata is stored in comments, anyone who can read the repository conversation may be able to inspect it. Do not put secrets or sensitive information in reminder text.

## Current V1 scope

Included:

- relative reminders in minutes, hours, days, and weeks;
- explicit ISO-8601 reminders;
- listing active reminders on the current issue/PR;
- creator-only cancellation;
- idempotent scheduled delivery;
- no runtime dependencies;
- Node.js built-in test suite.

Not included yet:

- recurring reminders;
- natural-language date parsing such as "next Friday";
- user timezone profiles;
- email, Slack, SMS, or mobile push integrations;
- conditional reminders based on branch/PR state;
- a dashboard or hosted service.

Those features should only be added if they preserve the project's small, free, low-permission character.

## Development

Requires Node.js 20 or later.

```bash
npm test
npm run check
```

The implementation intentionally has no npm runtime dependencies.

## License

MIT. See [LICENSE](LICENSE).

Built as a free contribution to the GitHub community by Caivra Tech LLC.
