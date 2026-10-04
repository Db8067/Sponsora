import sys
from PIL import Image

def crop_to_content(file_path):
    img = Image.open(file_path).convert("RGBA")
    
    # getbbox() finds the bounding box of the non-zero regions in the image.
    # We might need to split the alpha channel if the image is entirely transparent or if rgb are non-zero.
    # We can get the alpha channel.
    alpha = img.split()[-1]
    bbox = alpha.getbbox()
    
    if bbox:
        img_cropped = img.crop(bbox)
        img_cropped.save(file_path, "PNG")
        print(f"Cropped {file_path} successfully to {bbox}.")
    else:
        print(f"Could not crop {file_path}, no content found.")

if __name__ == "__main__":
    crop_to_content("main-app/public/images/logo-light.png")
    crop_to_content("main-app/public/images/logo-dark.png")
    crop_to_content("admin-app/public/images/logo-light.png")
    crop_to_content("admin-app/public/images/logo-dark.png")
