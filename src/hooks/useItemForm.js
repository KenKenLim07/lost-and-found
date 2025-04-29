import { useState } from "react";
import { supabase } from "../lib/supabase";
import { uploadImage } from "../services/imageService";

const validateForm = (formData) => {
  const errors = {};

  if (!formData.title.trim()) {
    errors.title = "Title is required";
  }

  if (!formData.description.trim()) {
    errors.description = "Description is required";
  }

  if (!formData.contactInfo.trim()) {
    errors.contactInfo = "Contact information is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactInfo) && 
             !/^\+?[\d\s-]{10,}$/.test(formData.contactInfo)) {
    errors.contactInfo = "Please enter a valid email or phone number";
  }

  if (formData.imageFile && formData.imageFile.size > 5 * 1024 * 1024) {
    errors.imageFile = "Image size must be less than 5MB";
  }

  return errors;
};

export const useItemForm = (user, onItemPosted) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "lost",
    contactInfo: "",
    imageFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "lost",
      contactInfo: "",
      imageFile: null,
    });
    setUploadProgress(0);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Validate form
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    try {
      const imageUrl = await uploadImage(formData.imageFile, setUploadProgress);

      const { error: insertError } = await supabase.from("items").insert([
        {
          title: formData.title.trim(),
          description: formData.description.trim(),
          status: formData.status,
          contact_info: formData.contactInfo.trim(),
          image_url: imageUrl,
          created_at: new Date().toISOString(),
          user_id: user.id,
        },
      ]);

      if (insertError) {
        throw new Error("Failed to post item: " + insertError.message);
      }

      setSuccessMsg("Item posted successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
      
      resetForm();
      onItemPosted?.();
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    successMsg,
    errorMsg,
    uploadProgress,
    errors,
    handleInputChange,
    handleSubmit,
  };
}; 