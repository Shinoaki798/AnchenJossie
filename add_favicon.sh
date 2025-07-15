#!/bin/bash

# Function to calculate relative path from file to root icon.png
get_relative_path() {
    local file_path="$1"
    local root_dir="$2"
    
    # Get the directory of the file
    local file_dir=$(dirname "$file_path")
    
    # Calculate relative path from file directory to root
    local rel_path=$(realpath --relative-to="$file_dir" "$root_dir" 2>/dev/null || python3 -c "import os; print(os.path.relpath('$root_dir', '$file_dir'))" 2>/dev/null || echo ".")
    
    if [ "$rel_path" = "." ]; then
        echo "icon.png"
    else
        echo "$rel_path/icon.png"
    fi
}

# Function to add favicon to HTML file
add_favicon() {
    local file="$1"
    local root_dir="$2"
    
    # Check if favicon already exists
    if grep -q "icon\.png\|favicon" "$file"; then
        echo "Favicon already exists in: $file"
        return 1
    fi
    
    # Get relative path to icon
    local icon_path=$(get_relative_path "$file" "$root_dir")
    
    # Create the favicon link tag
    local favicon_tag="  <link rel=\"icon\" href=\"$icon_path\" type=\"image/png\" />"
    
    # Add favicon after charset or after head tag
    if grep -q '<meta charset=' "$file"; then
        # Add after charset
        sed -i.bak "/<meta charset=/a\\
$favicon_tag" "$file"
    elif grep -q '<head' "$file"; then
        # Add after head tag
        sed -i.bak "/<head[^>]*>/a\\
$favicon_tag" "$file"
    else
        echo "No suitable location found in: $file"
        return 1
    fi
    
    # Remove backup file
    rm -f "$file.bak"
    echo "Added favicon to: $file"
    return 0
}

# Main script
root_dir="$(cd "$(dirname "$0")" && pwd)"

# Check if icon.png exists
if [ ! -f "$root_dir/icon.png" ]; then
    echo "Error: icon.png not found in $root_dir"
    exit 1
fi

echo "Root directory: $root_dir"
echo "Adding favicon to HTML files..."
echo

# Find and process all HTML files
modified_count=0
total_count=0

while IFS= read -r -d '' file; do
    total_count=$((total_count + 1))
    if add_favicon "$file" "$root_dir"; then
        modified_count=$((modified_count + 1))
    fi
done < <(find "$root_dir" -name "*.html" -type f -print0)

echo
echo "Completed! Modified $modified_count files out of $total_count HTML files."
