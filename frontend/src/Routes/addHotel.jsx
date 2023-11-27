// AddHotel.jsx
import { useState } from 'react';
import ExtraMenuForm from '../hotelsForm.jsx/ExtraMenuForms';

const AddHotel = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleMenuChange = (event) => {
    setSelectedMenu(event.target.value);
  };

  const renderForm = () => {
    switch (selectedMenu) {
      case 'addExtraMenu':
        return <ExtraMenuForm menuOption="ExtraMenu" />;
      
      case 'addSpecialMenu':
        return <ExtraMenuForm menuOption="SpecialMenu" />;
      
      case 'addNormalMenu':
        return <ExtraMenuForm menuOption="NormalMenu" />;
      
      case 'addMenuGradeOne':
        return <ExtraMenuForm menuOption="MenuGradeOne" />;
      
      case 'addMenuGradeTwo':
        return <ExtraMenuForm menuOption="MenuGradeTwo" />;
      
      case 'addMenuGradeThree':
        return <ExtraMenuForm menuOption="MenuGradeThree" />;
      
      
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Add Hotel</h1>
      <label htmlFor="menuSelect">Select Menu:</label>
      <select id="menuSelect" onChange={handleMenuChange}>
        <option value="">Select an option</option>
        <option value="addExtraMenu">Add Extra Menu</option>
        <option value="addSpecialMenu">Add Special Menu</option>
        <option value="addNormalMenu">Add Normal Menu</option>
        <option value="addMenuGradeOne">Add Menu Grade One</option>
        <option value="addMenuGradeTwo">Add Menu Grade Two</option>
        <option value="addMenuGradeThree">Add Menu Grade Three</option>
        
      </select>

      {selectedMenu && (
        <div>
          {renderForm()}
        </div>
      )}
    </div>
  );
};

export default AddHotel;
