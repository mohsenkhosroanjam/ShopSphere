import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema;

//changed few required
const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true
        //changed required to false

    },
    brand: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        // required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        // required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        // required: true,
        default: 0
    },
}, {timestamps: true})

const Product = mongoose.model('Product', productSchema);

export default Product;