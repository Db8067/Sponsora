import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET || process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'No image URL provided' }, { status: 400 });
    }

    // Extract public_id from Cloudinary URL
    // Typical URL: https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg
    // or https://res.cloudinary.com/cloud_name/image/upload/v1234/folder/file.png
    
    // Split by /upload/
    const parts = url.split('/upload/');
    if (parts.length < 2) {
      return NextResponse.json({ error: 'Invalid Cloudinary URL' }, { status: 400 });
    }

    // parts[1] looks like: v1234/folder/file.png or folder/file.png
    const pathAfterUpload = parts[1];
    let publicIdWithExtension = pathAfterUpload;
    
    // Remove version (v1234/) if it exists
    if (publicIdWithExtension.match(/^v\d+\//)) {
      publicIdWithExtension = publicIdWithExtension.replace(/^v\d+\//, '');
    }

    // Remove the file extension
    const lastDotIndex = publicIdWithExtension.lastIndexOf('.');
    const publicId = lastDotIndex !== -1 ? publicIdWithExtension.substring(0, lastDotIndex) : publicIdWithExtension;

    console.log(`Attempting to delete Cloudinary image with public_id: ${publicId}`);

    const result = await cloudinary.uploader.destroy(publicId);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Cloudinary Deletion Error:', error);
    return NextResponse.json({ error: error.message || 'Deletion failed' }, { status: 500 });
  }
}
