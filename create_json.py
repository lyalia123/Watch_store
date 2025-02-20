import pandas as pd
import json

# Downloading dataset from the Internet
path = '/Users/dariyaablanova/Desktop/unic_work/NoSQL/final/watch_data.csv'  # Path to file
df = pd.read_csv(path)

# Убираем лишние пробелы в названиях столбцов
df.columns = df.columns.str.strip()

# Required columns
columns_to_keep = [
    'Brand', 'Model', 'Reference', 'Complication', 'Case material',
    'Bracelet material', 'Dial', 'Hour Markings', 'Lunette Material', 'Price'
]

# Convert DataFrame to List of Dictionaries
watches_data = df[columns_to_keep].to_dict(orient='records')

# Сохранение данных в JSON файл
output_path = '/Users/dariyaablanova/Desktop/unic_work/NoSQL/final/watches_data.json'  # Let it be for saving
with open(output_path, 'w') as json_file:
    json.dump(watches_data, json_file, indent=4)

print(f"JSON file successfully created and saved to path: {output_path}")

