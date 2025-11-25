// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import { sampleProducts } from "./sampleData.js";
console.log("MONGODB_URI =", process.env.MONGODB_URI);

dotenv.config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected!");

    await Product.deleteMany();
    console.log("Old products deleted.");

    await Product.insertMany(sampleProducts);
    console.log("Sample products added!");

    process.exit();
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seedDatabase();
