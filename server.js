import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';



import mongoose from 'mongoose';
const DB='mongodb+srv://roni:rohit123@cluster0.ds1jl9v.mongodb.net/Ecommerce?retryWrites=true&w=majority'
mongoose.connect(DB).then(()=>{
     console.log('MongoDB connected successful');
}).catch((err)=>{
      console.log('MongoDB not  connected');
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./client/build')));

dotenv.config();
const PORT = process.env.PORT || 8080;

app.use('/api/v1/auth',authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);




// app.get('/',(req,res)=>{
//     res.send('welcome into good world')
// });

app.use("*",function(req,res){
     res.sendFile(path.join(__dirname,"./client/build/index.html"));
})



app.listen(PORT,()=>{
     console.log(`server is running on PORT : ${PORT} `);
});