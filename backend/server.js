const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = 'mongodb://root:password@localhost:27017/';

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('Successfully connected to MongoDB!');
    seedDatabase();
})
.catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
});


const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

app.get('/', (req, res) => {
    res.send('Hello, Restaurant! The backend is running and connected to DB!');
});

app.get('/api/menu', async (req, res) => {
    try {
        const items = await MenuItem.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching menu items', error: error });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running successfully on http://localhost:${PORT}`);
});

async function seedDatabase() {
    try {
        const count = await MenuItem.countDocuments();
        if (count === 0) {
            console.log('No menu items found. Seeding database...');
            const initialItems = [
                { name: 'Goulash Soup', price: 1800, category: 'Soup' },
                { name: 'Wiener Schnitzel', price: 3500, category: 'Main Course' },
                { name: 'Somloi Galuska', price: 1500, category: 'Dessert' },
                { name: 'Espresso', price: 600, category: 'Drink' },
            ];
            await MenuItem.insertMany(initialItems);
            console.log('Database seeded successfully!');
        } else {
            console.log('Database already contains data. No seeding needed.');
        }
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}