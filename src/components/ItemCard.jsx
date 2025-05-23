import { useState } from "react";
import ItemImage from './ItemImage';
import ItemInfoSection from './ItemInfoSection';
import ItemOwnerActions from './ItemOwnerActions';
import DeleteConfirmModal from './DeleteConfirmModal';
import ReturnConfirmModal from './ReturnConfirmModal';

export default function ItemCard({
  item,
  onDelete,
  onImageClick,
  isOwner,
  onToggleReturned,
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showReturnConfirm, setShowReturnConfirm] = useState(false);
  const [returnedTo, setReturnedTo] = useState("");

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await onDelete(item.id);
      // Lazy load the modal after successful deletion
      import('./DeleteConfirmModal');
    } catch (error) {
      console.error('Delete operation failed:', error);
    }
    setShowDeleteConfirm(false);
  };

  const handleReturnClick = () => {
    setShowReturnConfirm(true);
  };

  const handleConfirmReturn = async () => {
    try {
      if (item.is_returned) {
        await onToggleReturned(item.id, item.is_returned);
      } else {
        await onToggleReturned(item.id, item.is_returned, returnedTo);
      }
      // Lazy load the modal after successful return operation
      import('./ReturnConfirmModal');
    } catch (error) {
      console.error('Return operation failed:', error);
    }
    setShowReturnConfirm(false);
    setReturnedTo("");
  };

  const getReturnQuestion = () => {
    return item.status === "found" 
      ? "Who did you return this item to?" 
      : "Who returned this item to you?";
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 ease-in-out animate-fadeIn flex flex-col h-full relative">
      <ItemImage
        imageUrl={item.image_url}
        title={item.title}
        onImageClick={onImageClick}
      />

      <h3 className="-mt-1 border border-gray-300 rounded-2xl text-lg font-semibold text-center text-black inline-block py-2 px-4 bg-blue-200 shadow-md">
        {item.title}
      </h3>

      <ItemInfoSection item={item} />

      {isOwner && (
        <ItemOwnerActions
          isReturned={item.is_returned}
          onReturnClick={handleReturnClick}
          onDeleteClick={handleDeleteClick}
        />
      )}

      {/* Modals */}
      {showDeleteConfirm && (
        <DeleteConfirmModal
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {showReturnConfirm && (
        <ReturnConfirmModal
          isOpen={showReturnConfirm}
          onClose={() => setShowReturnConfirm(false)}
          onConfirm={handleConfirmReturn}
          question={getReturnQuestion()}
          returnedTo={returnedTo}
          onReturnedToChange={setReturnedTo}
          isReturned={item.is_returned}
        />
      )}
    </div>
  );
}