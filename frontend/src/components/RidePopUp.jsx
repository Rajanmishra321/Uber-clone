
import React from "react";

const RidePopUp = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setRidePopUpPanel(false);
        }}
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>

        <div className="flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg">
            <div className="flex items-center gap-3">
                <img className="h-12 w-12 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYWdHyeDeJ6zvUKLdma1RXkaIapAt8wpYpvg&s" alt="" />
                <h2 className="text-lg font-medium">Himanshu Chaudhary</h2>
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
                Kakariya Talab, Bhopal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 border-b-2 p-3">
            <i className="text-lg ri-user-location-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Kakariya Talab, Bhopal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">₹193.30</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
       <div className="flex justify-between items-center mt-5 w-full">

       <button
          onClick={() => {
            props.setRidePopUpPanel(false);
          }}
          className=" mt-1 bg-gray-200 text-gray-700 font-semibold p-3 px-10 rounded-lg"
        >
          Ignore
        </button>

       <button
          onClick={() => {
            props.setConfirmRidePopUpPanel(true)
          }}
          className=" bg-green-600 text-white font-semibold p-3 px-10 rounded-lg"
        >
          Accept
        </button>
       </div>
      </div>
    </div>
  );
};

export default RidePopUp; //exporting the component
