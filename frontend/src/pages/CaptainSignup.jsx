import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor,setVehicleColor] =useState('')
  const [vehicleNumberPlate,setVehicleNumberPlate] =useState('')
  const [vehicleType,setVehicleType] =useState('')
  const [vehicleCapacity,setVehicleCapacity] =useState('')
  const {captain, setCaptain}=useContext(CaptainDataContext)



  const submitHandler = async (e) => {
    e.preventDefault();

    const CaptainData={
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        numberPlate: vehicleNumberPlate,
        vehicleType: vehicleType,
        capacity: vehicleCapacity
      }
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,CaptainData)
    // console.log(response)
    if(response.status===200){
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token',data.token)
        navigate('/captain-home')
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor('')
    setVehicleNumberPlate('')
    setVehicleType('')
    setVehicleCapacity('')

  };

  return (
    <div>
      <div className="px-5 py-5 h-screen flex flex-col justify-between">
        <div>
          <img
            className="w-16 mb-3"
            src="https://www.svgrepo.com/show/505031/uber-driver.svg"
            alt="Uber Logo"
          />
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            className="flex flex-col space-y-4"
          >
            <h3 className="text-lg w-full font-medium ">Captain's name?</h3>
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
            <h3 className="text-lg font-medium mb-2">Captain's email?</h3>

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

            <h3 className="text-lg mb-2 font-medium ">Vehicle Information?</h3>
            <div className="flex gap-4 mb-6">
            <input
                required
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                className="bg-[#eeeeee] rounded border px-4 py-2 w-1/2 text-lg placeholder:text-base"
                type="text"
                placeholder="Vehicle's Color"
              />
              <input
                required
                value={vehicleNumberPlate}
                onChange={(e) => setVehicleNumberPlate(e.target.value)}
                className="bg-[#eeeeee] rounded border px-4 py-2 w-1/2 text-lg placeholder:text-base"
                type="text"
                placeholder="Vehicle's Number Plate"
              />
            </div>

            <div className="flex gap-4 mb-6">
            <input
                required
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                className="bg-[#eeeeee] rounded border px-4 py-2 w-1/2 text-lg placeholder:text-base"
                type="number"
                placeholder="Vehicle's Capacity"
              />

              <select
                required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="bg-[#eeeeee] rounded border px-4 py-2 w-1/2 text-lg placeholder:text-base">
                <option value="disabled">Select Vehicle Type</option>
                <option value="car">Car</option>.
                <option value="motorcycle">Motorcycle</option>
                <option value="auto"> Auto</option>
                </select>
            </div>

            <button className="bg-[#111] text-white font-semibold mb-3 rounded  px-4 py-2 w-full">
              Sign Up
            </button>
          </form>

          <p className="text-center">
            Already have an account?
            <Link to="/captain-login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>

        <div>
          <p className="text-[10px] leading-tight">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google's Privacy and Policy</span> and{" "}
            <span className="underline">Terms of Service apply.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
