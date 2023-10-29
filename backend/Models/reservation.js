import mongoose from 'mongoose'

const reservationScheema = new mongoose.Schema({
   userId:{
    type:String,
    required:true
   },
   userName:{
    type:String,
    required:true
   },
    userEmail:{
        type:String,
        required:true
    },
    hotelName: {
      type: String,
      required: true,
    },
    reservedDate:{
      type:Date,
      required:true
    },

    reservedStatus:{
        type:String,
        requierd:true
    },
    
    reservedMenu:{
        type:String,
        requierd:true
    },
    reservedGuestsAmount:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    }
    
    
  });
  const reservationModel = mongoose.model('Reservation Details', reservationScheema);


export default reservationModel;