import  mongoose from 'mongoose';
import menuScheema from './menuScheema.js';

const SpecialMenu = mongoose.model('SpecialMenu',menuScheema );

export default SpecialMenu;