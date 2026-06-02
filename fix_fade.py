
import os
directory = r"d:\Desktop\New folder\main-app\app\events"
subpages = ["tech", "cultural", "workshops", "seminars", "past"]

for subpage in subpages:
    filepath = os.path.join(directory, subpage, "page.tsx")
    if not os.path.exists(filepath):
        continue
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    content = content.replace("md:opacity-40 md:mix-blend-screen", "dark:opacity-60 opacity-90")
    content = content.replace("opacity-100 md:opacity-40 dark:opacity-60 opacity-90", "opacity-100 md:opacity-90 dark:opacity-60")
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

page_filepath = os.path.join(directory, "page.tsx")
if os.path.exists(page_filepath):
    with open(page_filepath, "r", encoding="utf-8") as f:
        content = f.read()
    # In events/page.tsx cards
    content = content.replace("mix-blend-normal md:mix-blend-screen", "dark:opacity-60 md:opacity-80")
    # In events/page.tsx overlay
    content = content.replace("mix-blend-screen", "")
    with open(page_filepath, "w", encoding="utf-8") as f:
        f.write(content)
print("Fade fix done")

