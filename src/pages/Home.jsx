import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import ItemCard from '../components/ItemCard'

const Home = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false })

      console.log('Fetched data:', data)
      console.log('Error:', error)

      if (error) console.error('Error fetching items:', error)
      else setItems(data)
    }

    fetchItems()

    // Set up real-time subscription
    const channel = supabase
      .channel('home_items_channel')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'items'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            // Add new item to the beginning of the list
            setItems(prevItems => [payload.new, ...prevItems])
          } else if (payload.eventType === 'DELETE') {
            // Remove deleted item
            setItems(prevItems => prevItems.filter(item => item.id !== payload.old.id))
          } else if (payload.eventType === 'UPDATE') {
            // Update modified item
            setItems(prevItems =>
              prevItems.map(item =>
                item.id === payload.new.id ? payload.new : item
              )
            )
          }
        }
      )
      .subscribe()

    // Cleanup subscription on component unmount
    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // ✅ This return is the UI — outside of useEffect
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lost & Found Items</h1>
  
      <div className="grid gap-4 sm:grid-cols-2">
        {items?.length > 0 ? (
          items.map(item => (
            <ItemCard key={item.id} item={item} />
          ))
        ) : (
          <p className="text-gray-500">No items found.</p>
        )}
      </div>
    </div>
  )
}

export default Home