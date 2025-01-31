import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";
import axios from "axios";

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { user, setUser} = useContext(userDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      console.log('no token found')
      navigate("/login");
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }).then(response => {
      if (response.status === 200) {
          setUser(response.data)
          setIsLoading(false)
      }
  })
      .catch(err => {
          console.log(err)
          localStorage.removeItem('token')
          navigate('/login')
      })
  }, [token]); // Dependencies for useEffect

  if(isLoading){
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
    {children}
    </>
  );
};

export default UserProtectWrapper;
