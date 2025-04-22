import PostItemForm from "./components/PostItemForm";
import ItemList from "./components/ItemList";
import './index.css'; // or './styles.css', depending on what you named it
function App() {
  return (
    <div className="min-h-screen  p-6">
      <PostItemForm />
      <ItemList /> {/* Feed here */}
    </div>
  );
}

export default App;