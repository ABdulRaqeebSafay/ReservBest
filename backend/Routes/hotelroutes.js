import express from "express"
import hotelModel from "../Models/hotels";

const router = express.Router();


router.get('/hotels', async (req, res) => {
    try {
      const hotels = await hotelModel.find(); 
      res.json(hotels); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  export default router;