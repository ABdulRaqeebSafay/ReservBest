import mongoose from 'mongoose';
import menuScheema from './menuScheema.js';


const ExtraMenu = mongoose.model("ExtraMenu", menuScheema)

export default ExtraMenu;