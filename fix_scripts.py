import re
import os

files_to_fix = [
    'main-app/app/creators-setup/page.tsx',
    'main-app/app/creator-dashboard/page.tsx',
    'main-app/app/creators-program/page.tsx',
    'main-app/app/creators-voucher/page.tsx'
]

for file_path in files_to_fix:
    if not os.path.exists(file_path):
        continue
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove all <script>...</script> blocks
    content = re.sub(r'<script.*?>.*?</script>', '', content, flags=re.IGNORECASE | re.DOTALL)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Fixed {file_path}")
