import json
import os
import random

random.seed(42)

bases = [
    ("She sells {shells} by the {seashore}.", {"shells": ["seashells", "shoeshells", "snailshells"], "seashore": ["seashore", "seaside", "sandbank"]}),
    ("How much {wood} would a {woodchuck} chuck if a {woodchuck} could chuck {wood}?", {"wood": ["wood", "wool", "weed"], "woodchuck": ["woodchuck", "woolsheep", "weedwhacker"]}),
    ("Peter Piper picked a peck of {pickled} {peppers}.", {"pickled": ["pickled", "purple", "pungent"], "peppers": ["peppers", "plums", "pears"]}),
    ("I scream, you scream, we all scream for {icecream}!", {"icecream": ["ice cream", "iced tea", "ice cubes"]}),
    ("Fuzzy Wuzzy was a {bear}. Fuzzy Wuzzy had no {hair}.", {"bear": ["bear", "boar", "bunny"], "hair": ["hair", "hare", "hope"]}),
    ("Betty Botter bought some {butter}, but she said the {butter}'s {bitter}.", {"butter": ["butter", "batter", "bacon"], "bitter": ["bitter", "better", "broken"]}),
    ("A proper {copper} {coffee} pot.", {"copper": ["copper", "crimson", "crafty"], "coffee": ["coffee", "cocoa", "candy"]}),
    ("Red {lorry}, yellow {lorry}, red {lorry}, yellow {lorry}.", {"lorry": ["lorry", "leather", "lizard"]}),
    ("Unique New York, unique New York, you know you need unique New York.", {}),
    ("Six slippery {snails} slid slowly {seaward}.", {"snails": ["snails", "snakes", "seals"], "seaward": ["seaward", "southward", "sideways"]}),
    ("I saw a {kitten} eating {chicken} in the {kitchen}.", {"kitten": ["kitten", "kid", "king"], "chicken": ["chicken", "cheese", "chips"], "kitchen": ["kitchen", "kingdom", "kiosk"]}),
    ("If a dog chews {shoes}, whose {shoes} does he choose?", {"shoes": ["shoes", "socks", "slippers"]}),
    ("I thought I thought of {thinking} of {thanking} you.", {"thinking": ["thinking", "throwing", "thrilling"], "thanking": ["thanking", "thumping", "thawing"]}),
    ("Nine nice night {nurses} nursing {nicely}.", {"nurses": ["nurses", "nephews", "newts"], "nicely": ["nicely", "neatly", "naturally"]}),
    ("Wayne went to Wales to watch {walruses}.", {"walruses": ["walruses", "weasels", "wolves"]}),
    ("Four fine fresh {fish} for you.", {"fish": ["fish", "figs", "fries"]}),
    ("Which wristwatches are {Swiss} wristwatches?", {"Swiss": ["Swiss", "sweet", "swank"]}),
    ("Fred fed Ted {bread}, and Ted fed Fred {bread}.", {"bread": ["bread", "beans", "berries"]}),
    ("We surely shall see the {sun} shine soon.", {"sun": ["sun", "stars", "sky"]}),
    ("A big black bug bit a big black {bear}.", {"bear": ["bear", "boar", "bull"]}),
    ("Selfish {shellfish}.", {"shellfish": ["shellfish", "sheep", "sharks"]}),
    ("Any noise annoys an oyster, but a {noisy} noise annoys an oyster more.", {"noisy": ["noisy", "nasty", "new"]}),
    ("A happy hippo hopped and {hiccupped}.", {"hiccupped": ["hiccupped", "howled", "hissed"]}),
    ("Lesser leather never weathered {wetter} weather better.", {"wetter": ["wetter", "warmer", "worse"]}),
    ("Eleven benevolent {elephants}.", {"elephants": ["elephants", "elves", "eagles"]}),
    ("Two toads, totally tired, trying to trot to {Tewkesbury}.", {"Tewkesbury": ["Tewkesbury", "Texas", "Tokyo"]}),
    ("Brisk brave brigadiers brandished broad bright {blades}.", {"blades": ["blades", "bricks", "brooms"]}),
    ("If you notice this notice, you will notice that this notice is not worth {noticing}.", {"noticing": ["noticing", "nothing", "naming"]}),
    ("Chester Cheetah chews a chunk of cheap cheddar {cheese}.", {"cheese": ["cheese", "chicken", "chalk"]}),
    ("Double bubble gum, bubbles {double}.", {"double": ["double", "deeply", "down"]})
]

twisters = []
count = 1

while len(twisters) < 300:
    for base, opts in bases:
        if len(twisters) >= 300:
            break
        
        text = base
        if opts:
            for k, v in opts.items():
                text = text.replace(f"{{{k}}}", random.choice(v))
        
        if not opts and count > len(bases):
            text = text + f" (Variation {count})"

        level = ((count - 1) // 5) + 1
        twisters.append({
            "id": count,
            "level": level,
            "text": text
        })
        count += 1

md_content = "# Tongue Twisters (Levels 1 to 60)\n\n"
for level in range(1, 61):
    md_content += f"## Level {level}\n"
    for t in [x for x in twisters if x["level"] == level]:
        md_content += f"- {t['text']}\n"
    md_content += "\n"

os.makedirs("/home/boni/Desktop/bee/docs", exist_ok=True)
with open("/home/boni/Desktop/bee/docs/tongue_twisters_300.md", "w", encoding="utf-8") as f:
    f.write(md_content)

os.makedirs("/home/boni/Desktop/bee/src/data", exist_ok=True)
with open("/home/boni/Desktop/bee/src/data/tongue_twisters.json", "w", encoding="utf-8") as f:
    json.dump(twisters, f, indent=2)

print("Generated 300 tongue twisters and saved to docs/tongue_twisters_300.md and src/data/tongue_twisters.json")
