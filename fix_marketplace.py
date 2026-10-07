import os
path = 'main-app/app/brand-marketplace/page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('return (\n    <>\n      <div', 'return (\n    <>\n      <Snowfall />\n      <div className="relative z-10" ')
with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
