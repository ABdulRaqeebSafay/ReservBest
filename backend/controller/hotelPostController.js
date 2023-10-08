import hotelModel from "../Models/hotels.js";
import ExtraMenu from "../Models/extraMenu.js";
import SpecialMenu from '../Models/specialMenu.js'
import NormalMenu from "../Models/normalMenu.js";
import MenuGrade1 from '../Models/menuGrade1.js';
import MenuGrade2 from '../Models/menuGrade2.js';
import MenuGrade3 from '../Models/menuGrade3.js';
import User from "../Models/userScheema.js";
import emailVerifier from 'email-verify';


// const emailVerifier = new EmailVerifier();
class HotelPostController {
  
  static async register(req, res) {
    const { userName, userPhone, userEmail, userPassword } = req.body;
  
    // Verify if the email address is valid
    emailVerifier.verify(userEmail, async (err, info) => {
      if (err) {
        return res.status(500).send("An error occurred while verifying the email");
      }
      if (!info.success) {
        // If the email is not valid, send an error response
        return res.send("The email is not valid");
      }
  
      // Check if the email is already registered
      const existingUser = await User.findOne({ userEmail });
  
      if (existingUser) {
        // If the email is already registered, send an error response
        return res.send("The email is already registered");
      }
  
      // If the email is valid and not registered, create a new user
      try {
        const newUser = await User.create({
          userName,
          userPhone,
          userEmail,
          userPassword,
        });
        res.status(201).send(newUser);
        console.log(newUser);
      } catch (error) {
        // Handle any errors that occur during user creation
        console.error(error);
        return res.status(500).send("An error occurred while creating the user");
      }
    });
  }
  

  static async addHotels(req, res) {
    try {
        const { hotelName, hotelLocation, hotelDescription } = req.body;

        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Convert the uploaded image to base64
        // Convert the uploaded image to base64
          const imageBase64 = req.file.buffer.toString('base64');


        const newHotel = new hotelModel({
            hotelName,
            hotelLocation,
            hotelDescription,
            hotelImage: imageBase64,
        });

        const savedHotel = await newHotel.save();
        res.status(201).json(savedHotel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

 
 
  
  static async login(req, res) {
 
      const { userEmail, userPassword } = req.body;
      await User.findOne({ userEmail })
      .then(user =>{
          if(user){
            if(user.userPassword === userPassword){
              res.send("success")
              
            }
            else{
               res.send("password is incorrect")

            }
          }
          else{
            res.send("email is not exist")
          }       
      })
  
  }
  
  
  static async addExtraMenu(req, res) {

    try {
      const{hotelName, preMealService, meat,rice,drinks,fruits,remnants,additionals, afterMealServices} = req.body; // Destructure preMealService correctly
      const addExtraMeal = await ExtraMenu.create({hotelName, preMealService, meat,rice,drinks,fruits,remnants,additionals, afterMealServices});
      res.send(addExtraMeal);
      console.log(addExtraMeal);
    } catch (error) {
      console.error("Error saving to-do item:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  
  static async addSpecialMenu(req, res) {
    try {
      const {hotelName, preMealService, meat,rice,drinks,fruits,remnants,additionals, afterMealServices} = req.body; // Destructure preMealService correctly
      const addSpcialMeal = await SpecialMenu.create({hotelName, preMealService, meat,rice,drinks,fruits,remnants,additionals, afterMealServices});
      res.send(addSpcialMeal);
      console.log(addSpcialMeal);
    } catch (error) {
      console.error("Error saving to-do item:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  
  static async addNormalMenu(req, res) {
    try {
      const {hotelName, preMealService, meat,rice,drinks,fruits,remnants,additionals, afterMealServices} = req.body; // Destructure preMealService correctly
      const addNormalMeal = await NormalMenu.create({hotelName, preMealService, meat,rice,drinks,fruits,remnants,additionals, afterMealServices});
      res.send(addNormalMeal);
      console.log(addNormalMeal);
    } catch (error) { 
      console.error("Error saving to-do item:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  static async addMenuGradeTwo(req, res) {
    try {
      const {hotelName, preMealService, meat,rice,drinks,fruits,remnants,additionals, afterMealServices} = req.body; // Destructure preMealService correctly
      const addMenuGradeTwo = await MenuGrade2.create( {hotelName, preMealService, meat,rice,drinks,fruits,remnants,additionals, afterMealServices});
      res.send(addMenuGradeTwo);
      console.log(addMenuGradeTwo);
    } catch (error) {
      console.error("Error saving to-do item:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  static async addMenuGradeOne(req, res) {
    try {
      const {hotelName, preMealService, meat,rice,drinks,fruites,remnants,additionals, afterMealServices} = req.body; // Destructure preMealService correctly
      const addMenuGradeOne = await MenuGrade1.create( {hotelName, preMealService, meat,rice,drinks,fruites,remnants,additionals, afterMealServices});
      res.send(addMenuGradeOne);
      console.log(addMenuGradeOne);
    } catch (error) {
      console.error("Error saving to-do item:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  static async addMenuGradeThree(req, res) {
    try {
      const {hotelName, preMealService, meat,rice,drinks,fruits,remnants,additionals, afterMealServices} = req.body; // Destructure preMealService correctly
      const addMenuGradeThree = await MenuGrade3.create( {hotelName, preMealService, meat,rice,drinks,fruits,remnants,additionals, afterMealServices});
      res.send(addMenuGradeThree);
      console.log(addMenuGradeThree);
    } catch (error) {
      console.error("Error saving to-do item:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export default HotelPostController;
