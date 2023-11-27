// ExtraMenuForm.jsx
import axios from 'axios';
import { useState } from 'react';

const MenuAddingForms = ({ menuType,onSuccess }) => {
  const [hotelName, setHotelName] = useState('');
  const [menuPrice, setMenuPrice] = useState();
  const [menuData, setMenuData] = useState({
    preMealService: [],
    meat: [],
    rice: [],
    drinks: [],
    fruits: [],
    remnants: [],
    additionals: [],
    afterMealServices: [],
  });

  let baseUrl = "http://localhost:5000";

  const handleInputChange = (menuItem, value) => {
    setMenuData(prevMenuData => ({
      ...prevMenuData,
      [menuItem]: [value],
    }));
  };
  
  const addCurrentMenuDetails = () => {
    try{
      
        axios.post(`${baseUrl}/${menuType}`, {
        hotelName:hotelName,
        menuPrice:menuPrice,
        preMealService:menuData.preMealService,
        meat:menuData.meat,
        rice:menuData.rice,
        drinks:menuData.drinks,
        fruits:menuData.fruits,
        remnants:menuData.remnants,
        afterMealServices:menuData.afterMealServices,
        })
          .then((response) =>{
            if (onSuccess) {
                onSuccess();
              }
              console.log(response.data)
          })
          .catch((err) => console.log(err.message));
      
    }
    catch(err){
      console.log(err);
    } 
   
  };
  
  

  return (
    <>
    <div  className="row ms-5">
    <div className="col-md-6">
      <label htmlFor={hotelName}>Add HotelNale:</label>
      <input
        type="text"
        className="menuForms"
        id="hotelName"
        onChange={(e) => setHotelName(e.target.value)}
        name="hotelName"
      />
    </div>
    <div className="col-md-6">
      <label htmlFor="menuPrice">Add MenuPrice :</label>
      <input
        type="text" 
        id="menuPrice"
        className="menuForms"

        onChange={(e) => setMenuPrice(e.target.value)}
        name="menuPrice"
      />
    </div>
    </div>
    {/* <div className="row">
   
      
      </div> */}
    {Object.keys(menuData).slice(0, 4).map((menuItem, index) => (
  <div key={menuItem} className="row ms-5">
    <div className="col-md-6">
      <label htmlFor={menuItem}>Add {menuItem}:</label>
      <input
        type="text"
        className="menuForms"
        id={menuItem}
        onChange={(e) => handleInputChange(menuItem, e.target.value)}
        name={menuItem}
      />
    </div>
    <div className="col-md-6">
      <label htmlFor={menuItem}>Add another {menuItem}:</label>
      <input
        type="text"
        className="menuForms "
        id={menuItem}
        onChange={(e) => handleInputChange(menuItem, e.target.value)}
        name={menuItem}
      />
    </div>
  </div>
))}



      <button className="button btn " style={{width:"200px",margin:"30px" ,backgroundColor:"#c97f08"}} onClick={addCurrentMenuDetails}>Add Menu</button>
    </>
  );
};

export default  MenuAddingForms;