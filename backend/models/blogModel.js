import mongoose from "mongoose";

// create a blog model

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    slug: {
        type: String,
        unique: true,
    },
    excerpt: {
        type: String,
        maxLength: 200,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    likeCount: {
        type: Number,
        default: 0
    }
});

// Create a slug before saving
blogSchema.pre('save', function(next) {
    this.slug = this.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
    next();
});

// Add indexes
blogSchema.index({ slug: 1 });
blogSchema.index({ author: 1 });
blogSchema.index({ category: 1 });

export default mongoose.model("Blog", blogSchema);