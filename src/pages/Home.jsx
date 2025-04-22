import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'


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