import mongoose from "mongoose";

const MONGODB_URI = process.env.DB_URL!;

if (!MONGODB_URI) throw new Error("Please define database URI in env file!!");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const options = {
      bufferCommands: true,
      maxPoolSize: 10,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then(() => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.error(error, "DB Error");
    cached.conn = null;
    throw error;
  }

  return cached.conn;
}
