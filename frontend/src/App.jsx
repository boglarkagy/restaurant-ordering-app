import React, { useState, useEffect } from 'react';

function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/menu')
      .then(response => response.json()) 
      .then(data => {
        setMenuItems(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching menu:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading menu...</p>;
  }

  return (
    <div>
      <h1>Restaurant Menu</h1>
      {menuItems.map(item => (
        <div key={item.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
          <h2>{item.name}</h2>
          <p>Category: {item.category}</p>
          <p>Price: {item.price} Ft</p>
        </div>
      ))}
    </div>
  );
}

export default App;