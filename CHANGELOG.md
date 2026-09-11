# Changelog

All notable changes to GitHub Reminders are documented here.

## [1.0.0] — 2026-09-11

### Added

- Repository-native reminder creation for issues and pull requests.
- Relative reminder syntax for minutes, hours, days, and weeks.
- Absolute ISO-8601 reminder syntax.
- Active-reminder listing.
- Creator-only cancellation.
- Scheduled GitHub Actions delivery.
- Versioned hidden metadata persistence in GitHub comments.
- Idempotent delivery markers to prevent intentional duplicate re-firing.
- Reminder-text mention neutralization.
- 500-character reminder text limit.
- Maximum ten-year reminder horizon.
- Node.js 20 test and syntax-check workflow.
- Installation, usage, architecture, stewardship, security, and contribution documentation.
- MIT license with Caivra Tech LLC as copyright holder.
- Live end-to-end smoke testing on canonical `main`.

### Validated

- Reminder creation.
- Reminder listing.
- Reminder cancellation.
- Scheduled delivery.
- Terminal `sent` transition.
- Duplicate-delivery protection behavior.

### Notes

- Scheduled delivery is approximate because GitHub Actions cron execution can be delayed.
- GitHub Reminders is an independent Caivra Tech LLC open-source project and is not an official GitHub product.
