import mongoose from 'mongoose';

const menuScheema = new mongoose.Schema({
  hotelName: {
    type:String,
    required: true,
  },
  menuPrice:{
    type:Number,
    required:true
  },
  preMealService: {
      type: Array,
      required: true,
  },
 
    meat: {
      type: Array,
      required: true,
    },
    rice: {
      type: Array,
      required: true,
    },
    drinks: {
      type: Array,
      required: true,
    },
    fruits: {
      type: Array,
      required: true,
    },
    remnants: {
      type: Array, // Corrected the property name from 'types' to 'type'
      required: true,
    },
    additionals: {
      type: Array,
      required: false, 
    }
  ,

    afterMealServices: {
      type: Array,
      required: true,
    
  },
});



export default menuScheema;
