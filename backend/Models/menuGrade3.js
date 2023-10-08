import mongoose from 'mongoose';
import menuScheema from './menuScheema.js';


const MenuGrade3 = mongoose.model("menuGrade3", menuScheema)

export default MenuGrade3;