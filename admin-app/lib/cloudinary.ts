/**
 * Client-safe Cloudinary upload function using standard fetch.
 * Avoids importing the server-side Node.js SDK to prevent build errors.
 */
export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dkdbbcymv';
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'ml_default';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Cloudinary upload error response:', errorData);

      // Fallback: If custom preset is not found, retry with 'ml_default' (Cloudinary's standard default preset)
      if (uploadPreset !== 'ml_default' && errorData.error?.message?.includes('Upload preset')) {
        console.warn(`Upload preset '${uploadPreset}' not found. Retrying with 'ml_default'...`);
        const fallbackFormData = new FormData();
        fallbackFormData.append('file', file);
        fallbackFormData.append('upload_preset', 'ml_default');

        const fallbackResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: 'POST',
            body: fallbackFormData,
          }
        );

        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          return fallbackData.secure_url;
        }
      }
      throw new Error(errorData.error?.message || 'Cloudinary upload failed');
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error: any) {
    console.error('uploadToCloudinary error:', error);
    throw error;
  }
}

