 const express=require('express');
 const app=express();
 const dotenv=require('dotenv');
 const path =require('path');
 const cors = require('cors')
 const connectDB=require('./config/connectDatabase');
 dotenv.config({path:path.join(__dirname,'config','config.env')})
const products= require('./Routes/product');
const orders=require('./Routes/order');
const auth= require('./Routes/auth');
const wishlistRoutes = require('./Routes/wishlist');
// mongodb+srv://Sakthivel:sakthi123@cluster0.pqbirgl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb+srv://Sakthivel:SAKthi@2002@cluster0.pqbirgl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// mongodb://localhost:27017/ecommerce
connectDB();
app.use(express.json());
app.use(cors());
app.use('/api/v1/',products);
app.use('/api/v1/',orders);
app.use('/api/v1/auth', auth);
app.use('/api/v1/wishlist', wishlistRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});