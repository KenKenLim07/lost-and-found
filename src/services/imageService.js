import { supabase } from "../lib/supabase";
import { compressImage } from "../utils/imageCompression";

export const uploadImage = async (imageFile, onProgress) => {
  if (!imageFile) return "";

  try {
    onProgress?.(10);
    const compressedImage = await compressImage(imageFile);
    
    onProgress?.(30);
    const fileExt = compressedImage.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    
    onProgress?.(50);
    const { data, error } = await supabase.storage
      .from("item-images")
      .upload(fileName, compressedImage);

    if (error) {
      throw new Error("Image upload failed: " + error.message);
    }

    onProgress?.(80);
    const { data: { publicUrl } } = supabase.storage
      .from("item-images")
      .getPublicUrl(fileName);
    
    onProgress?.(100);
    return publicUrl;
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
}; 