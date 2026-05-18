import { v2 as cloudinary } from 'cloudinary';
import { env } from '../env';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export interface UploadResult {
  url: string;
  width: number;
  height: number;
}

export function uploadBuffer(buffer: Buffer, folder = 'sumopower/products'): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder, resource_type: 'image', quality: 'auto', fetch_format: 'auto' },
        (err, result) => {
          if (err || !result) return reject(err ?? new Error('Cloudinary upload failed'));
          resolve({ url: result.secure_url, width: result.width, height: result.height });
        }
      )
      .end(buffer);
  });
}

export async function uploadFromUrl(url: string, folder = 'sumopower/products'): Promise<UploadResult> {
  const result = await cloudinary.uploader.upload(url, {
    folder,
    resource_type: 'image',
    quality: 'auto',
    fetch_format: 'auto',
  });
  return { url: result.secure_url, width: result.width, height: result.height };
}
