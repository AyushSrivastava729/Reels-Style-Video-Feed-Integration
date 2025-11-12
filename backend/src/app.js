// create server
const express = require('express');
const cookieParser=require('cookie-parser')
const authRoutes=require('./routes/auth.routes');
const foodRoutes=require('./routes/food.routes');
const foodPartnerRoutes=require('./routes/food-partner.routes');
const cors=require('cors');

// create instance of the server
const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
}));
// cookie-parser is being used as a middleware
app.use(cookieParser());
app.use(express.json());

app.get("/",(req,res)=>{
  res.send("hello World");
})

// after creating the routes here we are using the routes
app.use('/api/auth',authRoutes);
app.use('/api/food',foodRoutes);
app.use('/api/food-partner',foodPartnerRoutes);

module.exports=app;
