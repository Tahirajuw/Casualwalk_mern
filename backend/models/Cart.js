// models/Cart.js
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  size: { type: Number, required: true },
  color: { type: String, required: true },
  quantity: { type: Number, default: 1, min: 1 }
});

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: [cartItemSchema],
    updatedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart; // ✅ ES Module export
