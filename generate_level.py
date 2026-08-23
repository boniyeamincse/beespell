import json
import random
import time
import requests
import pyphen
import nltk
from nltk.corpus import words as nltk_words
import pronouncing
from deep_translator import GoogleTranslator
from concurrent.futures import ThreadPoolExecutor, as_completed

def get_syllables(word):
    dic = pyphen.Pyphen(lang='en_US')
    syl = dic.inserted(word).split('-')
    if len(syl) <= 1:
        return list(word)
    return syl

def get_word_details(word):
    try:
        res = requests.get(f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}", timeout=3)
        if res.status_code == 200:
            data = res.json()[0]
            
            phonetic = f"/{word}/"
            if 'phonetic' in data and data['phonetic']:
                phonetic = data['phonetic']
            elif 'phonetics' in data:
                for p in data['phonetics']:
                    if 'text' in p and p['text']:
                        phonetic = p['text']
                        break
                        
            meaning = "A descriptive word."
            example = f"This is an example of {word}."
            part_of_speech = "noun"
            origin = data.get('origin', "English")
            
            if 'meanings' in data and data['meanings']:
                meanings_list = data['meanings']
                # Grab partOfSpeech from the first meaning
                if 'partOfSpeech' in meanings_list[0]:
                    part_of_speech = meanings_list[0]['partOfSpeech']
                    
                for m in meanings_list:
                    if 'definitions' in m and m['definitions']:
                        defn = m['definitions'][0]
                        if 'definition' in defn:
                            meaning = defn['definition']
                        if 'example' in defn:
                            example = defn['example']
                            break
                        
            return phonetic, meaning, example, part_of_speech, origin
    except Exception as e:
        pass
    
    # Fallback
    phones = pronouncing.phones_for_word(word)
    phonetic = f"/{word}/"
    if phones:
        phonetic = f"/{phones[0].split()[0].lower()}/"
        
    return phonetic, f"A vocabulary word.", f"The word is {word}.", "noun", "English"

def process_word(i, word):
    phonetic, meaning, example, part_of_speech, origin = get_word_details(word)
    translator = GoogleTranslator(source='en', target='bn')
    
    try:
        bn_word = translator.translate(word)
        bn_meaning = translator.translate(meaning)
        bn_pronunciation = bn_word # Approx
    except:
        bn_word = word
        bn_meaning = meaning
        bn_pronunciation = word
        
    syllables = get_syllables(word)
    
    item = {
        "id": f"lvl16-{i+1:03d}",
        "level": 16,
        "order": i+1,
        "word": word,
        "pronunciation": phonetic,
        "banglaPronunciation": bn_pronunciation,
        "meaning": meaning,
        "banglaMeaning": bn_meaning,
        "partOfSpeech": part_of_speech,
        "origin": origin,
        "syllables": syllables,
        "example": example,
        "hint": f"Starts with {word[0].upper()} and ends with {word[-1].upper()}.",
        "image": f"/images/level16/{word}.webp"
    }
    return i, item

def main():
    print("Fetching words from NLTK...")
    word_list = [w.lower() for w in nltk_words.words() if w.isalpha() and 8 <= len(w) <= 13]
    
    # Filter out words that were already used in previous levels
    # For now, just shuffle and pick
    random.seed(44)
    random.shuffle(word_list)
    words = word_list[:900]
    
    print(f"Found {len(words)} words. Fetching details and translating with ThreadPoolExecutor...")
    
    # Initialize pronouncing dictionary in main thread to avoid race conditions
    import pronouncing
    pronouncing.phones_for_word("test")
    
    results = [None] * len(words)
    completed = 0
    
    with ThreadPoolExecutor(max_workers=30) as executor:
        futures = {executor.submit(process_word, i, word): i for i, word in enumerate(words)}
        for future in as_completed(futures):
            idx, item = future.result()
            results[idx] = item
            completed += 1
            if completed % 100 == 0:
                print(f"Processed {completed}/{len(words)} words...")
            
    with open("src/data/words/level-16-specialist.json", "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
        
    print("Completed generation of level-16-specialist.json")

if __name__ == "__main__":
    main()
