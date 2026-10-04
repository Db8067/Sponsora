import os
import re

directory = r"d:\Desktop\New folder\main-app\app\events"
subpages = ["tech", "cultural", "workshops", "seminars", "past"]

for subpage in subpages:
    filepath = os.path.join(directory, subpage, "page.tsx")
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Replace Hero Section
    # We will use regex to find the Hero Section block.
    # It starts with `<div className="relative w-full h-[250px]` and ends just before `<!-- Event Listings -->`
    hero_pattern = re.compile(
        r"""<div className="relative w-full h-\[250px\] md:h-\[300px\] rounded-\[2rem\] overflow-hidden mb-12 border border-white/10 glass shadow-2xl">(.*?)</div>\s*(?:{/\* Event Listings \*/}|<div className="flex items-center justify-between mb-8">)""",
        re.DOTALL
    )

    def hero_replacement(match):
        inner = match.group(1)
        # Extract bg image, icon, color badge classes, title, description
        bg_match = re.search(r"url\('(/images/.*?_doodle\.png)'\)", inner)
        bg_image = bg_match.group(1) if bg_match else ""
        
        # Extract badge container
        badge_match = re.search(r"""<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(.*?)/(.*?) text-(.*?) text-sm font-bold w-fit mb-4 border border-(.*?)/(.*?)">(.*?)</div>""", inner, re.DOTALL)
        if badge_match:
            bg_color, bg_op, text_color, border_color, border_op, badge_content = badge_match.groups()
            # If text_color is just text-white, let's make it text-{color}-600 on light
            # We want badge_color to be blue-500 etc. text-blue-400
            badge_html = f"""<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-{bg_color}/10 dark:bg-{bg_color}/20 text-{text_color} text-sm font-bold w-fit mb-4 border border-{border_color}/20">{badge_content}</div>"""
        else:
            badge_html = ""
            
        title_match = re.search(r"""<h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">(.*?)</h1>""", inner)
        title = title_match.group(1) if title_match else ""
        
        desc_match = re.search(r"""<p className="text-white/70 max-w-xl text-lg font-medium">\s*(.*?)\s*</p>""", inner, re.DOTALL)
        desc = desc_match.group(1) if desc_match else ""

        new_hero = f"""<div className="flex flex-col md:block relative w-full rounded-[2rem] md:h-[300px] md:overflow-hidden mb-12 md:border md:border-white/10 md:glass md:shadow-2xl">
            <div className="w-full h-[150px] md:absolute md:inset-0 md:h-full rounded-[2rem] md:rounded-none overflow-hidden relative">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-100 md:opacity-40 md:mix-blend-screen"
                style={{{{ backgroundImage: "url('{bg_image}')" }}}}
              />
              <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            </div>
            
            <div className="relative z-10 flex flex-col justify-center mt-6 md:mt-0 p-0 md:p-12 md:h-full">
              {badge_html}
              <h1 className="text-4xl md:text-5xl font-black text-foreground md:text-white mb-4 tracking-tight">{title}</h1>
              <p className="hidden md:block text-foreground/70 md:text-white/70 max-w-xl text-lg font-medium">
                {desc}
              </p>
            </div>
          </div>"""
        
        next_tag = "{/* Event Listings */}" if "{/* Event Listings */}" in match.group(0) else '<div className="flex items-center justify-between mb-8">'
        return new_hero + "\n\n          " + next_tag

    content = hero_pattern.sub(hero_replacement, content)

    # 2. Replace Grid Cards
    grid_pattern = re.compile(
        r"""<div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-20">(.*?)</div>\s*</main>""",
        re.DOTALL
    )
    
    def grid_replacement(match):
        inner = match.group(1)
        # Extract map array name
        map_match = re.search(r"""{(.*?)\.map\(\(event\) => \(""", inner)
        map_array = map_match.group(1) if map_match else "mockEvents"

        color_match = re.search(r"""hover:border-(.*?)/50 hover:shadow-2xl hover:shadow-(.*?)/10""", inner)
        color = color_match.group(1) if color_match else "primary"
        color2 = color_match.group(2) if color_match else "primary"

        new_grid = f"""<div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-20">
            {{{map_array}.map((event) => (
              <div key={{event.id}} className="group relative bg-white dark:bg-[#1A1A1D] border border-black/5 dark:border-white/10 rounded-2xl md:rounded-3xl overflow-hidden hover:border-{color}/50 dark:hover:border-{color}/50 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-row md:flex-col">
                <div className="w-16 sm:w-20 md:w-full h-auto min-h-[80px] md:h-48 relative overflow-hidden shrink-0">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{{{ backgroundImage: `url(`${{event.image}}`)` }}}}
                  />
                </div>
                <div className="p-3 md:p-6 flex flex-col flex-1 justify-center overflow-hidden">
                  <h3 className="text-[13px] sm:text-sm md:text-xl font-bold text-foreground mb-1 md:mb-3 line-clamp-2 leading-tight">{{event.title}}</h3>
                  <div className="flex flex-col gap-1 md:gap-2">
                    <div className="flex items-center gap-1.5 text-foreground/60 text-[10px] sm:text-[11px] md:text-sm">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4 shrink-0" /> <span className="truncate">{{event.date}}</span>
                    </div>
                  </div>
                  <button className="hidden md:block w-full mt-6 py-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-{color} hover:text-white text-foreground font-semibold border border-black/10 dark:border-white/10 hover:border-{color} transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}}
          </div>\n        </main>"""
        return new_grid

    content = grid_pattern.sub(grid_replacement, content)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
print("Done")
