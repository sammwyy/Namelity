import os
import json
import sys

# List of directories to scan
dirs = ["minecraft"]

def generate_json_for_directory(directory):
    # Create the full path to the directory
    base_path = os.path.join("public", "textures", directory)
    
    # List to store information about PNG files
    png_files_info = []

    # Traverse all files in the specified directory
    if os.path.exists(base_path):
        for filename in os.listdir(base_path):
            if filename.endswith(".png"):
                # Get the file name without the extension
                file_id = os.path.splitext(filename)[0]
                # Create a dictionary with the file information
                file_info = {
                    "id": file_id,
                    "name": file_id.replace("_", " ").title(),
                    # Adjust path separators and remove 'public' from the URL
                    "url": f"{base_path.replace('public', '').replace(os.sep, '/')}/{filename}"
                }
                # Add the dictionary to the list
                png_files_info.append(file_info)
    else:
        print(f"The directory {base_path} does not exist.")
        return

    # Create the full path for the JSON file
    output_path = os.path.join("tmp", f"{directory}.json")

    # Create the output directory if it doesn't exist
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # Write the list to a JSON file
    with open(output_path, "w") as json_file:
        json.dump(png_files_info, json_file, indent=2)
        print(f"JSON file generated: {output_path}")

def main():
    # Generate JSON for each directory in the list
    for directory in dirs:
        generate_json_for_directory(directory)

if __name__ == "__main__":
    # Replace '\\' with '/' on Windows systems
    if sys.platform == "win32":
        dirs = [directory.replace("\\", "/") for directory in dirs]
    main()
