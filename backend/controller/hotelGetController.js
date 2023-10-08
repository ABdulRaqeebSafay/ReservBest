import hotelModel from '../Models/hotels.js'
import ExtraMenu from '../Models/extraMenu.js';
import SpecialMenu from '../Models/specialMenu.js';
import NormalMenu from '../Models/normalMenu.js';
import MenuGrade1 from '../Models/menuGrade1.js';
import MenuGrade2 from '../Models/menuGrade2.js';
import MenuGrade3 from '../Models/menuGrade3.js';

class HotelGetController{
static async getHotels(req, res) {
    try {
      const hotels = await hotelModel.find();
      res.json(hotels);
      
    } catch (error) {
      console.error("Error getting to-do items:", error);
      res.status(500).send("Internal Server Error");
    }
  }
static async getExtraMenus(req, res) {
    try {

      const extraMenu = await ExtraMenu.find({});
      res.json(extraMenu);
      
    } catch (error) {
      console.error("Error getting to-do items:", error);
      res.status(500).send("Internal Server Error");
    }
  } 
  static async getSpecialMenus(req, res) {
    try {
      const specialMenu = await SpecialMenu.find({});
      res.json(specialMenu);
      
    } catch (error) {
      console.error("Error getting to-do items:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  static async getNormalMenus(req, res) {
    try {
  
      const normalMenu = await NormalMenu.find({});
      res.json(normalMenu);
      
    } catch (error) {
      console.error("Error getting to-do items:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  static async getMenuGradeOne(req, res) {
    try {
  
      const menuGrade1 = await MenuGrade1.find({});
      res.json(menuGrade1);
      
    } catch (error) {
      console.error("Error getting to-do items:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  static async getMenuGradeTwo(req, res) {
    try {
  
      const menuGrade2 = await MenuGrade2.find({});
      res.json(menuGrade2);
      
    } catch (error) {
      console.error("Error getting to-do items:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  static async getMenuGradeThree(req, res) {
    try {
  
      const menuGrade3 = await MenuGrade3.find({});
      res.json(menuGrade3);
      
    } catch (error) {
      console.error("Error getting to-do items:", error);
      res.status(500).send("Internal Server Error");
    }
  }





}

  export default HotelGetController;