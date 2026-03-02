const express = require('express');
const cors  = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoRoutes  = require('./Routes/todoRoutes')
const path = require("path");


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: '*', // frontend URL
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));
app.use(express.json());

app.use('/api/todos',todoRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});




mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Mongo DB connected successfully');
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`);
    })
})
.catch((err)=>console.log(err));
