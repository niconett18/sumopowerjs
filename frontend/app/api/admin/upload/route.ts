import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '../../../../lib/admin-auth';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Convert buffer to base64 Data URI
    const mimeType = file.type || 'image/jpeg';
    const base64Data = buffer.toString('base64');
    const fileUri = `data:${mimeType};base64,${base64Data}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(fileUri, {
      folder: 'sumopower/products',
    });
    
    // Return the Cloudinary secure URL
    return NextResponse.json({ url: result.secure_url });
    
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return NextResponse.json({ error: 'Failed to upload image to Cloudinary' }, { status: 500 });
  }
}
