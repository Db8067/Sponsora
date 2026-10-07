import os
import re

for root, dirs, files in os.walk('main-app/app'):
    for file in files:
        if file.endswith('.tsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Remove onclick and onchange
            new_content = re.sub(r'\bonclick="[^"]*"', '', content, flags=re.IGNORECASE)
            new_content = re.sub(r'\bonchange="[^"]*"', '', new_content, flags=re.IGNORECASE)
            
            if content != new_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Fixed {filepath}')
