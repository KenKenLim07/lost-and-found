import { useState } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";
export default function PostItemForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("lost");
  const [contactInfo, setContactInfo] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let imageUrl = "";
    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from("item-images")
        .upload(fileName, imageFile);

      if (error) {
        alert("Image upload failed");
        console.error(error.message);
        setLoading(false);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("item-images").getPublicUrl(fileName);
      imageUrl = publicUrl;
    }

    const { error: insertError } = await supabase.from("items").insert([
      {
        title,
        description,
        status,
        contact_info: contactInfo,
        image_url: imageUrl,
        created_at: new Date().toISOString(), // explicitly include timestamp
      },
    ]);

    if (insertError) {
      alert("Failed to post item");
      console.error(insertError.message);
    } else {

      setTitle("");
      setDescription("");
      setStatus("lost");
      setContactInfo("");
      setImageFile(null);
      setSuccessMsg("Item posted successfully!");
      setTimeout(() => setSuccessMsg(""), 3000); // hide after 3s
    }

    setLoading(false);
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-semibold">Post a Lost or Found Item</h2>

      {successMsg && (
        <motion.div
          className="bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm"
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
        className="w-full p-2 border rounded-md"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded-md"
        rows={4}
      />

      <div className="relative">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full appearance-none p-2 pr-10 border rounded-md"
        >
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-600">
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
        className="w-full p-2 border rounded-md"
      />

      <input
        type="file"
        onChange={(e) => setImageFile(e.target.files[0])}
        accept="image/*"
        className="w-full"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        disabled={loading}
      >
        {loading ? "Posting..." : "Post Item"}
      </button>
    </motion.form>
  );
}
