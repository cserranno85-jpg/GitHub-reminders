# Security Policy

## Reporting a vulnerability

Please do not disclose a suspected security vulnerability in a public issue.

Use GitHub's private vulnerability reporting feature for this repository when available. If private reporting is unavailable, contact the repository owner through an appropriate private channel.

## Security model

GitHub Reminders is designed to run with repository-scoped `GITHUB_TOKEN` permissions limited to read-only contents plus write access to issues and pull requests. It has no external backend and no external database in V1.

Do not place secrets, credentials, personal data, or other sensitive information in reminder text. Reminder metadata is persisted in GitHub comments and follows the repository's visibility and retention characteristics.
