import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {
  const navigate = useNavigate()
  // console.log(props.ride._id)
  // console.log(props.ride)
  async function endRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{
      rideId: props.rideData._id
    },{
      headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    // console.log(props.ride._id)
    if(response.status===200){
      navigate('/captain-home')
    }
    
  }

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Destination Reached!</h3>

      <div className="flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYWdHyeDeJ6zvUKLdma1RXkaIapAt8wpYpvg&s"
            alt=""
          />
          <h2 className="text-lg font-medium">
            {props.rideData?.user.fullname.firstname +
              " " +
              props.rideData?.user.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">3.3 KM</h5>
      </div>

      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 border-b-2 p-3">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.rideData?.pickup}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 border-b-2 p-3">
            <i className="text-lg ri-user-location-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.rideData?.destination}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.rideData?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className=" mt-10 w-full">
          <button
            onClick={endRide}
            className="w-full mt-10 flex justify-center text-lg bg-green-600 text-white font-semibold p-3 rounded-lg"
          >
            Finish Ride
          </button>
          <p className="font-medium text-sm mt-10">
            Click on Finish Ride button if you have completed your payment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinishRide; //exporting the component
