# ARISE — "Learn. Solve. Rise."
### Premium Student Learning & DSA Platform | Design System & Connected Interactive Prototype

---

## 🌟 Executive Overview
**ARISE** is a developer-grade EdTech and competitive programming platform specifically engineered for college and engineering students, DSA learners, and competitive programmers (with a dedicated Maharashtra & India collegiate focus, e.g., COEP Pune, VJTI Mumbai, PICT Pune, SPIT Mumbai, IIT Bombay, Walchand Sangli).

Art-directed with elite restraint:
- **Linear Precision**: Restrained typography, 4px strict spacing, hairline 1px borders, subtle inner highlights.
- **Vercel Minimalism**: Developer-first focus, calm dense IDE and problem tables, crisp contrast.
- **Raycast Speed**: Command-style instant interactions with `⌘K` global palette, tabular monospaced numbers.
- **Selective Glassmorphism**: Glass is applied strictly for hero surfaces, selected navigation states, and floating layers. Code editors, data tables, and test cases remain calmer, flatter, and more opaque for zero visual fatigue and WCAG 2.2 AA compliance.

---

## 🎨 Design System Foundations

### Exact Color Tokens
| Token Name | Hex / Value | Role / Usage | WCAG AA Contrast |
| :--- | :--- | :--- | :--- |
| `bg/base` | `#080B14` | Main dark background canvas | AAA Base |
| `bg/secondary` | `#0D1220` | Secondary panel surfaces & modals | AAA Base |
| `surface/elevated` | `#11182A` | Cards, dialog windows, elevated layers | AAA Base |
| `surface/editor` | `#0B0F1C` | High-contrast IDE workspace coding surface | 16.8:1 AAA |
| `surface/glass` | `rgba(255, 255, 255, 0.05)` | Hero cards, floating chips, blurred at 20px | AA on dark |
| `border/default` | `rgba(255, 255, 255, 0.12)` | Hairline container borders | Restrained |
| `border/strong` | `rgba(255, 255, 255, 0.20)` | Active inputs, selected states, hover borders | Crisp definition |
| `accent/primary` | `#8B5CF6` | Violet primary brand accent & active glows | AA Compliant |
| `accent/secondary`| `#6366F1` | Indigo secondary accent (linear gradient pairing) | AA Compliant |
| `accent/cyan` | `#22D3EE` | Progress fills, data highlights, key metrics | 11.4:1 AA |
| `text/primary` | `#F5F7FF` | Primary headings, titles, tabular numerals | 16.8:1 AAA |
| `text/secondary` | `#A4AEC5` | Body copy, descriptions, table rows | 7.2:1 AA |
| `text/muted` | `#6F7B94` | Metadata labels, hints, timestamps | 4.6:1 AA |
| `success` | `#34D399` | Accepted judge verdict, completed tracks | Icon + Text |
| `warning` | `#FBBF24` | Medium difficulty badge, pending items | Icon + Text |
| `error` | `#FB7185` | Wrong Answer, Runtime Error, failed tests | Icon + Text |

### Typography Scale
- **UI Font**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`
- **Monospace Font**: `JetBrains Mono`, `Fira Code`, `monospace`
- **Scale**:
  - `Display`: `40px` / `48px` line-height (Bold)
  - `Heading 1 (H1)`: `32px` / `40px` (Bold)
  - `Heading 2 (H2)`: `24px` / `32px` (SemiBold)
  - `Heading 3 (H3)`: `18px` / `28px` (SemiBold)
  - `Body`: `14px` / `22px` (Regular / Medium)
  - `Small`: `12px` / `18px` (Regular)
  - `Mono`: `13px` / `20px` (JetBrains Mono with tabular numbers enabled)

### Spacing & Radius
- **4px Spacing Grid**: `4px` (`--space-1`), `8px` (`--space-2`), `12px` (`--space-3`), `16px` (`--space-4`), `24px` (`--space-6`), `32px` (`--space-8`), `48px` (`--space-12`), `64px` (`--space-16`).
- **Radius**: `12px` (inputs, table rows), `16px` (cards), `20px` (hero panels, modals), `9999px` (pills, avatars, badges).

---

## 🧭 Exact Sidebar Navigation (248px Rail)
1. **Overview** (`/overview`): Dominant verified XP, rank, topic mastery, recent solves, continue learning, leaderboard preview.
2. **Leaderboard** (`/leaderboard`): 4 Scopes (College, District, Maharashtra, India) + Friends Network with mutual consent.
3. **DSA** (`/dsa-problems` / `/dsa-topics` / `/dsa-workspace`): 17 algorithmic topics, multi-filter problem table, 3-panel IDE, 7 judge states.
4. **Self Study** (`/self-study` / `/pdf-reader`): Personal document library, calm reader surface, study timer. No XP awarded.
5. **Learning** (`/learning-catalogue` / `/course-detail` / `/lesson-player` / `/final-assessment`): Rigorous CS curricula with 80% passing cutoff.
6. **Profile** (`/profile` / `/badges` / `/settings`): System-generated read-only UID (`ARISE-7K2M9Q`), earned badges, server-enforced privacy.

---

## 🔒 Rigorous Business Rules Enforced in UI

1. **Strict Verified DSA XP**:
   - Rank and XP come **ONLY** from verified DSA submissions confirmed by an isolated sandbox judge.
   - Reading PDFs, watching videos, self-reported metrics, and study timers **never** award XP.
2. **External Link Neutrality**:
   - External links (LeetCode, HackerRank) alone never award XP.
3. **80% Course Completion Rule**:
   - A course is marked complete **only** when the student achieves $\ge 80\%$ on the final assessment quiz.
   - Scoring $79\%$ or lower leaves the course incomplete and prompts a retry.
4. **Cryptographic System-Generated UID**:
   - Students never choose or edit their UID. It is auto-generated (e.g. `ARISE-7K2M9Q`), displayed read-only in JetBrains Mono with 1-click copy + toast feedback.
5. **Mutual Consent Friends System**:
   - To connect, students exchange UIDs. Adding a friend performs a lookup with preview card and sends a request. Both students must accept before appearing on each other's friends leaderboard.
6. **7 Judge Submission States**:
   - 1. **Running** (Spinner, "Judging...", actions disabled)
   - 2. **Accepted** (Confirmed by judge, shows runtime ms & memory MB, verified XP awarded)
   - 3. **Wrong Answer** (Failing input, Expected vs Actual diff)
   - 4. **Compilation Error** (Compiler traceback with line highlighting)
   - 5. **Runtime Error** (SIGSEGV / bounds check trace)
   - 6. **Time Limit Exceeded** (> 2000ms timeout)
   - 7. **Judge Unavailable** (Sandbox connectivity timeout with retry action)
7. **Server-Enforced Privacy**:
   - Privacy controls state clearly: *"This setting is enforced by ARISE servers."* Client toggles never imply superficial front-end protection alone.

---

## 📱 Responsive Canvases & Simulator
The prototype includes a responsive viewport switcher in the top bar:
- **1440px**: Primary flagship desktop canvas (centered 1240px container, 12-column grid, 24px gutters).
- **1280px**: Compact desktop canvas.
- **768px**: Tablet canvas.
- **390px**: Native mobile viewport rendered in an authentic iPhone bezel with Dynamic Island/notch, 5-tab bottom navigation bar (`Overview`, `Ranking`, `DSA`, `Learn`, `Profile`) + `More` bottom sheet for Self Study and Settings, touch-friendly 44px targets, and stacked coding workspace tabs (`Problem`, `Code`, `Output`).

---

## 🚀 Running Locally
```bash
# Start the local development server on port 3000
npm run dev
# or
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
