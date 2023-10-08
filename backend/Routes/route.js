import HotelPostController from '../controller/hotelPostController.js'
import HotelGetController from '../controller/hotelGetController.js'
import express from 'express';
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({storage});
const router = express.Router();


// ALL GET REQUESTS

router.get('/hotels', HotelGetController.getHotels);
router.get('/hotels/:hotel_name/getExtraMenu', HotelGetController.getExtraMenus);
router.get('/hotels/:hotel_name/getSpecialMenu', HotelGetController.getSpecialMenus);
router.get('/hotels/:hotel_name/getNormalMenu', HotelGetController.getNormalMenus);
router.get('/hotels/:hotel_name/getMenuGradeOne', HotelGetController.getMenuGradeOne);
router.get('/hotels/:hotel_name/getMenuGradeTwo', HotelGetController.getMenuGradeTwo);
router.get('/hotels/:hotel_name/getMenuGradeThree', HotelGetController.getMenuGradeThree);

// ALL POST REQUESTS

// Correct route definition

router.post('/addHotel', upload.single("hotelImage"), HotelPostController.addHotels);


router.post('/addExtraMenu', HotelPostController.addExtraMenu);
router.post('/addSpecialMenu', HotelPostController.addSpecialMenu);
router.post('/addNormalMenu', HotelPostController.addNormalMenu);
router.post('/addMenuGradeOne', HotelPostController.addMenuGradeOne);
router.post('/addMenuGradeTwo', HotelPostController.addMenuGradeTwo);
router.post('/addMenuGradeThree', HotelPostController.addMenuGradeThree);

// REGISTER AND SIGNIN ROUTES

router.post('/signup',HotelPostController.register)
router.post('/login',HotelPostController.login)



export default router;