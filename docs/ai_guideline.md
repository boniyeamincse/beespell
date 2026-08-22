# AI Development Guideline for BeeSpell Dictionary

## 📌 1. Project Overview
**Name:** BeeSpell Dictionary
**Goal:** A linear, interactive spelling-bee learning platform. It is designed to be highly kid-friendly, playful, and eye-soothing, but structured enough for students to progress from Level 0 (alphabets/foundation) to Level 49 (Ultimate Legend).
**Architecture:** 
- **Frontend:** Next.js (App Router), React, TypeScript.
- **Styling:** Vanilla CSS (`globals.css`, `page.css`) with a soft, bright, bubbly kid-friendly UI. No Tailwind.
- **Backend/DB:** NONE. The app relies entirely on static JSON files for data and `localStorage` for saving user progress.

---

## 🎨 2. Design & UI/UX Principles
- **Theme:** Light, soft off-white/blue background (`hsl(210, 40%, 97%)`). DO NOT use dark mode.
- **Colors:** Vibrant but eye-safe primary colors (Sky Blue, Cheerful Orange, Soft Green).
- **Shapes:** Bubbly, highly rounded borders (`border-radius: 24px`), soft large shadows.
- **Interactions:** Buttons must have a 3D pill-shape effect (bottom border) that presses down on click/active states.
- **Accessibility:** High contrast text (soft navy instead of pitch black).

---

## 🗄 3. Data Flow & State Management
- **Words Data:** Stored in `src/data/words/level-X-name.json`.
- **API Fetching:** Data is fetched dynamically in client components via the custom local API route: `/api/words/[level]`.
- **Progress Tracking:** Managed purely via `localStorage` using the `useProgress` hook located in `src/hooks/useProgress.ts`.
  - Tracks: `unlockedLevels`, `xp`, `learnedWords`, `wrongWords`.

---

## 🚀 4. The Linear Learning Journey (Core Logic)
The app operates on a strict **"One Page, One Word"** principle. The primary goal is to take a student from absolute zero to full National Spelling Bee competition preparation. All future modules MUST follow this exact flow to maintain consistency.

### 4.1 Word Learning Flow (Per Word)
For every word, the user goes through these steps on a single screen:
1. **See** the word.
2. **Listen** to the pronunciation.
3. **Read Bangla Pronunciation** to understand the sound.
4. **Break into Syllables** (e.g., `beau • ti • ful`).
5. **Learn Meaning** (English & Bangla).
6. **Read Sentence** (Example usage).
7. **Hide and Spell:** The word disappears, and the user must spell it from memory (Input Field).
8. **Next Word:** Only accessible after spelling correctly.

### 4.2 Required UI Buttons per Word
At the bottom of the word flashcard, these buttons MUST be present:
- `Previous` (Go back to the last word)
- `Listen Again` (Replay audio)
- `Show Hint` (Reveal the hint)
- `Mark Difficult` (Save word for later review)
- `I Learned This` (Triggers the "Hide and Spell" phase)
- `Next Word` (Moves to the next word after spelling is verified)

### 4.3 Level Completion
When all words in a level are completed, the user is taken to a final **Exercise / Test Page** (`/test/[level]`) where all words are presented for practice. Passing this page unlocks the next level.

---

## 🛠 5. Instructions for the AI Assistant
If you are an AI reading this file to continue development, follow these strict rules:
1. **Acknowledge the UI:** Always maintain the bubbly, light, kid-friendly CSS. Do not revert to glassmorphism or dark themes.
2. **No DB:** Never propose adding Prisma, MongoDB, or any backend database. Stick to `localStorage` via the `useProgress` hook.
3. **Next Steps:** Check `docs/project_plan.md` for the task list. The immediate next priority is building **Stage 2 to Stage 5** of the Learning Engine inside `/learn/[level]/page.tsx`.
4. **Tooling:** Use `SpeechSynthesisUtterance` for all audio pronunciations (no external MP3 files).
5. **Code Quality:** Use standard React hooks, strict TypeScript interfaces, and avoid heavy third-party libraries unless absolutely necessary. Keep the code lightweight.

**Current Developer Status:** The user is typing "next" to proceed sequentially through the task list. Pick up the next pending task from `docs/project_plan.md` and implement it.
