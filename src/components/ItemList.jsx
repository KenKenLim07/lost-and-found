import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { supabase } from "../lib/supabase";
import ItemCard from "./ItemCard";
import SearchFilter from "./SearchFilter";
import { Suspense, lazy } from "react";

// Lazy load the modal
const FullScreenImageModal = lazy(() => import("./FullScreenImageModal"));

// Loading fallback for the modal
const ModalLoadingFallback = () => (
  <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
  </div>
);

const ItemList = forwardRef((props, ref) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [userId, setUserId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchItems = async () => {
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
  };

  // Expose the refresh function to parent components
  useImperativeHandle(ref, () => ({
    refresh: fetchItems
  }));

  useEffect(() => {
    fetchItems();

    // Set up real-time subscription
    const channel = supabase
      .channel('items_channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'items'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setItems(prevItems => [payload.new, ...prevItems]);
          } else if (payload.eventType === 'DELETE') {
            setItems(prevItems => prevItems.filter(item => item.id !== payload.old.id));
          } else if (payload.eventType === 'UPDATE') {
            setItems(prevItems =>
              prevItems.map(item =>
                item.id === payload.new.id ? payload.new : item
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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

  const handleToggleReturned = async (itemId, isReturned, returnedTo = null) => {
    const currentDate = isReturned ? null : new Date().toISOString();

    const { error } = await supabase
      .from("items")
      .update({
        is_returned: !isReturned,
        date_returned: currentDate,
        returned_to: returnedTo
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
          ? { ...item, is_returned: !isReturned, date_returned: currentDate, returned_to: returnedTo }
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm sm:text-base auto-rows-fr">
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

      {/* Fullscreen Image Modal with Suspense */}
      {selectedImage && (
        <Suspense fallback={<ModalLoadingFallback />}>
      <FullScreenImageModal
        imageUrl={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
        </Suspense>
      )}
    </div>
  );
});

export default ItemList;