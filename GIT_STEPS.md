## Git Steps Tracker

### Repo

- Remote: `https://github.com/Natan-Yago/Natan-Yago.git`

### Quick Start (fresh clone)

```bash
git clone --depth 1 https://github.com/Natan-Yago/Natan-Yago.git
cd Natan-Yago
npm i
npm run dev
```

### Common Commands

- Clone existing repo: `git clone https://github.com/Natan-Yago/Natan-Yago.git`
- Check status: `git status -sb`
- Create/switch branch: `git switch -c feature/your-branch`
- Stage changes: `git add <files>` or `git add -A`
- Commit: `git commit -m "type(scope): summary"`
- Push: `git push -u origin <branch>`
- Update main: `git pull --rebase`

### Today’s Changes (local log)

- feat(menu): add responsive GSAP-powered menu modal; ensure header remains visible on open
- docs: add/update GIT_STEPS.md with repo URL and common flows

### Push current work to main (from project root)

```bash
# Stage only intended files
git add app/components/layout/header.js app/components/ui/menu-modal.js package.json package-lock.json GIT_STEPS.md

# Commit
git commit -m "feat(menu): GSAP menu modal; keep header visible; docs: add GIT_STEPS"

# Push to GitHub
git push -u origin main
```
