import os
import re

for root, dirs, files in os.walk('main-app/app'):
    for file in files:
        if file.endswith('.tsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Find elements with multiple classNames
            new_content = re.sub(r'className="([^"]+)"\s+className="([^"]+)"', r'className="\1 \2"', content)
            
            if content != new_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Fixed {filepath}')
