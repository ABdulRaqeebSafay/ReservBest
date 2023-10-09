
import { useState, useEffect } from "react";
import jsPDF from "jspdf";

const Hosts = ({ hotel_name, menuPrice }) => {
  const [hostNumber, setHostNumber] = useState();
  const [totalAmount, setTotalAmount] = useState(0);

  const formattedTotal = isNaN(hostNumber)
    ? ""
    : (hostNumber * menuPrice).toLocaleString();

  useEffect(() => {
    // Calculate total amount with 7% charge
    const total = hostNumber * menuPrice;
    const charge = (total * 7) / 100;
    setTotalAmount(total + charge);
  }, [hostNumber, menuPrice]);

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text(`Total: ${formattedTotal} Afghani`, 10, 10);
    doc.text(`7% Charge: ${(totalAmount - (hostNumber * menuPrice)).toFixed(2).toLocaleUpperCase()} Afghani`, 10, 20);
    doc.save("reservation.pdf");
  };

  return (
    <>
      <div className="mt-5 px-5 sticky-top d-flex justify-content-between">
        <label htmlFor="" className="price my-3">
          {menuPrice} Afghani Per Person
        </label>
        <input
          type="number"
          onChange={(e) => setHostNumber(e.target.value)}
          className=""
          placeholder="Number of hosts e.g: 500"
        />
        <br />
        <h4 className="price">
          Total: {formattedTotal} {formattedTotal === "" ? "" : "Afghani"} 
        </h4>
        <button className="reserv" onClick={downloadPdf}>
          Reserve Now
        </button>
      </div>
    </>
  );
};

export default Hosts;
