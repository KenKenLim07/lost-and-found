import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";
import ItemCard from "./ItemCard";
import FullScreenImageModal from "./FullScreenImageModal";

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [userId, setUserId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) setUserId(user.id);

      const { data, error } = await supabase
        .from("items")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching items:", error.message);
      else setItems(data);

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
  if (items.length === 0)
    return <p className="text-center mt-8">No items posted yet.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 mt-8 space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl shadow">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-md"
        />

        {/* Custom Dropdown Filter */}
<div className="relative w-40">
  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="w-full appearance-none p-2 pr-10 border border-gray-300 rounded-md"
  >
    <option value="all">All</option>
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

      </div>

      {/* Grid of Items */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm sm:text-base">
        {filteredItems.length === 0 ? (
          <p className="text-center col-span-full">No items match your filters.</p>
        ) : (
          filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              isOwner={item.user_id === userId}
              onDelete={handleDelete}
              onImageClick={setSelectedImage}
            />
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
