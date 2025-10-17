# GitHub Project Board — Setup Guide

This repository uses a **GitHub Projects** board to track milestones and tasks.

## 1) Create the Project

1. Go to **GitHub → Your profile → Projects → New Project**.
2. Name it: `Michael F. Jones — Portfolio`.
3. Choose **Board** or **Table** view (Table recommended).

## 2) Columns (if Board) / Views (if Table)

- **Backlog** — Ideas and not-yet-scheduled tasks
- **In Progress** — Actively being worked on
- **In Review** — Open PRs awaiting review
- **Done** — Merged/deployed items

## 3) Fields

Add custom fields:

- **Milestone** (Single select): M0..M8
- **Priority** (Single select): High, Medium, Low
- **Type** (Single select): Bug, Feature, Task, Chore
- **Status** (Single select): Backlog, In Progress, In Review, Done

## 4) Automation (Optional)

To auto-add new issues/PRs to this project:

1. Create a **Fine-grained personal access token** with `project` & `repo` write.
2. Add it to repo **Settings → Secrets and variables → Actions** as `PROJECTS_TOKEN`.
3. Copy the Project URL (e.g., `https://github.com/users/<you>/projects/<id>`)
4. Add it as secret `GH_PROJECT_URL`.
5. The workflow `.github/workflows/triage.yml` will then add new issues/PRs automatically.

## 5) Starter Views / Filters

- **By Milestone**: `filter: Milestone = M1`
- **By Type**: `filter: Type = Feature`
- **Ready for Review**: `filter: Status = In Review`
- **Recently Done**: `filter: Status = Done sort:updated-desc`

## 6) Tips

- Use **issue templates** for consistency.
- Title conventions: `[FEAT]`, `[BUG]`, `[TASK]` help auto-label via CI.
- Keep items small; aim for <= 1–2 days per task when possible.
