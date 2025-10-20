import React, { useEffect, useState } from 'react';
import AddItemForm from './AddItemForm';

function ItemsList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch('http://localhost:5000/api/items');
    const data = await res.json();
    setItems(data);
  };

  const handleItemAdded = (newItem) => {
    setItems([...items, newItem]);
  };

  return (
    <div>
      <h2>🍽️ Menu</h2>
      <AddItemForm onItemAdded={handleItemAdded} />
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} – ${item.price} ({item.category})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemsList;
