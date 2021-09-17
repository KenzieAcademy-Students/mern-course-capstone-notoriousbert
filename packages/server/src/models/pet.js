import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const petSchema = new mongoose.Schema({
    type: {
        type: String,
        required: false,
    },
})

const Pet = mongoose.model('Pet', petSchema)

export default Pet;
