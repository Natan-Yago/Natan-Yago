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

### Daily Flow
1. Check status
```bash
git status -sb
```
2. Stage changes
```bash
git add -A
```
3. Commit
```bash
git commit -m "feat: <summary>"
```
4. Push
```bash
git push origin main
```

### Notes
- Use branches for larger features: `git switch -c feature/<name>`
- Keep commits small and meaningful


