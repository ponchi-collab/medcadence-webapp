# 💊 MedCadence

A colorful medicine tracker web app. Track your daily doses, configure schedules, and review your history.

---

## 🚀 Deploy to GitHub Pages — Step by Step

### 1. Edit `package.json`
Open `package.json` and replace `YOUR-GITHUB-USERNAME` with your actual GitHub username:
```
"homepage": "https://YOUR-GITHUB-USERNAME.github.io/medcadence"
```

### 2. Install dependencies
```bash
npm install
```

### 3. Test locally (optional)
```bash
npm start
```
This opens the app at http://localhost:3000

### 4. Create a GitHub repository
- Go to https://github.com/new
- Name it exactly: `medcadence`
- Leave it empty (no README)
- Click "Create repository"

### 5. Push your code
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/medcadence.git
git push -u origin main
```

### 6. Deploy!
```bash
npm run deploy
```

Your app will be live at:
**https://YOUR-USERNAME.github.io/medcadence**

---

## 🔄 Updating the app later
Make your changes, then run:
```bash
npm run deploy
```
That's it — the live site updates automatically.

---

## 📱 Features
- Track medicines 1×, 2×, or 3× per day
- Morning / Noon / Evening dose slots
- 7-day history view
- Data saved in browser localStorage
- Works on mobile and desktop
