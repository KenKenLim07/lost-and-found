import { useRef } from 'react';
import './index.css';
import PostItemForm from "./components/PostItemForm";
import ItemList from "./components/ItemList";
import AuthForm from "./components/AuthForm";
import NavBar from "./components/NavBar";
import { useUser } from "./hooks/useUser";
import { supabase } from "./lib/supabase";

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

      <div className="p-6">
        <PostItemForm user={user} onItemPosted={() => itemListRef.current?.refresh()} />
        <ItemList ref={itemListRef} />
      </div>
    </div>
  );
}

export default App;