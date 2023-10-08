import mongoose from 'mongoose';
import menuScheema from './menuScheema.js';


const NormalMenu = mongoose.model("NormalMenu", menuScheema)

export default NormalMenu;