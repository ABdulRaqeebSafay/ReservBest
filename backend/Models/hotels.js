import mongoose from 'mongoose'

const hotelSchema = new mongoose.Schema({
  
    hotelName: {
      type: String,
      required: true,
    },
    hotelLocation: {
      type: String,
      required: true,
    },
    hotelDescription: {
      type: String,
      required: true,
    },
    hotelImage: {
      type: String, // Store base64-encoded image data as a string
  },
  });
  const hotelModel = mongoose.model('Hotels', hotelSchema);


export default hotelModel;