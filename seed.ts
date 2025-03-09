// filepath: /Users/fortuneoguibe/Desktop/Dashboard app/thynance-solutions/seed.ts
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // Load .env.local file
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import User from "./src/models/User"; // Adjust path if needed
import dbConnect from "./dbConnect";

const seedUsers = async () => {
  await dbConnect();

  // Clear existing users to avoid duplicates (optional)
  await User.deleteMany({});

  const hashedPassword = await bcrypt.hash("password123", 10); // Encrypt password

  const users = [
    { name: "Startup User", email: "startup@example.com", password: hashedPassword, role: "startup" },
    { name: "SME User", email: "sme@example.com", password: hashedPassword, role: "sme" },
    { name: "Enterprise User", email: "enterprise@example.com", password: hashedPassword, role: "enterprise" },
  ];

  await User.insertMany(users);
  console.log("Dummy users inserted!");

  mongoose.connection.close(); // Close connection after inserting
};

seedUsers().catch(console.error);