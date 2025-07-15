#!/bin/bash

# Function to get the correct relative path to icon.png
get_icon_path() {
    local file_path="$1"
    local root_dir="$2"
    
    # Count directory depth
    local depth=$(echo "$file_path" | sed "s|$root_dir||" | grep -o '/' | wc -l)
    depth=$((depth - 1))
    
    if [ $depth -eq 0 ]; then
        echo "icon.png"
    elif [ $depth -eq 1 ]; then
        echo "../icon.png"
    elif [ $depth -eq 2 ]; then
        echo "../../icon.png"
    else
        # For deeper nesting, add more ../
        local path=""
        for ((i=0; i<depth; i++)); do
            path="../$path"
        done
        echo "${path}icon.png"
    fi
}

root_dir="$(cd "$(dirname "$0")" && pwd)"

echo "Fixing favicon paths and formatting..."

# Process all HTML files with favicon
find "$root_dir" -name "*.html" -type f | while read -r file; do
    if grep -q 'rel="icon"' "$file"; then
        echo "Processing: $file"
        
        # Get the correct path
        correct_path=$(get_icon_path "$file" "$root_dir")
        
        # Replace the favicon line with correct path and formatting
        sed -i.bak "s|<link rel=\"icon\" href=\"[^\"]*\" type=\"image/png\" />.*<title>|<link rel=\"icon\" href=\"$correct_path\" type=\"image/png\" />\
  <title>|g" "$file"
        
        # Remove backup file
        rm -f "$file.bak"
    fi
done

echo "All favicon paths and formatting fixed!"
