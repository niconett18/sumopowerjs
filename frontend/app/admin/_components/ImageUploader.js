'use client';
import { useState, useRef } from 'react';
import { adminUploadImages } from '../../../lib/admin-api';

function getToken() {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('admin_token') ?? '';
}

export default function ImageUploader({ images = [], onChange }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [dragOver, setDragOver] = useState(false);

  async function handleFiles(files) {
    const validFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (!validFiles.length) return;
    setUploading(true);
    setUploadError('');
    try {
      const uploaded = await adminUploadImages(getToken(), validFiles);
      const next = [
        ...images,
        ...uploaded.map((u, i) => ({ url: u.url, width: u.width, height: u.height, order: images.length + i })),
      ];
      onChange(next);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  }

  function removeImage(index) {
    onChange(images.filter((_, i) => i !== index).map((img, i) => ({ ...img, order: i })));
  }

  return (
    <div className="space-y-4">
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative group">
              <img
                src={img.url}
                alt=""
                className="w-20 h-20 object-contain bg-gray-50 rounded-xl border border-gray-200"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity leading-none"
                aria-label="Remove image"
              >
                ×
              </button>
              {i === 0 && (
                <span className="absolute bottom-1 left-1 bg-amber-500 text-white text-[9px] font-bold px-1 rounded leading-tight">
                  MAIN
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
          dragOver
            ? 'border-amber-400 bg-amber-50'
            : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'
        }`}
        onClick={() => !uploading && fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
      >
        {uploading ? (
          <div className="flex items-center justify-center gap-2 text-amber-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-500"></div>
            <span className="text-sm font-medium">Uploading to Cloudinary…</span>
          </div>
        ) : (
          <>
            <i className="fas fa-cloud-upload-alt text-3xl text-gray-200 mb-2 block"></i>
            <p className="text-sm font-medium text-gray-600">Click or drag to upload</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP · Multiple files OK</p>
          </>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {uploadError && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {uploadError}
        </p>
      )}
    </div>
  );
}
