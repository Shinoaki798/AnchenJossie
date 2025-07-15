#!/bin/bash

# Fix formatting issues in HTML files
root_dir="$(cd "$(dirname "$0")" && pwd)"

echo "Fixing formatting issues in HTML files..."

# Process all HTML files
find "$root_dir" -name "*.html" -type f | while read -r file; do
    # Check if the file has the formatting issue
    if grep -q '<link rel="icon".*/>  <title>' "$file"; then
        echo "Fixing formatting in: $file"
        
        # Fix the formatting by adding a newline
        sed -i.bak 's|<link rel="icon" href="[^"]*" type="image/png" />  <title>|<link rel="icon" href="../../icon.png" type="image/png" />\
  <title>|g' "$file"
        
        # Remove backup file
        rm -f "$file.bak"
    fi
done

echo "Formatting fixes completed!"
