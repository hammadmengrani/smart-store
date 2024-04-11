require("dotenv").config();
const mongoose = require('mongoose');
const Product = require('./model/product');

const data = [{
    "id": 10,
    "title": "Leather Wallet",
    "price": 45.99,
    "description": "Genuine leather wallet with multiple card slots and cash compartment.",
    "category": "Accessories",
    "image": "https://via.placeholder.com/300/?text=Wallet"
},
{
    "id": 11,
    "title": "Stylish Sunglasses",
    "price": 29.99,
    "description": "Trendy sunglasses with UV protection and polarized lenses.",
    "category": "Accessories",
    "image": "https://via.placeholder.com/300/?text=Sunglasses"
},
{
    "id": 12,
    "title": "Classic Wristwatch",
    "price": 79.99,
    "description": "Elegant stainless steel wristwatch with quartz movement. Water-resistant up to 50 meters.",
    "category": "Accessories",
    "image": "https://via.placeholder.com/300/?text=Wristwatch"
},
{
    "id": 13,
    "title": "Leather Belt",
    "price": 35.99,
    "description": "Premium quality leather belt with classic buckle. Available in various sizes and colors.",
    "category": "Accessories",
    "image": "https://via.placeholder.com/300/?text=Belt"
},
{
    "id": 14,
    "title": "Casual Sneakers",
    "price": 59.99,
    "description": "Comfortable and stylish sneakers suitable for everyday wear. Available in multiple colors.",
    "category": "Clothing",
    "image": "https://via.placeholder.com/300/?text=Sneakers"
},
{
    "id": 15,
    "title": "Denim Jacket",
    "price": 69.99,
    "description": "Classic denim jacket with button-up front and multiple pockets. Ideal for casual outings.",
    "category": "Clothing",
    "image": "https://via.placeholder.com/300/?text=Denim Jacket"
},
{
    "id": 16,
    "title": "Wireless Bluetooth Earbuds",
    "price": 49.99,
    "description": "True wireless earbuds with Bluetooth connectivity and long battery life. Includes charging case.",
    "category": "Technologies",
    "image": "https://via.placeholder.com/300/?text=Earbuds"
},
{
    "id": 17,
    "title": "Portable Power Bank",
    "price": 39.99,
    "description": "Compact power bank with fast charging capability. Suitable for charging smartphones and other devices on the go.",
    "category": "Technologies",
    "image": "https://via.placeholder.com/300/?text=Power Bank"
},
{
    "id": 18,
    "title": "Smart Fitness Tracker",
    "price": 89.99,
    "description": "Advanced fitness tracker with heart rate monitor GPS  and sleep tracking features. Water-resistant and compatible with smartphones.",
    "category": "Technologies",
    "image": "https://via.placeholder.com/300/?text=Fitness Tracker"
},
{
    "id": 19,
    "title": "Leather Laptop Bag",
    "price": 79.99,
    "description": "Stylish and functional laptop bag made of genuine leather. Features padded compartments for laptops and tablets.",
    "category": "Accessories",
    "image": "https://via.placeholder.com/300/?text=Laptop Bag"
},
{
    "id": 20,
    "title": "Formal Dress Shirt",
    "price": 49.99,
    "description": "Premium quality dress shirt suitable for formal occasions. Available in various sizes and colors.",
    "category": "Clothing",
    "image": "https://via.placeholder.com/300/?text=Dress Shirt"
},
{
    "id": 21,
    "title": "Wireless Charging Pad",
    "price": 29.99,
    "description": "Qi-certified wireless charging pad compatible with smartphones and other Qi-enabled devices.",
    "category": "Technologies",
    "image": "https://via.placeholder.com/300/?text=Charging Pad"
},
{
    "id": 22,
    "title": "Designer Scarf",
    "price": 34.99,
    "description": "Fashionable designer scarf made of high-quality materials. Perfect accessory for all seasons.",
    "category": "Accessories",
    "image": "https://via.placeholder.com/300/?text=Scarf"
},
{
    "id": 23,
    "title": "Smart Home Security Camera",
    "price": 129.99,
    "description": "HD security camera with motion detection and two-way audio. Works with smart home systems for remote monitoring.",
    "category": "Technologies",
    "image": "https://via.placeholder.com/300/?text=Security Camera"
},
{
    "id": 24,
    "title": "Leather Messenger Bag",
    "price": 89.99,
    "description": "Stylish leather messenger bag with adjustable shoulder strap and multiple compartments. Ideal for work or travel.",
    "category": "Accessories",
    "image": "https://via.placeholder.com/300/?text=Messenger Bag"
},
{
    "id": 25,
    "title": "Graphic Print T-Shirt",
    "price": 24.99,
    "description": "Casual cotton t-shirt featuring a unique graphic print design. Available in various sizes and colors.",
    "category": "Clothing",
    "image": "https://via.placeholder.com/300/?text=T-Shirt"
},
{
    "id": 26,
    "title": "Wireless Gaming Mouse",
    "price": 59.99,
    "description": "Ergonomic wireless gaming mouse with customizable RGB lighting and high-precision sensor.",
    "category": "Technologies",
    "image": "https://via.placeholder.com/300/?text=Gaming Mouse"
},
{
    "id": 27,
    "title": "Leather Passport Holder",
    "price": 29.99,
    "description": "Compact passport holder made of genuine leather. Features slots for cards and travel documents.",
    "category": "Accessories",
    "image": "https://via.placeholder.com/300/?text=Passport Holder"
},
{
    "id": 28,
    "title": "Fitness Smartwatch",
    "price": 109.99,
    "description": "Advanced smartwatch with fitness tracking GPS  and notifications. Water-resistant and stylish design.",
    "category": "Technologies",
    "image": "https://via.placeholder.com/300/?text=Smartwatch"
},
{
    "id": 29,
    "title": "Stylish Aviator Glasses",
    "price": 39.99,
    "description": "Classic aviator sunglasses with metal frame and mirrored lenses. Provides UV protection and timeless style.",
    "category": "Accessories",
    "image": "https://via.placeholder.com/300/?text=Aviator Glasses"
}];

(async () => {
    //mongoose
    mongoose.set('useFindAndModify', false);
    mongoose.set('useUnifiedTopology', true);
    await mongoose.connect("mongodb+srv://hammad:Hammad%40786@dev.izsnsgg.mongodb.net/smart_store?authSource=admin&replicaSet=atlas-9fcs15-shard-0&ssl=true", { useNewUrlParser: true });
    for(let i = 0; i < data.length; i++){
       try{
           const doc = await Product.create(data[i])
           console.log(doc);
       }catch(err){
        console.log(err);
       }
    }

})()