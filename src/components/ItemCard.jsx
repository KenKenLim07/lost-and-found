import { useState, Suspense, lazy } from "react";
import ItemImage from './ItemImage';
import ItemInfoSection from './ItemInfoSection';
import ItemOwnerActions from './ItemOwnerActions';

// Lazy load the modals
const DeleteConfirmModal = lazy(() => import('./DeleteConfirmModal'));
const ReturnConfirmModal = lazy(() => import('./ReturnConfirmModal'));

// Loading fallback for modals
const ModalLoadingFallback = () => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
  </div>
);

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

  const handleConfirmDelete = () => {
    onDelete(item.id);
    setShowDeleteConfirm(false);
  };

  const handleReturnClick = () => {
    setShowReturnConfirm(true);
  };

  const handleConfirmReturn = () => {
    if (item.is_returned) {
      onToggleReturned(item.id, item.is_returned);
    } else {
      onToggleReturned(item.id, item.is_returned, returnedTo);
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

      {/* Modals with Suspense */}
      {showDeleteConfirm && (
        <Suspense fallback={<ModalLoadingFallback />}>
          <DeleteConfirmModal
            isOpen={showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
            onConfirm={handleConfirmDelete}
          />
        </Suspense>
      )}

      {showReturnConfirm && (
        <Suspense fallback={<ModalLoadingFallback />}>
          <ReturnConfirmModal
            isOpen={showReturnConfirm}
            onClose={() => setShowReturnConfirm(false)}
            onConfirm={handleConfirmReturn}
            question={getReturnQuestion()}
            returnedTo={returnedTo}
            onReturnedToChange={setReturnedTo}
            isReturned={item.is_returned}
          />
        </Suspense>
      )}
    </div>
  );
}