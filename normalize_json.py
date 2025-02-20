import json

with open('watches_data.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

def normalize_keys(item):
    return {
        key.lower().replace(' ', '_'): value
        for key, value in item.items()
    }

normalized_data = [normalize_keys(item) for item in data]

with open('normalized_watches_data.json', 'w', encoding='utf-8') as file:
    json.dump(normalized_data, file, ensure_ascii=False, indent=4)

print("Файл успешно преобразован и сохранён как 'normalized_watches_data.json'")
