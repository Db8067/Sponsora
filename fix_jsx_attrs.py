import os
import re

for root, dirs, files in os.walk('main-app/app'):
    for file in files:
        if file.endswith('.tsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Fix rows=
            new_content = re.sub(r'rows="(\d+)"', r'rows={\1}', content)
            
            # Fix tabindex
            new_content = re.sub(r'tabindex="([^"]+)"', r'tabIndex={\1}', new_content, flags=re.IGNORECASE)
            
            # Fix maxlength
            new_content = re.sub(r'maxlength="(\d+)"', r'maxLength={\1}', new_content, flags=re.IGNORECASE)

            # Fix colspan
            new_content = re.sub(r'colspan="(\d+)"', r'colSpan={\1}', new_content, flags=re.IGNORECASE)
            
            # Fix rowspan
            new_content = re.sub(r'rowspan="(\d+)"', r'rowSpan={\1}', new_content, flags=re.IGNORECASE)
            
            # Fix stroke-miterlimit
            new_content = re.sub(r'stroke-miterlimit="(\d+)"', r'strokeMiterlimit="\1"', new_content, flags=re.IGNORECASE)
            
            # Fix xml:space
            new_content = re.sub(r'xml:space="([^"]+)"', r'xmlSpace="\1"', new_content, flags=re.IGNORECASE)
            
            # Any remaining class="
            new_content = re.sub(r'\bclass="', r'className="', new_content)
            
            if content != new_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f'Fixed {filepath}')
