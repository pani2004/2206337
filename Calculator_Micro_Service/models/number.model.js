import mongoose from 'mongoose';
const numberSchema = new mongoose.Schema({
    numberid: 
    { type: String, 
      required: true 
    },
    value: { 
        type: Number, 
        required: true 
    },
    createdAt: { type: Date, default: Date.now },
});

const NumberModel = mongoose.model('Number', numberSchema);

export default NumberModel;
