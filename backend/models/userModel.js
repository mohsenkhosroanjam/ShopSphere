import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,  
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDistributor: {
      type: Boolean,
      default: false,
    },
    distributorDetails: {
      businessName: { type: String, required: function() { return this.isDistributor; } },
      contactNumber: { type: String, required: function() { return this.isDistributor; } },
      city: { type: String, required: function() { return this.isDistributor; } },
      state: { type: String, required: function() { return this.isDistributor; } },
    },
    photoURL: {
      type: String, 
    },
    googleId: {
      type: String,
    },
    blogs:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
    }]
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
