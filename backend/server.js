const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); 
app.use(express.json());

const PORT = 3001;

const menuItems = [
  { id: 1, name: 'Goulash Soup', price: 1800, category: 'Soup' },
  { id: 2, name: 'Wiener Schnitzel', price: 3500, category: 'Main Course' },
  { id: 3, name: 'Somloi Galuska', price: 1500, category: 'Dessert' },
  { id: 4, name: 'Espresso', price: 600, category: 'Drink' },
];


app.get('/', (req, res) => {
  res.send('Hello, Restaurant! The backend is running!');
});

app.get('/api/menu', (req, res) => {
  res.json(menuItems);
});

app.listen(PORT, () => {
  console.log(`Server is running successfully on http://localhost:${PORT}`);
});