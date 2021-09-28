import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const petSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: false,
    }
})

const Pet = mongoose.model('Pet', petSchema)

export default Pet;
