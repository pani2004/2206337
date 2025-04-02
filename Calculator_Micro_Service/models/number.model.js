import mongoose from 'mongoose';

const numberSchema = new mongoose.Schema({
    numberid: String,
    value: Number,
}, { timestamps: true });

export default mongoose.model('Number', numberSchema);

