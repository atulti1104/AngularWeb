const express = require('express');
const cors = require('cors');

const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 🔥 STATIC IMAGES
app.use('/images', express.static('img'));

app.use('/api/products', productRoutes);


app.use('/images', express.static('img'));
app.use('/api/categories', categoryRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
