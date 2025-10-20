import React, { useState } from 'react';

function AddItemForm({ onItemAdded }) {
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    price: '',
    active: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.category || !newItem.price) return;

    try {
      const res = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newItem.name,
          category: newItem.category,
          price: parseFloat(newItem.price),
          active: newItem.active,
        }),
      });

      if (!res.ok) throw new Error('Failed to add item');
      const addedItem = await res.json();
      onItemAdded(addedItem);
      setNewItem({ name: '', category: '', price: '', active: true });
    } catch (err) {
      console.error(err);
      alert('Error adding item');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={newItem.category}
        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={newItem.price}
        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        required
      />
      <label>
        <input
          type="checkbox"
          checked={newItem.active}
          onChange={(e) => setNewItem({ ...newItem, active: e.target.checked })}
        />
        Active
      </label>
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddItemForm;
