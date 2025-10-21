import mongoose from "mongoose";

let cached = global.mongoose || { conn: null, promise: null };

export default async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = await mongoose
      .connect(process.env.MONGODB_URI)
      .then((mongoose) => mongoose);
  }
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.error("Erroe connection to mongoDB :", error);
  }
  return cached.conn;
}

// import mongoose from "mongoose";

// let cached = global.mongoose || { conn: null, promise: null };

// export default async function connectDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     const uri = process.env.MONGODB_URI;

//     if (!uri) {
//       throw new Error("❌ MONGODB_URI is not defined in environment variables");
//     }

//     cached.promise = mongoose
//       .connect(uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//       .then((mongoose) => mongoose)
//       .catch((err) => {
//         console.error("❌ Failed to connect to MongoDB:", err.message);
//         throw err;
//       });
//   }

//   try {
//     cached.conn = await cached.promise;
//   } catch (error) {
//     console.error("❌ Error connecting to MongoDB:", error);
//   }

//   return cached.conn;
// }
