# Installation

GitHub Reminders is a free GitHub Action maintained by **Caivra Tech LLC**.

## Requirements

- A GitHub repository with GitHub Actions enabled.
- Permission to add a workflow under `.github/workflows/`.
- No external database, server, account, or paid service is required.

## Install

Create `.github/workflows/reminders.yml` in the repository where reminders should work:

```yaml
name: GitHub Reminders

on:
  issue_comment:
    types: [created]
  schedule:
    - cron: "*/15 * * * *"
  workflow_dispatch:

permissions:
  contents: read
  issues: write
  pull-requests: write

jobs:
  reminders:
    if: github.event_name != 'issue_comment' || startsWith(github.event.comment.body, '/remind')
    runs-on: ubuntu-latest
    steps:
      - uses: cserranno85-jpg/GitHub-reminders@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Permissions

GitHub Reminders requests only the permissions required to read repository content and create/update issue or pull-request comments:

- `contents: read`
- `issues: write`
- `pull-requests: write`

No custom secret is required. The workflow uses GitHub's repository-scoped `GITHUB_TOKEN`.

## Version pinning

For convenient stable usage, use the `v1` release line. For higher assurance, pin the Action to an exact release commit SHA.

## Scheduling behavior

The example scans every 15 minutes. GitHub scheduled workflows can run later than the nominal cron time, so reminders are approximate and should not be used for safety-critical or deadline-critical alerting.
