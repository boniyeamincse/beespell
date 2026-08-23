import json
import glob
import requests
import os
from concurrent.futures import ThreadPoolExecutor, as_completed

def get_word_details(word):
    try:
        res = requests.get(f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}", timeout=5)
        if res.status_code == 200:
            data = res.json()[0]
            part_of_speech = "noun"
            origin = data.get('origin', "English")
            
            if 'meanings' in data and data['meanings']:
                meanings_list = data['meanings']
                if 'partOfSpeech' in meanings_list[0]:
                    part_of_speech = meanings_list[0]['partOfSpeech']
            return part_of_speech, origin
    except:
        pass
    return "noun", "English"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    updated = False
    
    # Check if this file needs updating
    needs_update = any('partOfSpeech' not in item for item in data)
    if not needs_update:
        return f"{filepath} already up to date."

    def update_item(item):
        if 'partOfSpeech' not in item or 'origin' not in item:
            word = item.get('word', '')
            if len(word) == 1:
                item['partOfSpeech'] = "noun"
                item['origin'] = "English"
            else:
                pos, origin = get_word_details(word)
                item['partOfSpeech'] = pos
                item['origin'] = origin
            return True
        return False

    # Process items concurrently within the file
    with ThreadPoolExecutor(max_workers=30) as executor:
        futures = [executor.submit(update_item, item) for item in data]
        for future in as_completed(futures):
            if future.result():
                updated = True
                
    if updated:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        return f"Updated {filepath}"
    return f"No changes in {filepath}"

def main():
    files = glob.glob('src/data/words/*.json')
    print(f"Found {len(files)} JSON files. Updating...")
    
    for file in files:
        print(f"Processing {file}...")
        res = process_file(file)
        print(res)

if __name__ == '__main__':
    main()
