import { useState } from "react";

const PopUp = (props) => { 
    
  return (
    <>
      <div
        className={`${props.popUpStyle}
          ${props.emailMessageSent === "The Message Sent Successfully..!" && props.emailMessageSent === "Successful Registeration" && props.emailMessageSent === "Hotel Added Successfully" ?
          "bg-success text-light " : "text-light bg-danger"}
        `}
      >
        <p>{props.emailMessageSent}</p>
      </div>
    </>
  );
};

export default PopUp;
