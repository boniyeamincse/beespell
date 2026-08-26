import json
import random

adjectives = {
    'b': ['big', 'brave', 'black', 'blue', 'busy', 'bouncy', 'bitter'],
    'c': ['crazy', 'clever', 'cool', 'cute', 'creepy', 'crafty', 'clumsy'],
    'd': ['dark', 'deep', 'dazzling', 'dirty', 'dizzy', 'dusty', 'daring'],
    'f': ['fast', 'fat', 'fierce', 'funny', 'furry', 'fancy', 'fabulous'],
    'g': ['great', 'green', 'giant', 'grumpy', 'good', 'golden', 'goofy'],
    'h': ['happy', 'huge', 'heavy', 'hot', 'hungry', 'hairy', 'hasty'],
    'l': ['little', 'lazy', 'loud', 'lucky', 'long', 'light', 'lonely'],
    'm': ['mad', 'magic', 'many', 'massive', 'mean', 'messy', 'muddy'],
    'p': ['pink', 'proud', 'poor', 'purple', 'pretty', 'polite', 'playful'],
    'r': ['red', 'rich', 'rough', 'round', 'royal', 'rapid', 'rare'],
    's': ['sad', 'safe', 'silly', 'small', 'smart', 'soft', 'sweet', 'sneaky'],
    't': ['tall', 'tiny', 'tough', 'tasty', 'tricky', 'tired', 'thick'],
    'w': ['warm', 'wild', 'wise', 'wet', 'white', 'wooly', 'wacky']
}

nouns = {
    'b': ['bears', 'boys', 'birds', 'bats', 'bees', 'baboons', 'bakers'],
    'c': ['cats', 'cows', 'crabs', 'crows', 'camels', 'cooks', 'clowns'],
    'd': ['dogs', 'ducks', 'dolphins', 'donkeys', 'dragons', 'dancers'],
    'f': ['foxes', 'frogs', 'fish', 'flies', 'farmers', 'friends'],
    'g': ['goats', 'geese', 'gorillas', 'ghosts', 'giants', 'girls'],
    'h': ['horses', 'hippos', 'hens', 'hawks', 'hunters', 'heroes'],
    'l': ['lions', 'lizards', 'llamas', 'ladies', 'leopards', 'lemons'],
    'm': ['monkeys', 'mice', 'moose', 'moths', 'men', 'monsters'],
    'p': ['pigs', 'pandas', 'parrots', 'penguins', 'panthers', 'pirates'],
    'r': ['rabbits', 'rats', 'rhinos', 'robins', 'robots', 'runners'],
    's': ['snakes', 'spiders', 'swans', 'sheep', 'sharks', 'singers'],
    't': ['tigers', 'turtles', 'toads', 'turkeys', 'teachers', 'twins'],
    'w': ['wolves', 'whales', 'walruses', 'wizards', 'weasels', 'workers']
}

verbs = {
    'b': ['bite', 'bake', 'bounce', 'build', 'bring', 'buy', 'boil'],
    'c': ['catch', 'cook', 'clean', 'climb', 'crawl', 'chew', 'count'],
    'd': ['dig', 'dance', 'draw', 'drink', 'drop', 'drive', 'dodge'],
    'f': ['find', 'fly', 'fix', 'fold', 'feed', 'feel', 'fight'],
    'g': ['grab', 'grow', 'give', 'guess', 'greet', 'guide', 'gather'],
    'h': ['hop', 'hide', 'hug', 'hold', 'hunt', 'help', 'hear'],
    'l': ['leap', 'love', 'look', 'laugh', 'lift', 'lick', 'lead'],
    'm': ['make', 'move', 'mix', 'meet', 'melt', 'march', 'mop'],
    'p': ['play', 'paint', 'pick', 'pull', 'push', 'pack', 'poke'],
    'r': ['run', 'read', 'ride', 'roll', 'rest', 'ring', 'roar'],
    's': ['sing', 'sleep', 'swim', 'slide', 'skip', 'smile', 'spin'],
    't': ['take', 'talk', 'teach', 'toss', 'touch', 'travel', 'type'],
    'w': ['walk', 'wash', 'watch', 'wave', 'wear', 'win', 'write']
}

adverbs = {
    'b': ['bravely', 'badly', 'boldly', 'briefly', 'briskly', 'blindly'],
    'c': ['calmly', 'carefully', 'clearly', 'closely', 'coldly', 'crossly'],
    'd': ['deeply', 'dearly', 'darkly', 'dimly', 'directly', 'dazedly'],
    'f': ['fast', 'freely', 'fiercely', 'fondly', 'frankly', 'fully'],
    'g': ['gladly', 'gently', 'greatly', 'grimly', 'guiltily', 'grandly'],
    'h': ['happily', 'hastily', 'heavily', 'highly', 'hotly', 'hungrily'],
    'l': ['loudly', 'lazily', 'lightly', 'loosely', 'luckily', 'lovingly'],
    'm': ['madly', 'mainly', 'mildly', 'mostly', 'mutely', 'mysteriously'],
    'p': ['poorly', 'proudly', 'purely', 'politely', 'promptly', 'perfectly'],
    'r': ['rapidly', 'rarely', 'really', 'richly', 'roughly', 'rudely'],
    's': ['sadly', 'safely', 'slowly', 'softly', 'swiftly', 'silently'],
    't': ['tightly', 'truly', 'tensely', 'thinly', 'tiredly', 'twice'],
    'w': ['warmly', 'wildly', 'wisely', 'wrongly', 'weakly', 'wearily']
}

with open("src/data/tongue_twisters.json", "r", encoding="utf-8") as f:
    existing_data = json.load(f)

existing_texts = [d["text"] for d in existing_data]
existing_lower = set([t.lower().replace(".", "").strip() for t in existing_texts])

new_twisters = []
random.seed(99)

def generate_sentence():
    l = random.choice(list(adjectives.keys()))
    adj1 = random.choice(adjectives[l])
    adj2 = random.choice(adjectives[l])
    while adj1 == adj2 and len(adjectives[l]) > 1:
        adj2 = random.choice(adjectives[l])
    noun1 = random.choice(nouns[l])
    noun2 = random.choice(nouns[l])
    while noun1 == noun2 and len(nouns[l]) > 1:
        noun2 = random.choice(nouns[l])
    verb = random.choice(verbs[l])
    adv = random.choice(adverbs[l])
    
    structures = [
        f"{adj1.capitalize()} {noun1} {verb} {adv}.",
        f"{adj1.capitalize()} {adj2} {noun1} {verb} {adv}.",
        f"Seven {adj1} {noun1} {verb} {adv}.",
        f"The {adj1} {noun1} {verb} {noun2} {adv}.",
        f"{adj1.capitalize()} {noun1} {verb} {adj2} {noun2}."
    ]
    return random.choice(structures)

while len(existing_data) < 500:
    sentence = generate_sentence()
    s_low = sentence.lower().replace(".", "").strip()
    if s_low not in existing_lower:
        existing_lower.add(s_low)
        new_twisters.append(sentence)
        level = (len(existing_data)) // 5 + 1
        existing_data.append({
            "id": f"tt_{str(len(existing_data)+1).zfill(3)}",
            "level": level,
            "text": sentence
        })

with open("src/data/tongue_twisters.json", "w", encoding="utf-8") as f:
    json.dump(existing_data, f, indent=2)

print(f"Added {len(new_twisters)} new twisters! Total is now {len(existing_data)} ({len(existing_data)//5} levels).")
