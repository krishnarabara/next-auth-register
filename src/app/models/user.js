// import mongoose from "mongoose";

// const { Schema } = mongoose;

// const userSchema = new Schema(
//   {
//     email: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: false,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("User", userSchema);

// userModel.js

// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema(
//   {
//     email: {
//       type: String,
//       unique: true,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: false,
//     },
//   },
//   { timestamps: true }
// );

// const User = mongoose.model('User', userSchema);

// export default User;


const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: 'Please supply a name',
            trim: true
        },
        password: {
                  type: String,
                  required: true,
                },
    
    },
);

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;