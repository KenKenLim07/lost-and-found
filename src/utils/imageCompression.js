import imageCompression from "browser-image-compression";

const compressionOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  fileType: "image/jpeg",
};

export async function compressImage(imageFile) {
  try {
    const compressedFile = await imageCompression(imageFile, compressionOptions);
    return compressedFile;
  } catch (error) {
    console.error("Error compressing image:", error);
    throw error;
  }
}

export function getImagePreviewUrl(file) {
  return URL.createObjectURL(file);
}

export function revokeImagePreviewUrl(url) {
  URL.revokeObjectURL(url);
} 