# BeeSpell Dictionary - Project Plan

## Overview
**Project name:** BeeSpell Dictionary
**Technology:** React/Next.js + TypeScript + JSON + localStorage
**Login:** No
**Database/API:** No (Static Data + LocalStorage)
**Goal:** A simple category-wise, level-wise Spelling Bee learning website where students learn words step-by-step from Beginner to Advanced.

## Main Learning Flow

```mermaid
flowchart TD
    A["Select Category"] --> B["Select Level"]
    B --> C["Learn Words"]
    C --> D["Listen & Practice"]
    D --> E["Take Level Test"]
    E --> F{"Passed?"}
    F -- Yes --> G["Unlock Next Level"]
    F -- No --> H["Practice Wrong Words"]
    H --> D
```

## Category List
- Animals
- Birds
- Fruits
- Vegetables
- Colors
- Body Parts
- Family
- School
- Home
- Food and Drinks
- Nature
- Transport
- Places
- Occupations
- Technology
- Science
- Health
- Environment
- Geography
- General Knowledge
- Common English Words
- Frequently Misspelled Words
- Competition Words

## Level Structure (50 Levels, 10 Tiers)
| Level | Name                    | Words per category | Learning target                          | Unlock Requirement           | Badge / Rank Icon | Pass Score | XP Reward |
| ----: | ------------------------ | ------------------: | ----------------------------------------- | ------------------------------ | ------------------- | ---------: | --------: |
|     0 | Foundation               |                  50 | Alphabet, sounds ও পরিচিত শব্দ            | Always unlocked                | 🥚 Egg               |        70% |        50 |
|     1 | Starter                  |                  75 | সহজ 2–4 letter words                      | Pass Level 0                   | 🐣 Hatchling         |        70% |        75 |
|     2 | Beginner                 |                 100 | Common daily words                        | Pass Level 1                   | 🐤 Chick             |        70% |       100 |
|     3 | Learner                  |                 125 | Basic sentence-context words              | Pass Level 2                   | 🐥 Fledgling         |        70% |       125 |
|     4 | Explorer                 |                 150 | Everyday object & action words            | Pass Level 3                   | 🦋 Wings             |        70% |       150 |
|     5 | Elementary               |                 175 | Syllable ও spelling pattern               | Pass Level 4                   | 🌱 Sprout            |        72% |       175 |
|     6 | Builder                  |                 200 | Word-family & rhyming patterns            | Pass Level 5                   | 🧱 Builder           |        72% |       200 |
|     7 | Practicer                |                 250 | Repetition-based spelling drills          | Pass Level 6                   | 🎯 Practicer         |        72% |       225 |
|     8 | Improver                 |                 300 | Commonly confused word pairs              | Pass Level 7                   | 📈 Improver          |        72% |       250 |
|     9 | Achiever                 |                 350 | Short compound words                      | Pass Level 8                   | 🏅 Achiever          |        72% |       275 |
|    10 | Intermediate             |                 400 | Prefix, suffix ও silent letters           | Pass Level 9                   | 📘 Intermediate      |        75% |       300 |
|    11 | Reader                   |                 450 | Reading-level vocabulary                  | Pass Level 10                  | 📖 Reader            |        75% |       325 |
|    12 | Thinker                  |                 500 | Homophones ও tricky sounds                | Pass Level 11                  | 🧠 Thinker           |        75% |       350 |
|    13 | Scholar                  |                 600 | Subject-based vocabulary (school/science) | Pass Level 12                  | 🎓 Scholar           |        75% |       375 |
|    14 | Wordsmith                |                 700 | Descriptive ও adjective-heavy words       | Pass Level 13                  | ✍️ Wordsmith         |        75% |       400 |
|    15 | Upper Intermediate       |                 800 | Complex spelling rules                    | Pass Level 14                  | 📚 Upper Int.        |        77% |       425 |
|    16 | Specialist               |                 900 | Category-specific technical words         | Pass Level 15                  | 🔬 Specialist        |        77% |       450 |
|    17 | Analyst                  |                1000 | Multi-syllable analytical words           | Pass Level 16                  | 🧩 Analyst           |        77% |       475 |
|    18 | Strategist               |                1100 | Words with irregular spelling             | Pass Level 17                  | ♟️ Strategist         |        77% |       500 |
|    19 | Tactician                |                1200 | Root-word & etymology basics              | Pass Level 18                  | 🗡️ Tactician          |        77% |       525 |
|    20 | Advanced                 |                1300 | Difficult ও academic words                | Pass Level 19                  | 🚀 Advanced          |        80% |       550 |
|    21 | Expert                   |                1400 | Competition-level baseline words          | Pass Level 20                  | ⭐ Expert            |        80% |       575 |
|    22 | Virtuoso                 |                1500 | Advanced academic vocabulary              | Pass Level 21                  | 🎻 Virtuoso          |        80% |       600 |
|    23 | Maestro                  |                1700 | Latin/Greek-origin words                  | Pass Level 22                  | 🎼 Maestro           |        80% |       625 |
|    24 | Prodigy                  |                1900 | Cross-category challenge words            | Pass Level 23                  | ✨ Prodigy           |        80% |       650 |
|    25 | Champion                 |                2100 | Rare ও international words                | Pass Level 24                  | 🏆 Champion          |        82% |       675 |
|    26 | Challenger               |                2300 | Foreign-loanword spellings                | Pass Level 25                  | 🥊 Challenger        |        82% |       700 |
|    27 | Contender                |                2500 | High-frequency competition words          | Pass Level 26                  | 🎖 Contender          |        82% |       725 |
|    28 | Gladiator                |                2700 | Words with silent/double letters          | Pass Level 27                  | ⚔️ Gladiator          |        82% |       750 |
|    29 | Warrior                  |                3000 | Speed-spelling under pressure             | Pass Level 28                  | 🛡️ Warrior            |        82% |       775 |
|    30 | Grandmaster              |                3300 | Obscure & language-origin words           | Pass Level 29                  | 👑 Grandmaster       |        85% |       800 |
|    31 | Sage                     |                3600 | Archaic & literary words                  | Pass Level 30                  | 🧙 Sage              |        85% |       825 |
|    32 | Mentor                   |                4000 | Scientific & medical basics               | Pass Level 31                  | 🧑‍🏫 Mentor           |        85% |       850 |
|    33 | Luminary                 |                4400 | Advanced etymology patterns               | Pass Level 32                  | 💡 Luminary          |        85% |       875 |
|    34 | Vanguard                 |                4800 | Rare compound & hyphenated words          | Pass Level 33                  | 🚩 Vanguard          |        85% |       900 |
|    35 | Elite                    |                5200 | Regional Spelling Bee preparation         | Pass Level 34                  | 💎 Elite             |        87% |       925 |
|    36 | Titan                    |                5600 | State-level vocabulary                    | Pass Level 35                  | 🗿 Titan             |        87% |       950 |
|    37 | Phenom                   |                6000 | Cross-language origin words               | Pass Level 36                  | 🌟 Phenom            |        87% |       975 |
|    38 | Dynamo                   |                6500 | High-difficulty homophone sets            | Pass Level 37                  | ⚡ Dynamo            |        87% |      1000 |
|    39 | Trailblazer              |                7000 | Championship-tier word lists              | Pass Level 38                  | 🔥 Trailblazer       |        87% |      1025 |
|    40 | Regional Contender       |                7500 | Regional Spelling Bee preparation         | Pass Level 39 + Review Streak  | 🎗 Regional          |        90% |      1050 |
|    41 | State Qualifier          |                8000 | State-level Spelling Bee vocabulary       | Pass Level 40 + Review Streak  | 🥉 State Qualifier   |        90% |      1075 |
|    42 | State Finalist           |                8500 | State-level advanced vocabulary           | Pass Level 41 + Review Streak  | 🏵 State Finalist    |        90% |      1100 |
|    43 | National Contender       |                9000 | National Spelling Bee preliminary         | Pass Level 42 + Review Streak  | 🥈 National Contender|        90% |      1125 |
|    44 | National Challenger      |                9500 | National Spelling Bee preliminary (adv.)  | Pass Level 43 + Review Streak  | 🎯 National Challenger|       90% |      1150 |
|    45 | National Finalist        |               10000 | National Spelling Bee advanced            | Pass Level 44 + Review Streak  | 🥇 National Finalist |        92% |      1175 |
|    46 | International Contender  |               10500 | Multidialectal & regional-variant words   | Pass Level 45 + Review Streak  | 🌍 Intl. Contender   |        92% |      1200 |
|    47 | International Master     |               11000 | Highly complex multidialectal words       | Pass Level 46 + Review Streak  | 🌐 Intl. Master      |        92% |      1225 |
|    48 | World Champion           |               12000 | World-class competition vocabulary        | Pass Level 47 + Review Streak  | 🏵 World Champion    |        92% |      1250 |
|    49 | Ultimate Legend          |              13000+ | Medical, scientific & rarest words        | Pass Level 48 + Review Streak  | 👑 Legend Crown      |        95% |      1500 |

### Tier Grouping (10 Tiers × 5 Levels)
| Tier | Levels | Tier Name          |
| ---: | ------ | ------------------ |
|    1 | 0–4    | Hatchling Tier      |
|    2 | 5–9    | Sprout Tier         |
|    3 | 10–14  | Scholar Tier        |
|    4 | 15–19  | Specialist Tier     |
|    5 | 20–24  | Expert Tier         |
|    6 | 25–29  | Champion Tier       |
|    7 | 30–34  | Master Tier         |
|    8 | 35–39  | Elite Tier          |
|    9 | 40–44  | National Tier       |
|   10 | 45–49  | Legend Tier         |

### Level Progression Rules
- Each category tracks its own level progress independently (e.g., Animals can be Level 20 while Fruits is Level 3).
- Unlocking a level in one category does **not** unlock it in others — levels are per-category.
- Pass score threshold rises with difficulty (70% early levels → 95% at Ultimate Legend) to keep advanced ranks meaningful.
- XP accumulates globally across all categories and drives the user's overall Rank shown on `/progress`.
- Badge/Rank icon for a level is awarded once, on first pass, and displayed on the category card and profile.
- Levels 40–49 ("National Tier" + "Legend Tier") additionally require a **Review Streak**: no more than 2 wrong words in the prior level's test, encouraging mastery before advancing into Spelling-Bee-competition-grade content.

## User Journey (Step-by-Step)

### 1. Category Selection
Example: **Animals**
Category card displays:
- Category name
- Category icon/image
- Total words
- Completed words
- Current level
- Progress percentage

### 2. Level Selection
When Animals category is opened:
- Foundation
- Starter
- Beginner
- Elementary
- Intermediate
- Advanced
- Expert
- Champion

*Initially, only Foundation is unlocked. Passing a level unlocks the next one.*

### 3. Learning Each Word
One word displayed per card:
```text
Word: Elephant
Pronunciation: /ˈel.ɪ.fənt/
Bangla Pronunciation: এলিফ্যান্ট
Meaning: A very large animal
Bangla Meaning: হাতি
Syllables: el • e • phant
Example: The elephant is a large animal.
Hint: Starts with “ele” and ends with “phant”
```

Actions for each word:
- 🔊 Listen
- 🐢 Listen Slowly
- 👁 Show/Hide Word
- 💡 Show Hint
- ✅ I Learned This
- ➡️ Next Word

## Learning Steps (Per Level)
A level does not end with a test directly. It follows these stages:

**Stage 1: Learn** - View word, read meaning, listen to pronunciation.
**Stage 2: Listen** - Word is hidden. Identify the word by listening to audio.
**Stage 3: Build** - Rearrange scrambled letters (e.g., `t – a – c → cat`).
**Stage 4: Complete** - Fill in missing letters (e.g., `e l _ p h a n t`).
**Stage 5: Spell** - Listen to audio and type the complete spelling.
**Stage 6: Review** - Practice the misspelled words again.
**Stage 7: Level Test**
- 10–20 questions
- Activities: Listen and type, missing letters, arrange letters, multiple choice.
- Passing score: 80%

**Stage 8: Complete**
If Passed:
- Level completed message
- Score
- Accuracy
- Wrong words
- Next level unlocked
- Practice again option

## Learning Progress (LocalStorage)
Data is saved in the browser's `localStorage` (No login required):
- Completed categories
- Completed levels
- Learned words
- Wrong words
- Best score
- Current learning position
- Unlocked levels
*> Note: Clearing browser data will reset progress.*

## JSON Data Structure
```json
[
  {
    "id": "animals-foundation-001",
    "category": "animals",
    "level": 0,
    "order": 1,
    "word": "cat",
    "pronunciation": "/kæt/",
    "banglaPronunciation": "ক্যাট",
    "meaning": "A small domesticated animal",
    "banglaMeaning": "বিড়াল",
    "syllables": ["cat"],
    "example": "The cat is sleeping.",
    "hint": "It starts with C and ends with T.",
    "image": "/images/animals/cat.webp"
  },
  {
    "id": "animals-foundation-002",
    "category": "animals",
    "level": 0,
    "order": 2,
    "word": "dog",
    "pronunciation": "/dɒɡ/",
    "banglaPronunciation": "ডগ",
    "meaning": "A common domesticated animal",
    "banglaMeaning": "কুকুর",
    "syllables": ["dog"],
    "example": "The dog is running.",
    "hint": "It starts with D and ends with G.",
    "image": "/images/animals/dog.webp"
  }
]
```

## Recommended Pages
- `/` - Home
- `/categories` - All categories
- `/category/animals` - Animals category levels
- `/category/animals/level/0` - Foundation word list
- `/learn/animals/0` - Step-by-step learning
- `/practice/animals/0` - Practice activities
- `/test/animals/0` - Level test
- `/progress` - Local learning progress

## Simple Menu
- Home
- Categories
- Continue Learning
- Difficult Words
- Progress
- About

## Home Page Sections
- Hero: “Learn Spelling from Zero to Champion”
- Continue Learning button
- Browse Categories
- How It Works
- Learning Levels
- Daily Word
- Overall Progress
- Start Learning button

## Completion Rules
- Must click `I Learned This` on every word.
- Must complete all words in a level to unlock the test.
- Minimum 80% needed to pass the test.
- If failed, a revision session starts with wrong words only.
- Can re-take the test after revision.
- Passing unlocks the next level.
- Completing a category allows starting another category (all categories are accessible from the start).
