# SmartCricket APK Download Website

The official, high-performance landing page and APK distribution website for **SmartCricket** — built with React 19, Vite, Tailwind CSS, Motion, and Firebase Firestore.

---

## 1. Local Development Setup

### Prerequisites
- Node.js 18+ (Node 20+ recommended)
- npm or yarn

### Installation
```bash
# 1. Clone or navigate to the website directory
cd smartcricket-website

# 2. Install dependencies
npm install

# 3. Create your local environment file
cp .env.example .env

# 4. Start the development server
npm run dev
```

Visit `http://localhost:5174/` to view the website locally.

---

## 2. Environment Variables (`.env`)

Configure the following variables in `.env`:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=smartcricket-c79b5.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=smartcricket-c79b5
VITE_FIREBASE_STORAGE_BUCKET=smartcricket-c79b5.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=44577848123
VITE_FIREBASE_APP_ID=1:44577848123:web:6e9cba4afa547467fe551e
VITE_FIREBASE_MEASUREMENT_ID=G-RD9P93REJX
```

> **Note:** If `.env` is unconfigured or the visitor is offline, the website automatically falls back to static release metadata (`v1.0`, `4.4 MB`) without breaking.

---

## 3. Firebase Multi-Site Hosting Setup

SmartCricket uses Firebase Multi-Site hosting so the download website and the scoring web app run on separate domains within the same Firebase project (`smartcricket-c79b5`).

### Step 1: Create the Site Target in Firebase
Run the following in your terminal or create it in the Firebase Console:
```bash
# Apply hosting target mapping to smartcricket-c79b5
firebase target:apply hosting smartcricket-website smartcricket-website
```

### Step 2: Build the Production Bundle
```bash
npm run build
```

### Step 3: Deploy Only the Website Target
```bash
firebase deploy --only hosting:smartcricket-website
```

The website will be live at: `https://smartcricket-website.web.app/`

---

## 4. Firestore Security Rules

To ensure release data can be fetched publicly and download counters can be securely incremented without exposing user data, add the rules from [`docs/firestore-rules-snippet.md`](./docs/firestore-rules-snippet.md) to your Firebase Console under **Firestore Database > Rules**.

---

## 5. Manual Launch Checklist for the User

Before going public:

- [ ] **1. Create the `config/latestRelease` Firestore Document**:
  In Firestore, create collection `config`, document ID `latestRelease` with fields:
  - `versionCode` (number): `1`
  - `versionName` (string): `"1.0"`
  - `fileSize` (string): `"4.4 MB"`
  - `apkUrl` (string): `"https://github.com/<YOUR_USER>/<YOUR_REPO>/releases/download/v1.0/SmartCricket.apk"`
  - `notes` (string): `"Initial release with offline scoring and live streaming."`
  - `releasedAt` (string): `"November 2026"`
  - `force` (boolean): `false`

- [ ] **2. Upload APK to GitHub Releases**:
  Create release tag `v1.0` in your GitHub repository and upload `SmartCricket.apk`. Copy the direct download link into `config/latestRelease`.

- [ ] **3. Open Graph Image (`public/og-image.png`)**:
  Replace `public/og-image.png` with a 1200×630px social card for Twitter/Facebook/WhatsApp previews.

- [ ] **4. Screenshots (`public/screenshots/`)**:
  Replace or supplement the 5 screenshots in `public/screenshots/` (`home.png`, `scoring.png`, `live.png`, `scorecard.png`, `poster.png`) with any additional preferred frames.

- [ ] **5. Review Legal Drafts**:
  Inspect `/privacy` and `/terms`. Update any specific regional policy details or contact info if needed.
