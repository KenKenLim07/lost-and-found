import { useRef, Suspense, lazy } from 'react';
import './index.css';
import PostItemForm from "./components/PostItemForm";
import ItemList from "./components/ItemList";
import AuthForm from "./components/AuthForm";
import NavBar from "./components/NavBar";
import { useUser } from "./hooks/useUser";
import { supabase } from "./lib/supabase";

// Lazy load components that are not immediately needed
const FullScreenImageModal = lazy(() => import("./components/FullScreenImageModal"));
const AboutModal = lazy(() => import("./components/AboutModal"));
const DeleteConfirmModal = lazy(() => import("./components/DeleteConfirmModal"));
const ReturnConfirmModal = lazy(() => import("./components/ReturnConfirmModal"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  const user = useUser();
  const itemListRef = useRef();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <AuthForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <NavBar onSignOut={handleSignOut} />

      <div className="p-2">
        <PostItemForm user={user} onItemPosted={() => itemListRef.current?.refresh()} />
        <ItemList ref={itemListRef} />
      </div>

      {/* Wrap lazy-loaded components in Suspense */}
      <Suspense fallback={<LoadingFallback />}>
        <FullScreenImageModal />
        <AboutModal />
        <DeleteConfirmModal />
        <ReturnConfirmModal />
      </Suspense>
    </div>
  );
}

export default App;