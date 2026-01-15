const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 🔥 STATIC IMAGES
app.use('/images', express.static('img'));
   
app.use('/api/products', productRoutes);

app.use('/api/auth', authRoutes);


app.use('/api/categories', categoryRoutes);


//const helmet = require('helmet');

// app.use(
//   helmet({
//     contentSecurityPolicy: false
//   })
// );


app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
