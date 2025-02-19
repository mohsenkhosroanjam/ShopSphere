import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
        maxLength: 1000,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Blog",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

commentSchema.index({ blog: 1, createdAt: -1 });
commentSchema.index({ author: 1 });

export default mongoose.model("Comment", commentSchema); 