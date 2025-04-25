import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ItemCard from "./ItemCard";
import FullScreenImageModal from "./FullScreenImageModal";
import SearchFilter from "./SearchFilter";

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

  const handleToggleReturned = async (itemId, isReturned) => {
    const currentDate = isReturned ? null : new Date().toISOString();

    const { error } = await supabase
      .from("items")
      .update({
        is_returned: !isReturned,
        date_returned: currentDate,
      })
      .eq("id", itemId);

    if (error) {
      console.error("Error updating return status:", error.message);
      alert("Could not update return status.");
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, is_returned: !isReturned, date_returned: currentDate }
          : item
      )
    );
  };

  // Modify filter logic to handle "returned" items separately
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "lost" && item.status === "lost" && !item.is_returned) ||
      (statusFilter === "found" && item.status === "found" && !item.is_returned) ||
      (statusFilter === "returned" && item.is_returned);

    return matchesSearch && matchesStatus;
  });

  if (loading) return <p className="text-center mt-8">Loading items...</p>;
  if (items.length === 0)
    return <p className="text-center mt-8">No items posted yet.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 mt-8 space-y-6">
      {/* Search and Filter */}
      <SearchFilter
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Grid of Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm sm:text-base">
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
              onToggleReturned={handleToggleReturned}
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
