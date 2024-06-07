import os
import json
import sys

def main(prefix):
    current_directory = os.getcwd()
    png_files_info = []

    for filename in os.listdir(current_directory):
        if filename.endswith(".png"):
            file_id = os.path.splitext(filename)[0]
            file_info = {
                "id": file_id,
                "name": file_id.replace("_", " ").title(),
                "url": f"{prefix}{filename}"
            }
            png_files_info.append(file_info)

    with open("all.json", "w") as json_file:
        json.dump(png_files_info, json_file, indent=2)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <prefix>")
        sys.exit(1)
    
    prefix = sys.argv[1]
    main(prefix)