import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
  const { _id } = useParams();
  const [userData, setUserData] = useState({}); // State to hold user data
  const [userName,setUserName] = useState();
  const [userPhone,setUserPhone] = useState();
  const [userEmail,setUserEmail] = useState();
  
  useEffect(() => {
    // Fetch user data using the _id from the URL
    axios.get(`http://localhost:5000/user/${_id}`)
      .then((response) => {
        // Update the userData state with the retrieved data
        setUserName(response.data.body.userName)
        setUserPhone(response.data.body.userPhone)
        setUserEmail(response.data.body.userEmail)
        // setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [_id]);

  return (
    <div className="userDashboard" style={{paddingTop:'140px'}}>
      <h1>User Dashboard</h1>
      
      <p>User Name: {userName}</p>
      <p>User Phone: {userPhone}</p>
      <p>User Email: {userEmail}</p>
    </div>
  );
};

export default UserDashboard;
