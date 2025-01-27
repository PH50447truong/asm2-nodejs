import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 5,
            max: 200,
        },
        image: {
            type: String,
            required: true,
            min: 5,
            max: 200,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        description: {
            type: String,
        },
        category: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
)
const productModel = mongoose.model("Product", productSchema)

export default productModel;