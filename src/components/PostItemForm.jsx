import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";

export default function PostItemForm({ user, onItemPosted }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("lost");
  const [contactInfo, setContactInfo] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setProgress(0);

    try {
      let imageUrl = "";
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;

        const { data, error: uploadError } = await supabase.storage
          .from("item-images")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase
          .storage
          .from("item-images")
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      const { error: insertError } = await supabase.from("items").insert([
        {
          title,
          description,
          status,
          contact_info: contactInfo,
          image_url: imageUrl,
          created_at: new Date().toISOString(),
          user_id: user.id,
        },
      ]);

      if (insertError) throw insertError;

      setProgress(100);
      setTimeout(() => {
        resetForm();
        setSuccessMsg("Item posted successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
        if (onItemPosted) onItemPosted();
      }, 500);

    } catch (error) {
      console.error(error.message);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setStatus("lost");
    setContactInfo("");
    setImageFile(null);
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-gray-800">Post a Lost or Found Item</h2>

      {successMsg && (
        <motion.div
          className="bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {successMsg}
        </motion.div>
      )}

      <input
        type="text"
        placeholder="Item Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
        rows={4}
      />

      <div className="relative">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full appearance-none p-3 pr-10 border rounded-md focus:ring-2 focus:ring-blue-400"
        >
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <input
        type="text"
        placeholder="Contact Info (email or phone)"
        value={contactInfo}
        onChange={(e) => setContactInfo(e.target.value)}
        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-400"
      />

      {/* Custom File Upload */}
      <div className="w-full">
        <label htmlFor="image-upload" className="block w-full p-4 border-2 border-dashed rounded-md text-center cursor-pointer hover:border-blue-500 transition text-gray-500">
          {imageFile ? (
            <span className="text-gray-700 font-semibold">{imageFile.name}</span>
          ) : (
            <span>Click to upload an image</span>
          )}
        </label>
        <input
          id="image-upload"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />

        {imageFile && (
          <div className="mt-4 flex justify-center">
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md shadow"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-md transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Posting..." : "Post Item"}
      </button>

      {/* Loading Bar */}
      {loading && (
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mt-2">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
      )}
    </motion.form>
  );
}