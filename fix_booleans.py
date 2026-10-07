import os
import re

for root, dirs, files in os.walk('main-app/app'):
    for file in files:
        if file.endswith('.tsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Fix checked=""
            new_content = re.sub(r'checked=""', 'defaultChecked', content)
            
            # Fix required=""
            new_content = re.sub(r'required=""', 'required', new_content)
            
            # Fix readonly=""
            new_content = re.sub(r'readonly=""', 'readOnly', new_content, flags=re.IGNORECASE)
            
            # Fix selected=""
            new_content = re.sub(r'selected=""', 'defaultValue', new_content)
            
            # Fix multiple=""
            new_content = re.sub(r'multiple=""', 'multiple', new_content)
            
            # Fix autofocus=""
            new_content = re.sub(r'autofocus=""', 'autoFocus', new_content, flags=re.IGNORECASE)
            
            # Fix disabled="" (just in case I missed it)
            new_content = re.sub(r'disabled=""', 'disabled', new_content)

            if content != new_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Fixed {filepath}')
