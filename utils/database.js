// utils/database.js
import mongoose from 'mongoose';
import User from '@models/user'; // Učitajte modele
import Prompt from '@models/prompt';
import Comment from '@models/comment';

mongoose.set('strictPopulate', false);
let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    throw new Error('Failed to connect to MongoDB');
  }
};