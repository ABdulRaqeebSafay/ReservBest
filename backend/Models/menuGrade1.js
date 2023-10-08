import mongoose from 'mongoose';
import menuScheema from './menuScheema.js';


const MenuGrade1 = mongoose.model("menuGrade1", menuScheema)

export default MenuGrade1;