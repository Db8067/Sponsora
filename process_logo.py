import sys
from PIL import Image

def process_image(input_path, output_light_path, output_dark_path):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    light_data = []
    dark_data = []
    
    for item in data:
        # Check if the pixel is white-ish (background)
        # item is (R, G, B, A)
        if item[0] > 230 and item[1] > 230 and item[2] > 230:
            # Make transparent
            light_data.append((255, 255, 255, 0))
            dark_data.append((255, 255, 255, 0))
        else:
            # Keep original for light logo
            light_data.append(item)
            # Make white for dark logo
            dark_data.append((255, 255, 255, item[3]))
            
    img_light = Image.new("RGBA", img.size)
    img_light.putdata(light_data)
    img_light.save(output_light_path, "PNG")
    
    img_dark = Image.new("RGBA", img.size)
    img_dark.putdata(dark_data)
    img_dark.save(output_dark_path, "PNG")
    print("Logos generated successfully.")

if __name__ == "__main__":
    input_img = sys.argv[1]
    process_image(input_img, "logo-light.png", "logo-dark.png")
