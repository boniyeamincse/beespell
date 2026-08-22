<div align="center">
  <h1>🐝 BeeSpell Dictionary</h1>
  <p><strong>A highly interactive, kid-friendly, and progressive Spelling Bee learning platform.</strong></p>
  
  <br />
</div>

## 📖 Overview

**BeeSpell Dictionary** is a lightweight, frontend-only web application designed to help students—from toddlers to adults—master English spelling. The app features a **Linear Progression System** (Level 0 to Level 49) where users learn words step-by-step. 

Built with simplicity and speed in mind, it requires **No Database** and **No Backend**. All word data is securely stored in local JSON files, and user progress is seamlessly tracked using the browser's `localStorage`.

## ✨ Key Features

- **🚀 Linear Level Journey:** Progress through 50 distinct levels starting from basic alphabets up to competition-level vocabulary.
- **🎨 Kid-Friendly UI:** A bright, soft, bubbly, and eye-soothing user interface designed to keep children engaged without eye strain.
- **🔊 Native Pronunciation (Web Speech API):** Uses the browser's built-in Text-to-Speech (TTS) engine, requiring absolutely zero external MP3 files.
- **💾 100% Local Progress Tracking:** Uses custom React hooks to save XP, unlocked levels, and learned words directly to `localStorage`.
- **📱 Fully Responsive:** Beautifully optimized for small Mobile Phones, Tablets, and Large Smart TVs.
- **⚡ Vercel Ready:** Static architecture makes it perfectly optimized for free, 1-click deployments on Vercel.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Vanilla CSS (No Tailwind, custom properties for easy theming)
- **Data Management:** Static JSON files + `localStorage`
- **Audio:** Web Speech API

## 📂 Folder Structure

```text
📦 src
 ┣ 📂 app
 │ ┣ 📂 api/words/[level]   # Dynamic API route to fetch level specific words
 │ ┣ 📂 learn/[level]       # Interactive flashcard learning UI
 │ ┣ 📂 levels              # Journey Map displaying all 50 levels
 │ ┣ 📜 globals.css         # Global kid-friendly light theme UI system
 │ ┗ 📜 layout.tsx          # Root Layout with Navigation
 ┣ 📂 components
 │ ┗ 📂 learn               # Extracted components for multiple learning stages
 ┣ 📂 data
 │ ┗ 📂 words               # JSON data files for each level (e.g., level-0-foundation.json)
 ┣ 📂 hooks
 │ ┗ 📜 useProgress.ts      # Custom hook handling localStorage progress saving
 ┗ 📂 types
   ┗ 📜 index.ts            # TypeScript interfaces for Words and Progress
```

## 🚀 Getting Started (Local Development)

To run the project on your local machine:

**1. Clone the repository:**
```bash
git clone https://github.com/boniyeamincse/beespell.git
cd beespell
```

**2. Install dependencies:**
```bash
npm install
```

**3. Start the development server:**
```bash
npm run dev
```

**4. Open the app:**
Visit [http://localhost:3000](http://localhost:3000) (or whichever port is assigned) in your browser.

## 🏆 Adding New Data

Adding new words is incredibly simple. Just create or update a JSON file inside `src/data/words/` following this naming convention:
`level-X-levelname.json` (e.g., `level-1-starter.json`).

**Word Object Structure:**
```json
{
  "id": "lvl1-001",
  "level": 1,
  "order": 1,
  "word": "apple",
  "pronunciation": "/ˈæp.əl/",
  "banglaPronunciation": "অ্যাপল",
  "meaning": "A round fruit with red or green skin.",
  "banglaMeaning": "আপেল",
  "syllables": ["ap", "ple"],
  "example": "I ate a sweet apple.",
  "hint": "Starts with A and is a popular fruit.",
  "image": ""
}
```

## 🤝 Contributing

Contributions are completely welcome! Since this project is highly data-driven, the best way to contribute is by adding new words and levels. 

**How to contribute:**
1. Fork the repository.
2. Navigate to `src/data/words/` and create a new JSON file for a new level (or add words to existing ones).
3. Ensure the JSON structure matches the required format exactly.
4. Commit your changes and push to your fork.
5. Open a **Pull Request**.

If you'd like to improve the UI or add new learning stages, feel free to submit a PR for those as well!

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
