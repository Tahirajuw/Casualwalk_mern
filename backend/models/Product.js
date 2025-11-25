// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: {
    type: String,
    required: true,
    enum: ["Running", "Casual", "Sports", "Formal", "Sneakers", "Boots","Lifestyle"],
  },
  brand: { type: String, required: true },
  sizes: [
    {
      size: Number,
      stock: { type: Number, default: 0, min: 0 },
    },
  ],
  colors: [String],
  images: [String],
  rating: { type: Number, default: 0, min: 0, max: 5 },
  numReviews: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
