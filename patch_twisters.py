import json
import re

easy_twisters = [
    "Big blue ball.", "Red rubber ring.", "Four funny fish.", "Five fat frogs.", "Ten tiny turtles.",
    "Six silly snakes.", "Busy buzzing bees.", "Cute cats cook.", "Dogs dig deep.", "Happy hippos hop.",
    "Little lions leap.", "Pretty puppies play.", "Small sheep sleep.", "Black bats blink.", "Green grapes grow.",
    "Round rocks roll.", "Blue birds bounce.", "Brave brown bears.", "Funny foxes fight.", "Yellow yaks yell.",
    
    "Bob bought bananas.", "Sam sells socks.", "Tim takes tomatoes.", "Lucy loves lemons.", "Mary makes muffins.",
    "Peter paints pictures.", "Sally sings softly.", "Ruby runs rapidly.", "Jenny jumps joyfully.", "Nancy needs noodles.",
    "Bears bake brown bread.", "Cats catch colourful cakes.", "Ducks drink during dinner.", "Fish find fresh food.", "Goats grow green grass.",
    "Horses wear happy hats.", "Lions like little lemons.", "Monkeys make funny music.", "Parrots pick purple peppers.", "Penguins pack pink pencils.",
    
    "A big bug bit a bear.", "A fat cat sat on a mat.", "A tiny tiger took a taxi.", "Four frogs found fresh fruit.", "Five fish found five flies.",
    "Six snakes slid slowly.", "Seven sheep shared shoes.", "Busy bees buzz by Ben.", "Bobby brings blue balloons.", "Danny’s dog digs daily.",
    "Fred found five flowers.", "Grace grabs green grapes.", "Harry holds heavy hats.", "Kelly keeps colourful keys.", "Molly mixes mini muffins.",
    "Polly puts pink plates properly.", "Rosie reads red riddles.", "Tommy takes ten toys.", "Wendy washes white windows.", "Zebras zigzag around the zoo.",
    
    "Red lorry, yellow lorry.", "She sees cheese.", "Fresh fried fish.", "Toy boat, toy boat.", "Good blood, bad blood.",
    "Black bug, blue bug.", "Eleven eager elephants.", "Four fine fresh fish.", "A proper copper coffee pot.", "I scream, you scream, we all scream for ice cream.",
    "She sells seashells by the seashore.", "Peter Piper picked a peck of pickled peppers.", "A big black bug bit a big black bear.", "How can a clam cram in a clean cream can?", "A noisy noise annoys an oyster."
]

data_path = "src/data/tongue_twisters.json"

with open("docs/tongue_twisters_300.md", "r", encoding="utf-8") as f:
    content = f.read()

# Extract all bullet points
existing_texts = re.findall(r'^- (.+)$', content, re.MULTILINE)

# Remove duplicates
easy_lower = [t.lower().replace(".", "").strip() for t in easy_twisters]
filtered_existing = []
for text in existing_texts:
    t_low = text.lower().replace(".", "").strip()
    if t_low not in easy_lower:
        filtered_existing.append(text)

# Sort the remaining existing twisters by length (a proxy for difficulty)
filtered_existing.sort(key=lambda x: len(x))

all_twisters = easy_twisters + filtered_existing

new_data = []
for i, text in enumerate(all_twisters):
    level = (i // 5) + 1
    new_data.append({
        "id": f"tt_{str(i+1).zfill(3)}",
        "level": level,
        "text": text
    })

with open(data_path, "w", encoding="utf-8") as f:
    json.dump(new_data, f, indent=2)

print(f"Successfully generated {len(new_data)} tongue twisters into {level} levels, scaling from easy to hard!")
