import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import  { userDataContext } from "../context/UserContext";

const UserSignup = () => {
  const[email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [userData, setUserData] = useState({});


  const navigate = useNavigate();

  const {user,setUser}= useContext(userDataContext)

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser={
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email, 
      password: password,
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser)
    
    if(response.status==201){
      const data = response.data;
      setUser(data.user)
      localStorage.setItem('token',data.token)
      navigate('/home')

    }


    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img
            className="w-16 mb-10"
            src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png"
            alt="Uber Logo"
          />
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            className="flex flex-col space-y-4"
          >
            <h3 className="text-lg w-1/2 font-medium ">User's name?</h3>
            <div className="flex gap-4 mb-6">
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-[#eeeeee] rounded border px-4 py-2 w-1/2 text-lg placeholder:text-base"
                type="text"
                placeholder="First name"
              />

              <input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-[#eeeeee] rounded border px-4 py-2 w-1/2 text-lg placeholder:text-base"
                type="text"
                placeholder="Last name"
              />
            </div>
            <h3 className="text-lg font-medium mb-2">User's email?</h3>

            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#eeeeee] mb-6 rounded border px-4 py-2 w-full text-lg placeholder:text-base"
              type="email"
              placeholder="email@example.com"
            />

            <h3 className="text-lg font-medium mb-2"> Enter Password</h3>

            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#eeeeee] mb-6 rounded border px-4 py-2 w-full text-lg placeholder:text-base"
              type="password"
              placeholder="password"
            />

            <button className="bg-[#111] text-white font-semibold mb-3 rounded  px-4 py-2 w-full">
              Create account
            </button>
          </form>

          <p className="text-center">
            Already have an account?
            <Link to="/login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>

        <div>
          <p className="text-[10px] leading-tight">
            By proceeding, you consent to get calls, whatsapp or SMS messages,
            including by automated means, from Uber and its affiliates to the
            number provided.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
