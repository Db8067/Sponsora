import re

def fix_jsx(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find <img ...> that doesn't end with />
    content = re.sub(r'<img([^>]*?)(?<!/)>', r'<img\1/>', content)
    # Find <input ...> that doesn't end with />
    content = re.sub(r'<input([^>]*?)(?<!/)>', r'<input\1/>', content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

fix_jsx('main-app/app/brand-marketplace/page.tsx')
fix_jsx('main-app/app/creators/page.tsx')
