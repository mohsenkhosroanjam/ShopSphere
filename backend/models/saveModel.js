import mongoose from "mongoose";

const savedArticleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    }
}, { timestamps: true });

const SavedArticle = mongoose.model('SavedArticle', savedArticleSchema);

export default SavedArticle;