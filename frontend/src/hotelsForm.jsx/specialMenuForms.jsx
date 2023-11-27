// ExtraMenuForm.jsx
import axios from 'axios';
import { useState } from 'react';

const SpecialMenuForm = ({ menuOption }) => {
  const [hotelName, setHotelName] = useState('');
  const [hotelLocation, setHotelLocation] = useState('');
  const [hotelDescription, setHotelDescription] = useState('');
  const [hotelImage, setHotelImage] = useState(null);
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
    setMenuData({
      ...menuData,
      [menuItem]: [value],
    });
  };

  const addExtraMenuDetails = () => {
    const formData = new FormData();
    formData.append('hotelName', hotelName);
    formData.append('hotelLocation', hotelLocation);
    formData.append('hotelDescription', hotelDescription);
    formData.append('hotelImage', hotelImage);
    formData.append('menuPrice', menuPrice);

    Object.keys(menuData).forEach((menuItem) => {
      formData.append(menuItem, menuData[menuItem][0]);
    });

    axios.post(`${baseUrl}/add${menuOption}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err.message));
  };
  
  const addHotel = () => {
    const formData = new FormData();
    formData.append('hotelName', hotelName);
    formData.append('hotelLocation', hotelLocation);
    formData.append('hotelDescription', hotelDescription);
    formData.append('hotelImage', hotelImage); // Replace yourFileObject with the actual file object
  
    axios.post(
      `${baseUrl}/addHotel`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
      .then((response) => console.log("Hotel added successfully", response.data))
      .catch((err) => console.log(err.message));
  };
  return (
    <>
        <h4 style={{color:"#c97f08"}}>Add Your Hotels Main Details</h4>
    <input
        type="text"
        id="hotelName"
        onChange={(e) => setHotelName(e.target.value)}
        name="hotelName"
      />
    <input type="text" name="hotelLocation" placeholder="add your hotel Location" onChange={(e) =>setHotelLocation(e.target.value)} />

    <input type="text" name="hotelDescription" placeholder="add your hotel description" onChange={(e) =>setHotelDescription(e.target.value)}/>
    <input type="file" onChange={(e) =>setHotelImage(e.target.files[0])} />
    <button className="button" onClick={addHotel}>Add Hotel</button>

      <hr />

      <label htmlFor="hotelName">Add Your Hotel Name:</label>
      <input
        type="text"
        id="hotelName"
        onChange={(e) => setHotelName(e.target.value)}
        name="hotelName"
      />

      {Object.keys(menuData).map((menuItem) => (
        <div key={menuItem}>
          <label htmlFor={menuItem}>Add {menuItem}:</label>
          <input
            type="text"
            id={menuItem}
            onChange={(e) => handleInputChange(menuItem, e.target.value)}
            name={menuItem}
          />
        </div>
      ))}

      <label htmlFor="menuPrice">Add MenuPrice :</label>
      <input
        type="text"
        id="menuPrice"
        onChange={(e) => setMenuPrice(e.target.value)
        name="menuPrice"
      />j

      <button onClick={addExtraMenuDetails}>Add Menu</button>
    </>
  );
};

export default SpecialMenuForm;
