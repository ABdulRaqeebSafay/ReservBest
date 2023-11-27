import React, { useState } from 'react';
import MenuAddingForms from '../Routes/menuAddingForms';
import PopUp from '../Routes/popUp';

const ExtraMenuForms = () => {
  const handleSuccess = () => {
    console.log('Menu added successfully!');
  };

  const menuTypes = [
    'addExtraMenu',
    'addSpecialMenu',
    'addNormalMenu',
    'addMenuGradeOne',
    'addMenuGradeTwo',
    'addMenuGradeThree',
  ];

  const [selectedMenuType, setSelectedMenuType] = useState(null);

  return (
    <div style={{ display: 'flex' }}>
      <div className="w-25 text-white menusName" style={{ height: "75vh", background: "#c97f08",borderTopRightRadius:"20px",borderBottomRightRadius:"20px" }}>
        {menuTypes.map((menuType, index) => (
          <ul key={index}>
            <li
              className={`me-2 mt-5${selectedMenuType === menuType ? ' active' : ''}`}
              style={{
                listStyleType: 'none',
                cursor: 'pointer',
                backgroundColor: selectedMenuType === menuType ? 'white' : 'transparent',
                color: selectedMenuType === menuType ? '#c97f08' : 'inherit',
                padding: '10px',
                borderRadius: '5px',
              }}
              onClick={() => {
                setSelectedMenuType(menuType);
              }}
            >
              {menuType}
            </li>
          </ul>
        ))}
      </div>
      {selectedMenuType && (
        <div style={{ marginLeft: '20px' }}>
          <MenuAddingForms menuType={selectedMenuType} onSuccess={handleSuccess} />
        </div>
      )}
      {/* You can include the PopUp component here if needed */}
      {/* <PopUp /> */}
    </div>
  );
};

export default ExtraMenuForms;
