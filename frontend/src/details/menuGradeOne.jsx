import { useState, useEffect } from 'react';
import axios from 'axios';
import Hosts from './hosts';

const MenuGradeOne = ({ hotel_name }) => {
  const [menuGradeOne, setMenuGradeOne] = useState();
  const [preMealService, setPreMealService] = useState([]);
  const [meat, setMeat] = useState([]);
  const [rice, setRice] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [remnants, setRemnants] = useState([]);
  const [afterMealServices, setAfterMealServices] = useState([]);
  const [menuPrice, setMenuPrice] = useState();

  let selectedItem;
  const baseUrl = "http://localhost:5000";

  useEffect(() => {
    axios.get(`${baseUrl}/hotels/${hotel_name}/getMenuGradeOne`)
      .then((response) => {
        setMenuGradeOne(response.data);
        const desiredName = hotel_name;
        selectedItem = response.data.find((item) => item.hotelName === desiredName);
        if (selectedItem) {
          setPreMealService(selectedItem.preMealService);
          setMeat(selectedItem.meat);
          setRice(selectedItem.rice);
          setFruits(selectedItem.fruits);
          setDrinks(selectedItem.drinks);
          setRemnants(selectedItem.remnants);
          setAfterMealServices(selectedItem.afterMealServices);
          setMenuPrice(selectedItem.menuPrice);
        } else {
          return;
        }
      });
  }, []);

  let itemNumber = 1; // Initialize the item number
  const renderNumberedItem = (item) => {
    return (
      <ul className="list-unstyled" key={item}>
        <li className="">{itemNumber++ + "- "}{item}</li>
      </ul>
    );
  };

  return (
    <div className="booking-page mt-5">
      <Hosts menuPrice={menuPrice} />
      {menuGradeOne ? (
        <>
          <div className="ExtraSpecialMenu row">
            <div className="col">
              {/* Before Meal Services */}
              {preMealService.length > 0 && (
                <div className="before col align-items-center justify-content-center">
                  <h4>Before Meal Services</h4>
                  {preMealService.map(renderNumberedItem)}
                </div>
              )}

              {/* After Meal Services */}
              {afterMealServices.length > 0 && (
                <div className="Including mt-5">
                  <h4>After Meal Services</h4>
                  {afterMealServices.map(renderNumberedItem)}
                </div>
              )}
            </div>

            <div className="col">
              {(meat.length > 0 || rice.length > 0) && (
                <div className="Including">
                  <h4 className="text-center">Including Meal Services</h4>
                  {(meat.concat(rice)).map(renderNumberedItem)}
                </div>
              )}
            </div>

            <div className="col">
              {(drinks.length > 0 || fruits.length > 0 || remnants.length > 0) && (
                <div className="">
                  {([...rice, ...drinks, ...fruits, ...remnants]).map(renderNumberedItem)}
                </div>
              )}
            </div>
          </div>
        </>
      ) : ""}
    </div>
  );
};

export default MenuGradeOne;
