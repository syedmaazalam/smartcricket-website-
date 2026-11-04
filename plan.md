# SmartCricket Website — plan.md

> **Rule**: One phase at a time. Verify → tick → 3-line summary → stop. User says "next" to continue.

---

## Design Brief (locked)

**Subject**: SmartCricket — a mobile cricket scoring & live streaming app for local matches.  
**Audience**: Club scorers, cricket managers, local fans — South Asia & diaspora communities.  
**One job**: Get a visitor to download the APK in under 10 seconds.  
**Screenshots & Visuals**: Use the new light-theme reference screenshots (6/1 match state, clean ice-blue & white styling) for phone mockups and showcase representations.

**Palette** (user-specified, locked — `--keep palette,type`):
| Token | Hex | Role |
|---|---|---|
| `--bg` | `#F0F7FF` | Page ground |
| `--surface` | `#DBEAFE` | Tinted surface / section field |
| `--secondary` | `#60A5FA` | Mid blue |
| `--accent` | `#2563EB` | Action / highlight |
| `--ink` | `#0B1F3B` | Primary text |
| `--muted` | `#475569` | Secondary text |
| `--card` | `#FFFFFF` | Card surface |

**Typography** (locked):
| Face | Role |
|---|---|
| Fraunces | Headings, scores, hero display |
| Plus Jakarta Sans | Body, labels, buttons |
| JetBrains Mono | Match codes, overs, ball circles |

**Key design decisions** (design-taste-frontend house rules applied):
- No icon-topped feature cards → feature section uses a split left/right stagger, alternating layout rows
- No gradient blobs → soft flat `#DBEAFE` section fields as tone steps
- No glass / backdrop-blur nav → plain white bar, no shadow until scrolled 20px
- No eyebrow labels above headings
- No index numbering (01 / 02) on steps → steps use visual position + connecting line only
- No shadows on resting elements → tone steps between surfaces only
- Phone mockup in hero is React/CSS matching the new light-theme match state (6/1, 0.2 ov) — this is the **live thing**: ball circles animate in a loop showing real delivery types
- "See it in action" swipeable carousel showcases 5 real app screens in phone frames
- Motion: one orchestrated page-load entrance; section entrances are heading → body → picture staggered 60ms; hover feedback on buttons and cards; prefers-reduced-motion respected throughout

---

## File Structure

```
smartcricket-website/
├── index.html                  # SEO meta, Open Graph, font preloads, favicon
├── vite.config.js
├── tailwind.config.js          # all tokens as theme extensions
├── .firebaserc                 # hosting target: smartcricket-website
├── firebase.json               # hosting config pointing to dist/
├── README.md
├── public/
│   ├── favicon.svg             # copied from app's public/favicon.svg
│   ├── og-image.png            # 1200×630 static OG image
│   └── screenshots/            # 5 real app screens for carousel
│       ├── home.png
│       ├── scoring.png
│       ├── live.png
│       ├── scorecard.png
│       └── poster.png
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css               # CSS custom properties, font-face, base reset
    ├── components/
    │   ├── Navbar.jsx          # logo + links + download CTA + mobile drawer
    │   ├── Footer.jsx          # privacy, terms, email, credit
    │   ├── ScrollProgress.jsx  # thin accent bar at top of viewport
    │   ├── Hero/
    │   │   ├── HeroSection.jsx
    │   │   ├── PhoneMockup.jsx      # CSS phone frame with light app UI inside
    │   │   ├── OverRibbon.jsx       # looping ball circles (real delivery types)
    │   │   └── ScoreTicker.jsx      # rolling-digits score display
    │   ├── Features/
    │   │   ├── FeaturesSection.jsx
    │   │   └── FeatureCard.jsx
    │   ├── Showcase/
    │   │   ├── SeeInActionSection.jsx # "See it in action" section
    │   │   └── ScreenshotCarousel.jsx # swipeable carousel (mobile drag, desktop arrows)
    │   ├── Install/
    │   │   ├── InstallSection.jsx
    │   │   ├── StepCard.jsx
    │   │   └── ConnectorLine.jsx    # SVG line that draws itself on scroll-enter
    │   ├── FAQ/
    │   │   ├── FAQSection.jsx
    │   │   └── FAQItem.jsx          # smooth height accordion, chevron rotation
    │   └── CTA/
    │       └── CTASection.jsx       # pulse-ring download button
    ├── hooks/
    │   ├── useRelease.js       # reads Firestore config/latestRelease
    │   ├── useScrollProgress.js
    │   ├── useActiveSection.js # IntersectionObserver → active nav link
    │   └── useDownload.js      # writes downloads collection, dedup via localStorage
    └── lib/
        ├── firebase.js         # initializeApp, getFirestore
        ├── firestore.js        # getDoc, addDoc helpers
        └── motion.js           # shared animation variants (fadeUp, stagger, spring)
```

---

## Component Inventory

| Component | Key responsibility |
|---|---|
| `Navbar` | Logo left, links center (Features / Screenshots / Install / FAQ), Download button right; mobile: hamburger → drawer slides in with staggered links |
| `ScrollProgress` | `motion` div tracking `scrollYProgress`, accent color, fixed top-0, z-50 |
| `HeroSection` | Two-column layout: left = headline + subline + buttons; right = PhoneMockup |
| `PhoneMockup` | CSS-only phone shell, light app interior (6/1 match state), OverRibbon + ScoreTicker inside |
| `OverRibbon` | Ball circles animate in one-by-one on a loop: `M · 6 · 0 · 1 · 4 · W` sequence |
| `ScoreTicker` | Score rolls from 0 to 6/1, loops; uses digit-slot CSS transform |
| `FeaturesSection` | 6 cards, staggered; alternating left/right layout (not identical card grid) |
| `FeatureCard` | Icon chip (scales + tilts on hover), title, body; cursor spotlight on desktop |
| `SeeInActionSection` | "See it in action" section wrapper with title and subline |
| `ScreenshotCarousel` | Swipeable carousel of 5 app screenshots in phone frames (`home.png`, `scoring.png`, `live.png`, `scorecard.png`, `poster.png`). Drag on mobile, desktop arrow buttons, captions, lazy loading, fixed dimensions (zero CLS/layout shift), placeholder frames until images loaded |
| `InstallSection` | 3-step horizontal layout; ConnectorLine SVG draws on viewport enter |
| `StepCard` | Step visual (large Fraunces numeral as design element, not label), description, warning notice on Step 2 |
| `FAQSection` | List of FAQItems; `AnimatePresence` for height |
| `FAQItem` | Chevron rotates 180° on open; content `height: auto` animated via Motion |
| `CTASection` | Download button with slow pulse-ring; version + size from Firestore or static fallback |
| `Footer` | Privacy Policy, Terms, `maazalam.uet@gmail.com`, "Developed by Syed Maaz Alam" |

---

## Animation Plan

> All animations: `transform` and `opacity` only. 0.3s–0.8s, ease-out / spring for hover.  
> `prefers-reduced-motion`: disable parallax, loops, floating. Fade-only for entrances. Keep content visible.  
> Hover-only effects (`cursor-spotlight`, `card-tilt`) disabled on touch via `@media (hover: none)`.

| Moment | Mechanic | Library |
|---|---|---|
| Page load | Staggered fade-up: badge → headline words → paragraph → buttons (hero left column) | `motion` stagger |
| Phone mockup | Gentle float `translateY(0 ↔ -10px)`, 4s ease-in-out loop | `motion` keyframes |
| LIVE dot | Scale pulse 1 → 1.4 → 1, 1.5s loop | `motion` keyframes |
| OverRibbon | Ball circles appear one-by-one, loop after deliveries | `motion` stagger + repeat |
| ScoreTicker | Digit slots roll (translateY) from 0 to target, loop | `motion` |
| Navbar scroll | After 20px: `backdrop-blur-sm`, `shadow-sm` via `useScrollProgress` | CSS class toggle |
| Nav active link | Accent underline grows from left (scaleX 0→1) | `motion` layout |
| Section entrances | Heading → body → media, +60ms stagger, `translateY(24px)→0`, once | `motion` `whileInView` |
| Feature cards stagger | 6 cards, 80ms apart | `motion` stagger |
| Carousel drag / nav | Smooth drag constraints with elastic boundary, desktop left/right arrow slides | `motion` drag / AnimatePresence |
| Carousel phone hover | Card subtle lift and shadow shift, caption reveal | `motion` spring |
| ConnectorLine | SVG `pathLength` 0→1 on `whileInView` | `motion` SVG |
| Button hover | `translateY(-2px)`, stronger shadow, shine sweep (pseudo), icon nudge | `motion` spring |
| Button press | `scale(0.97)` | `motion` `whileTap` |
| Feature card hover | `translateY(-4px)`, blue border glow, icon chip `scale(1.1) rotate(4deg)` | `motion` spring |
| Cursor spotlight | `radial-gradient` follows `mousemove` on card, desktop only | `useEffect` + inline style |
| FAQ chevron | `rotate(0 → 180deg)` | `motion` |
| FAQ height | `height: auto` via `AnimatePresence` + `motion.div` | `motion` |
| CTA Download button | Slow pulse ring (scale 1→1.6, opacity 1→0, 2s loop) | `motion` keyframes |
| Mobile drawer | `x: '100%' → 0` with backdrop `opacity: 0→1` | `motion` |
| Drawer links | Staggered `translateX(20px)→0` | `motion` stagger |

---

## Firestore Usage

**Read** — `config/latestRelease` (once on mount, via `useRelease`):
```js
{ versionName, versionCode, releaseDate, whatsNew, fileSize, apkUrl }
```
- Show skeleton shimmer while loading.
- If offline or Firestore fails: fall back to static values (`"1.0"`, `"Nov 2026"`, `apkUrl: "#"`).

**Write** — `downloads` collection (via `useDownload`):
```js
{ versionCode, createdAt: serverTimestamp(), source: "web", device: "android"|"ios"|"desktop" }
```
- Detect device by `navigator.userAgent`.
- Dedup: check `localStorage.getItem('sc_download_v{versionCode}')`. If present and timestamp < 24h, skip write.
- On write success: set `localStorage.setItem('sc_download_v{versionCode}', Date.now())`.
- If write fails: still open `apkUrl` — download must never be blocked.

**Firestore rules** (user to deploy manually — no Cloud Functions, free plan):
```
match /config/{doc} { allow read: if true; }
match /downloads/{doc} { allow create: if true; }
```

---

## 6 Features (website copy, excluded items omitted)

1. **Score Anywhere, Even Without Internet** — Offline-first scoring; every ball saved locally, synced automatically on reconnect.
2. **Instant Live Match Links** — Share a 6-character code. Fans watch real-time ball-by-ball updates from any browser, no sign-up needed.
3. **Full Cricket Law Engine** — All 10 dismissal types, wides, no-balls, overthrows, byes, and timed declarations, accurate to MCC laws.
4. **Automatic Player of the Match** — Algorithm rates every player on batting impact, bowling economy, and milestones. Top 3 ranked instantly.
5. **Broadcast-Quality Scorecards** — One tap generates a 1080p / 1920p PNG match poster with team crests and complete player statistics.
6. **Deep Match Analytics** — Worm charts, Manhattan charts, run-rate curves, and batter/bowler deep-dive cards for every match.

---

## See It in Action (5 Carousel Screens & Captions)

Loaded from `public/screenshots/` with placeholder frames until images are provided:
1. `home.png` — **Fast Match Setup**: Start scoring or stream a match in seconds with custom formats and squad management.
2. `scoring.png` — **Live Ball-by-Ball Scoring**: Big touch-friendly keypad with real-time extras, dismissals, and over ribbons.
3. `live.png` — **Instant Fan Broadcast**: Zero-lag live streaming view with CRR, RRR, and ball-by-ball telemetry.
4. `scorecard.png` — **Comprehensive Scorecards**: Full batting ledgers, bowling economy figures, and Worm/Run Rate progression charts.
5. `poster.png` — **HD Summary Posters**: One-tap 1080p and 1920p match summary graphic ready for WhatsApp and social sharing.

---

## 3-Step Install Copy

1. **Tap "Download APK"** — Your browser saves the SmartCricket file to your device.
2. **Allow installation** — Open the file. If asked, enable "Install from unknown sources" in Android Settings. If Chrome or Google Play Protect warns about the file, choose Download anyway or Install anyway.
3. **Open and score** — Launch SmartCricket and tap "Create a Match" to start your first game.

---

## FAQ Items

| Q | A |
|---|---|
| Is SmartCricket free? | Yes. The app and all features are completely free. |
| Does it work without internet? | Scoring works fully offline. Live streaming for spectators requires internet. |
| Which Android version do I need? | Android 7.0 (Nougat) or newer. |
| Can I use it on iPhone? | The APK is for Android. Open `smartcricket-c79b5.web.app` on any phone browser for a web version. |
| How does the 6-character code work? | Each match gets a unique code (e.g. `#GC5BAZ`). Share it — anyone enters it in the app or the web link to watch live. |
| Is my match data private? | Match data is stored on your device first. Cloud sync only happens when you're online. No account is required to score. |

---

## Sections Argument (why each section exists)

| Section | Claim it proves |
|---|---|
| Hero | "SmartCricket is a live cricket scorer — download it now." |
| Features | "It has everything a real scorer needs." |
| See it in action | "See how clean and intuitive scoring looks in real matches." |
| Install | "Installing takes under 60 seconds." |
| FAQ | "Your concerns are answered before you hesitate." |
| CTA | One final, unambiguous action. |
| Footer | Trust signals + contact. |

---

## Phases

- [x] **Phase 1** — Project setup + tokens + fonts + Navbar + Footer
  - Scaffold `smartcricket-website/` with Vite + React + Tailwind + shadcn/ui + Motion + Firebase + Lucide + react-router-dom
  - Configure `tailwind.config.js` with all design tokens as CSS variables
  - `index.css`: custom property tokens, base reset, font-face loads
  - `index.html`: Google Fonts preconnect, Fraunces + Plus Jakarta Sans + JetBrains Mono, SEO meta, OG tags, favicon
  - Build `Navbar.jsx` (logo, links, download button, mobile drawer)
  - Build `Footer.jsx` (privacy & terms routes, email, credit)
  - Build `ScrollProgress.jsx`
  - Setup React Router with root layout for home `/`, and placeholders for `/privacy` & `/terms`
  - Configure `.firebaserc` + `firebase.json` for separate hosting target (`smartcricket-website` in single config constant)
  - Verify: `vite build` succeeds, no console errors, navbar/footer render at 390/768/1440px

- [x] **Phase 2** — Hero section + Features section
  - Build `PhoneMockup.jsx` (CSS phone shell, light app interior matching new 6/1 screenshot)
  - Build `OverRibbon.jsx` (looping ball circles)
  - Build `ScoreTicker.jsx` (rolling digit score)
  - Build `HeroSection.jsx` (staggered entrance, two-column, all hero animations)
  - Build `FeaturesSection.jsx` + `FeatureCard.jsx` (6 cards, stagger, hover effects, cursor spotlight)
  - Verify: hero looks correct at all 3 widths; phone mockup floats; LIVE dot pulses; cards stagger in

- [x] **Phase 3** — See it in action + Install + FAQ + CTA + Privacy & Terms pages + animations + responsive pass + SEO
  - Build `SeeInActionSection.jsx` + `ScreenshotCarousel.jsx` (swipeable carousel, desktop arrow buttons, mobile drag, phone frames, captions, lazy loading, fixed dimensions, placeholder frames)
  - Build `InstallSection.jsx`, `StepCard.jsx` (including Play Protect / Chrome warning notice on Step 2), `ConnectorLine.jsx`
  - Build `FAQSection.jsx`, `FAQItem.jsx`
  - Build `CTASection.jsx` (pulse-ring button)
  - Build `PrivacyPage.jsx` (`/privacy`) and `TermsPage.jsx` (`/terms`) with plain language draft text ("Draft, last updated {date}")
  - Final animation pass: scroll reveals, motion variants, reduced-motion check
  - Responsive pass: mobile menu drawer, 44px touch targets, text clipping audit
  - SEO: `<title>`, `<meta description>`, Open Graph, Twitter Card, favicon
  - Verify: `vite build && vite preview` — 0 layout shift, all sections visible at 390/768/1440

- [x] **Phase 4** — Firebase integration
  - `lib/firebase.js` — `initializeApp` with `smartcricket-c79b5` config
  - `lib/firestore.js` — `getDoc`, `addDoc` wrappers
  - `hooks/useRelease.js` — reads `config/latestRelease`, skeleton while loading, offline fallback (GitHub release URL placeholder)
  - `hooks/useDownload.js` — device detection, localStorage dedup, `downloads` write, graceful failure (uses apkUrl directly with no URL building)
  - Wire dynamic `versionName`, `releaseDate`, `fileSize`, `apkUrl` into CTA + Hero badge
  - Verify: Firestore read works; download button writes to `downloads` collection; dedup skips duplicate within 24h; apk opens even if Firestore write fails

- [x] **Phase 5** — README + deploy steps + manual checklist
  - `README.md` with: local dev setup, Firebase multi-site setup commands, deploy commands, Firestore rules to deploy, manual steps before launch
  - Checklist: OG image upload, Firestore `config/latestRelease` doc creation, APK upload to GitHub Releases and URL update, hosting target verification

---

## Phase 6 — Functional QR, Match Deep Linking & Update Notification System

- [x] **Chunk 6.1** — Workable QR Code Generator (`src/components/ui/QrCodeModal.jsx`)
  - Replace static mock rectangles with dynamic, high-contrast, camera-scannable QR code generator using `qrcode`
  - Encodes live URL `https://smartcricket-website.web.app` and direct APK download URL
  - Add quick toggle between "Open Website" and "Direct Download APK"
  - Verify with QR decode script and build test

- [x] **Chunk 6.2** — Match URL Deep Link Router & Scroll-Gated Match Landing Page (`src/pages/MatchPage.jsx`)
  - Route `/match/:matchId` and `/m/:matchId`
  - Try deep link: `smartcricket://match/:matchId` (and Android Intent URI) to open the APK if installed on phone
  - If app not installed / on web: render Match Landing Page
  - NO download button at top; display live match telemetry teaser & score preview
  - User must scroll down through match overview and app capabilities to reveal & activate the APK Download button at the bottom
  - Verify route handling and scroll requirement

- [x] **Chunk 6.3** — App Update Notification System (`src/components/ui/UpdateNotificationModal.jsx`, `src/pages/AdminBroadcastPage.jsx`)
  - Listen to `config/latestRelease` in Firestore (or local state)
  - Display non-intrusive Update Alert Banner / Modal when a newer version exists
  - Add Manager Update Broadcast tool at `/admin/broadcast` to let manager publish update notices with custom message & force toggle
  - Add documentation in `docs/in-app-update-integration.md` for Android / Flutter mobile app integration
  - Verify build and deploy to Firebase Hosting

---

## Open Questions for User (answer before "next" on Phase 1)

1. **Hosting target name**: I'll use `smartcricket-website` (URL: `smartcricket-website.web.app`). Confirm or change.
2. **APK hosting**: Will the APK be on Firebase Storage (free-tier public URL) or another host? I'll put a placeholder in Firestore; just confirm so I wire the right URL pattern.
3. **Privacy Policy / Terms pages**: Do you have content for these, or should I add placeholder anchor-linked modal/sections in the footer?
