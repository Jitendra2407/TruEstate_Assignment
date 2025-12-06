# Deployment Guide

This guide covers deploying the **SaleSphere** application.
- **Frontend**: Vercel (Recommended)
- **Backend**: Render or Railway (Required for Node.js + SQLite)

---

## 🚀 Pre-Deployment Check

The project uses **SQLite** (`sale_sphere.db`). 
- **The Challenge**: Most cloud 'Web Services' (like Render free tier) utilize an *ephemeral filesystem*. This means every time you deploy or the server restarts, your files reset to what's in git.
- **The Solution for this Assignment**: 
    1. **Easiest**: Commit your pre-filled `sale_sphere.db` to Git (it is ~70MB, which fits within GitHub's 100MB limit). This ensures your production app starts with data.
    2. **Professional**: Use Railway with a *Persistent Volume* to store the database.

### Step 0: Prepare the Database
Since we ignored `*.db` in `.gitignore`, you must manually force-add the database for the "Easiest" deployment strategy.

```bash
# In your local terminal
git add -f backend/data/sale_sphere.db
git commit -m "chore: add sqlite db for production deployment"
git push origin main
```

> **Note**: If you chose NOT to do this, your deployed app will start with an empty database.

---

## 📱 Frontend Deployment (Vercel)

1.  **Push to GitHub**: Ensure your project is on GitHub.
2.  **Login to Vercel**: Go to [vercel.com](https://vercel.com) and log in.
3.  **Import Project**:
    -   Click **"Add New..."** -> **"Project"**.
    -   Select your **TruEstate_Assignment** repository.
4.  **Configure Project**:
    -   **Framework Preset**: Vite (should be auto-detected).
    -   **Root Directory**: Click "Edit" and select `frontend`. **(Crucial)**
5.  **Environment Variables**:
    -   Skip this for now. We need the Backend URL first.
6.  **Deploy**: Click "Deploy".
    -   *The build might fail or show empty data initially because it can't talk to the backend yet. This is normal.*

---

## 🛠 Backend Deployment (Render)

**Strategy**: Web Service with committed SQLite DB.

1.  **Login to Render**: Go to [render.com](https://render.com).
2.  **New Web Service**:
    -   Click **"New"** -> **"Web Service"**.
    -   Connect your GitHub repository.
3.  **Configuration**:
    -   **Name**: `salesphere-backend` (or unique name).
    -   **Root Directory**: `backend` **(Crucial)**.
    -   **Runtime**: Node.js.
    -   **Build Command**: `npm install`.
    -   **Start Command**: `npm start`.
4.  **Environment Variables**:
    -   Add `NODE_ENV` = `production`.
5.  **Deploy**: Click "Create Web Service".
6.  **Copy URL**: Once live, copy the URL (e.g., `https://salesphere-backend.onrender.com`).

---

## 🔗 Connect Frontend to Backend

1.  Go back to **Vercel** -> Your Project -> **Settings** -> **Environment Variables**.
2.  Add a new variable:
    -   **Key**: `VITE_API_BASE_URL`
    -   **Value**: Your Render Backend URL (e.g., `https://salesphere-backend.onrender.com`) **WITHOUT** the trailing slash `/`.
3.  **Redeploy Frontend**:
    -   Go to **Deployments**.
    -   Click the three dots on the latest deployment -> **Redeploy**.

---

## 🛠 Alternative: Backend Deployment (Railway)

**Strategy**: Persistent Volume (Data survives restarts/re-deploys).

1.  **Login to Railway**: Go to [railway.app](https://railway.app).
2.  **New Project**: "Deploy from GitHub repo".
3.  **Variables**: 
    -   Add `PORT` = `3001` (or let Railway assign one and use `process.env.PORT`).
4.  **Mount Volume (The Magic Step)**:
    -   Go to **Settings** (for the service).
    -   Scroll to **Volumes**.
    -   Click **Add Volume**.
    -   Mount Path: `/app/backend/data` (Assuming your code writes to `path.join(__dirname, '../../data/sale_sphere.db')`).
        -   *Note*: Verify the absolute path structure on Railway. usually `/app` is the root. If your Root Directory is `backend`, verify where the volume mounts relative to CWD.
5.  **Data Upload**:
    -   Use Railway CLI to upload your local `sale_sphere.db` to the volume, OR just let the app re-create it (if you have a seeding script that runs on start).

---

## 🧪 Troubleshooting

### "Transactions not loading"
1.  **Check Console**: Open Browser DevTools (F12) -> Console. check for 404 or CORS errors.
2.  **Check Network**: In DevTools -> Network, click a request. ensure the URL is correct (e.g. `https://your-backend.onrender.com/api/transactions?...`).
    -   If it says `localhost:3001`, you missed the `VITE_API_BASE_URL` step.
3.  **Check Backend Logs**: In Render Dashboard, look at the logs.
    -   "no such table: transactions" -> Your database file wasn't committed or found. Follow "Step 0".

### "Data disappears after deploy" (Render)
-   This is expected on the free tier without volumes. See "Pre-Deployment Check".

### "Build Failed"
-   Ensure you set the **Root Directory** correctly for both Frontend (`frontend`) and Backend (`backend`) services.
