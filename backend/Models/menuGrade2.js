import mongoose from 'mongoose';
import menuScheema from './menuScheema.js';


const MenuGrade2 = mongoose.model("menuGrade2", menuScheema)

export default MenuGrade2;