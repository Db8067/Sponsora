import re
import os

def html_to_jsx(html_str):
    # Extract just the body content
    body_match = re.search(r'<body[^>]*>(.*?)</body>', html_str, re.IGNORECASE | re.DOTALL)
    if body_match:
        html_str = body_match.group(1)
    
    # Remove all <script>...</script> blocks
    html_str = re.sub(r'<script.*?>.*?</script>', '', html_str, flags=re.IGNORECASE | re.DOTALL)
    
    # Convert class= to className=
    html_str = re.sub(r'\bclass=', 'className=', html_str)
    
    # Convert inline styles (simplistic)
    html_str = re.sub(r'style="([^"]+)"', '', html_str)
    
    # Self-close tags
    void_tags = ['img', 'input', 'br', 'hr', 'meta', 'link', 'path']
    for tag in void_tags:
        # Regex to find <tag ... > without a closing /
        html_str = re.sub(r'<(' + tag + r'\b[^>]*?)(?<!/)>', r'<\1 />', html_str, flags=re.IGNORECASE)
    
    # Handle SVG attributes if any
    html_str = re.sub(r'stroke-width=', 'strokeWidth=', html_str)
    html_str = re.sub(r'stroke-linecap=', 'strokeLinecap=', html_str)
    html_str = re.sub(r'stroke-linejoin=', 'strokeLinejoin=', html_str)
    html_str = re.sub(r'fill-rule=', 'fillRule=', html_str)
    html_str = re.sub(r'clip-rule=', 'clipRule=', html_str)
    
    # Handle JS event attributes by removing them since we just want the UI
    html_str = re.sub(r'\bonclick="[^"]*"', '', html_str, flags=re.IGNORECASE)
    html_str = re.sub(r'\bonchange="[^"]*"', '', html_str, flags=re.IGNORECASE)
    
    # Handle comments
    html_str = re.sub(r'<!--(.*?)-->', r'{/* \1 */}', html_str, flags=re.DOTALL)
    
    # Ensure there's a single root by wrapping in fragment
    return f'<>{html_str}</>'

with open('current_user_prompt.txt', 'r', encoding='utf-8') as f:
    text = f.read()

# Split the text by 'create a new page name as'
parts = re.split(r'create a new page name as (/[a-zA-Z0-9-]+).*?code (?:of|for)(?: the)? page is below:', text, flags=re.IGNORECASE | re.DOTALL)

pages = {}
for i in range(1, len(parts), 2):
    page_name = parts[i].strip().lstrip('/')
    html_code = parts[i+1].strip()
    
    # Extract the first block of HTML
    html_match = re.search(r'<!DOCTYPE html>.*?</html>', html_code, re.IGNORECASE | re.DOTALL)
    if html_match:
        pages[page_name] = html_match.group(0)

print(f"Found pages: {list(pages.keys())}")

for page_name, html_content in pages.items():
    if not page_name: continue
    
    jsx_content = html_to_jsx(html_content)
    
    # Prepare the Next.js component
    component_name = ''.join(word.capitalize() for word in page_name.split('-')) + 'Page'
    
    file_content = f'''import React from "react";
import Snowfall from "@/components/Snowfall";

export default function {component_name}() {{
  return (
    <>
      <Snowfall />
      <div className="relative z-10 w-full min-h-screen">
        {{/* Extracted Content */}}
        {jsx_content}
      </div>
    </>
  );
}}
'''
    
    dir_path = os.path.join('main-app', 'app', page_name)
    os.makedirs(dir_path, exist_ok=True)
    
    file_path = os.path.join(dir_path, 'page.tsx')
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(file_content)
    print(f"Created {file_path}")

