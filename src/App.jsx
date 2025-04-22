import './index.css';
import PostItemForm from "./components/PostItemForm";
import ItemList from "./components/ItemList";
import AuthForm from "./components/AuthForm";
import { useUser } from "./hooks/useUser";
import { supabase } from "./lib/supabase";

function App() {
  const user = useUser();

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
    <div className="min-h-screen p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Lost & Found</h1>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Sign Out
        </button>
      </div>

      <PostItemForm user={user} />
      <ItemList />
    </div>
  );
}

export default App;
