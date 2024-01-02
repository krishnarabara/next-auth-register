// import mongoose from "mongoose";

// const connect = async () => {
//   if (mongoose.connections[0].readyState) return;

//   try {
//     await mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Mongo Connection successfully established.");
//   } catch (error) {
//     throw new Error("Error connecting to Mongoose");
//   }
// };


// export default connect;

import mongoose from 'mongoose';

const url = process.env.NEXT_PUBLIC_MONGO_URL;

const connect = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

export default connect;