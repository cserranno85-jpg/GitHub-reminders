# GitHub Reminders v1.0.0

**Initial stable public release — Caivra Tech LLC**

GitHub Reminders v1.0.0 delivers a small, free, repository-native reminder capability for GitHub issues and pull requests without requiring a hosted backend, external database, separate account, or subscription.

## Highlights

- Create relative reminders with `/remind in ...`.
- Create absolute ISO-8601 reminders with `/remind at ...`.
- List active reminders with `/reminders`.
- Cancel owned reminders with `/remind cancel <id>`.
- Deliver due reminders through scheduled GitHub Actions.
- Store reminder state in versioned hidden GitHub comment metadata.
- Prevent intentional duplicate delivery with idempotency markers.
- Keep reminder delivery scoped to the creator.
- Neutralize embedded `@` mentions in reminder text.
- Run with minimal repository permissions and no runtime npm dependencies.

## Validation

The V1 release was validated through:

- Node.js syntax checks;
- automated unit tests;
- GitHub Actions CI on the merged implementation;
- live issue command creation;
- live reminder listing;
- live creator cancellation;
- scheduled reminder delivery on canonical `main`;
- confirmation that the delivered reminder transitioned to terminal `sent` state;
- duplicate-delivery inspection.

The end-to-end smoke-test issue was closed as completed after the scheduled delivery path executed successfully.

## Operational note

GitHub scheduled Actions are not deadline-grade schedulers. Reminder delivery is approximate and may be delayed by GitHub scheduler availability or repository activity characteristics.

## Project stewardship

GitHub Reminders is an independent open-source project built and maintained by **Caivra Tech LLC** and released under the MIT License.

Copyright © 2026 Caivra Tech LLC.

GitHub Reminders is not an official GitHub product and is not affiliated with or endorsed by GitHub, Inc.
