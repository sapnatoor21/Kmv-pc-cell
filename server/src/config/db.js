import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/kmv_placement_cell');
    console.log(`[KMV Server] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[KMV Server] MongoDB Connection Error: ${error.message}`);
    // Don't kill process immediately if local dev testing without Mongo
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};
