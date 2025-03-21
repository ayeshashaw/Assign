const express=require('express');
const mongoose=require('mongoose');

const app=express();
app.use(express.json());
const categoryModel=require("./models/category.model")
const productModel=require("./models/product.model.js")
app.post("/add-category",async(req,res)=>{
    const category=await categoryModel.create(req.body);
    res.status(201).json(catgeory);
});

app.post("/add-product",async(req,res)=>{
    const product=await productModel.create(req.body);
    res.status(201).json(product);
})

app.get("/products",async(req,res)=>{
    const products=await productModel.find().populate("category","name")
    res.send(product);
})

mongoose.connect("mongodb://localhost:27017/ProductsDb")
.then(()=>{
    console.log("connected to DB");
    const PORT=4000;
    app.listen(PORT,()=>{
        console.log(`Server is connected to PORT:${PORT}`)
    })
})
.catch(()=>{
    console.log("Connection to DB failed")
})
