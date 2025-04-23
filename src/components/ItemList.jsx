import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";
import FullScreenImageModal from "./FullScreenImageModal"; // adjust path if needed

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [userId, setUserId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // for modal

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserId(user.id);
      }

      // Fetch items
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching items:", error.message);
      } else {
        setItems(data);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  const handleDelete = async (itemId) => {
    const { error } = await supabase.from("items").delete().eq("id", itemId);

    if (error) {
      alert("Failed to delete item.");
      console.error(error.message);
    } else {
      setItems((prev) => prev.filter((item) => item.id !== itemId));
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) return <p className="text-center mt-8">Loading items...</p>;
  if (items.length === 0) return <p className="text-center mt-8">No items posted yet.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 mt-8 space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl shadow">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-md"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="all">All</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>

      {/* Grid of Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm sm:text-base">
        {filteredItems.length === 0 ? (
          <p className="text-center col-span-full">No items match your filters.</p>
        ) : (
          filteredItems.map((item) => (
            <motion.div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow-md relative"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-lg mb-3 cursor-pointer"
                  onClick={() => setSelectedImage(item.image_url)}
                />
              )}
              <h3 className="text-lg font-semibold break-words border-2 border-yellow-700 rounded-2xl text-center mb-4">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-1">Status: {item.status.toUpperCase()}</p>
              <p className="text-sm mb-2 break-words text-gray-600">Description: {item.description}</p>
              <p className="text-xs text-gray-600">Contact: {item.contact_info}</p>
              <p className="text-xs text-gray-400 mt-1">
                Posted on {new Date(item.created_at).toLocaleString()}
              </p>

              {userId === item.user_id && (
                <button
                  onClick={() => handleDelete(item.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs border px-2 py-1 border-red-300 rounded-md bg-white"
                >
                  Delete
                </button>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Fullscreen Image Modal */}
      <FullScreenImageModal
        imageUrl={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}
