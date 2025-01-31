import React from "react";


const WaitingForDriver=(props)=>{

    return(
        <div>
        <h5
          className="p-1 text-center w-[93%] absolute top-0"
          onClick={() => {
            props.WaitingForDriver(false);
          }}
        >
          <i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
        </h5>

        <div className="flex items-center justify-between">
        <img
            className="h-20"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png"
            alt="img"
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">{props.ride?.captain.fullname.firstname + " " + props.ride?.captain.fullname.lastname}</h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">{props.ride?.captain.vehicle.numberPlate}</h4>
            <p className="text-sm text-gray-600">{props.ride?.captain.vehicle.vehicleType}</p>
            <h1 className="text-lg font-semibold">{props.ride?.otp}</h1>
          </div>
        </div>
  
        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 border-b-2 p-3">
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium">562/11A</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  {props.ride?.pickup}
                </p>
              </div>
            </div>
  
            <div className="flex items-center gap-5 border-b-2 p-3">
              <i className="text-lg ri-user-location-fill"></i>
              <div>
                <h3 className="text-lg font-medium">562/11A</h3>
                <p className="text-sm -mt-1 text-gray-600">
                  {props.ride?.destination}
                </p>
              </div>
            </div>
  
            <div className="flex items-center gap-5 p-3">
              <i className="text-lg ri-currency-fill"></i>
              <div>
                <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
                <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default WaitingForDriver;  //exporting the component to use in other files