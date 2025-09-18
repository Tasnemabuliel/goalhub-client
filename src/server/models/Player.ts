import mongoose from 'mongoose'

const playerSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  position:  { type: String, required: true },
  age:       { type: Number, required: true },
  joinedAt:  { type: Date, default: Date.now }
})

export default mongoose.model('Player', playerSchema)
