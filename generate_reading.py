import json

def generate_stories():
    stories = []
    
    # Hardcoded Level 1 from User Input
    level_1 = {
        "id": 1,
        "level": 1,
        "difficulty": "easy",
        "title": "My Little Cat",
        "story": "I have a cat.\nMy cat is small.\nIts name is Mimi.\nMimi is white.\nIt has two blue eyes.\nMimi likes milk.\nIt likes to play.\nI love my little cat. ❤️",
        "wordCount": 33,
        "new_words": [
            { "word": "Cat", "meaning": "বিড়াল" },
            { "word": "Small", "meaning": "ছোট" },
            { "word": "White", "meaning": "সাদা" },
            { "word": "Eyes", "meaning": "চোখ" },
            { "word": "Milk", "meaning": "দুধ" },
            { "word": "Play", "meaning": "খেলা" },
            { "word": "Love", "meaning": "ভালোবাসা" }
        ],
        "questions": [
            "What is the name of the cat?",
            "What color is Mimi?",
            "What does Mimi like?",
            "Does Mimi like to play?"
        ]
    }
    stories.append(level_1)
    
    level_2 = {
        "id": 2,
        "level": 2,
        "difficulty": "easy",
        "title": "My Little Dog",
        "story": "I have a dog.\nMy dog is big.\nIts name is Max.\nMax is brown.\nIt has four legs.\nIt has two big ears.\nMax likes to run.\nI play with Max every day.\nMax is my good friend. 🐶❤️",
        "wordCount": 42,
        "new_words": [
            { "word": "Dog", "meaning": "কুকুর" },
            { "word": "Big", "meaning": "বড়" },
            { "word": "Brown", "meaning": "বাদামি" },
            { "word": "Legs", "meaning": "পা" },
            { "word": "Ears", "meaning": "কান" },
            { "word": "Run", "meaning": "দৌড়ানো" },
            { "word": "Friend", "meaning": "বন্ধু" },
            { "word": "Every day", "meaning": "প্রতিদিন" }
        ],
        "questions": [
            "What is the name of the dog?",
            "What color is Max?",
            "How many legs does Max have?",
            "What does Max like to do?",
            "Who is Max's good friend?"
        ]
    }
    stories.append(level_2)
    
    # Generate placeholders for Levels 3-100 following the same schema
    for level in range(3, 101):
        if level <= 25:
            difficulty = "easy"
        elif level <= 50:
            difficulty = "intermediate"
        elif level <= 75:
            difficulty = "hard"
        else:
            difficulty = "advanced"
            
        stories.append({
            "id": level,
            "level": level,
            "difficulty": difficulty,
            "title": f"Story Level {level}",
            "story": f"This is a placeholder story for Level {level}. As you progress, the stories will become more difficult and engaging! Keep practicing your reading skills every day.",
            "wordCount": 26,
            "new_words": [
                { "word": "Placeholder", "meaning": "স্থানধারক" },
                { "word": "Practice", "meaning": "অনুশীলন করা" }
            ],
            "questions": [
                "What level is this story?",
                "What should you do every day?"
            ]
        })
        
    with open("src/data/reading_stories.json", "w", encoding="utf-8") as f:
        json.dump(stories, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    generate_stories()
    print("Generated 100 reading stories in src/data/reading_stories.json")
