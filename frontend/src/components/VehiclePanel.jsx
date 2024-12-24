import React from "react";

const VehiclePanel=(props)=>{
    return(
        <div>
            <h5 className="p-1 text-center w-[93%] absolute top-0" onClick={()=>{
          props.setVehiclePanel(false);
        }}><i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i></h5>
        <h3 className="text-2xl font-semibold mb-5">Chose a Vehicle</h3>
        <div onClick={()=>{
            props.setConfirmRidePanel(true)
        }} className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between">
          <img
            className="h-10 ml-2"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1555367349/assets/d7/3d4b80-1a5f-4a8b-ac2b-bf6c0810f050/original/Final_XL.png"
            alt=""
          />
          <div className="ml-3 w-1/2">
            <h4 className="font-medium text-base">
              UberGo{" "}
              <span>
                <i className="ri-user-3-fill"></i>4
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable, compact rides
            </p>
          </div>
          <h3 className="text-lg font-semibold">₹193.23</h3>
        </div>

        <div onClick={()=>{
            props.setConfirmRidePanel(true)
        }} className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between">
          <img
            className="h-10"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png"
            alt=""
          />
          <div className="-ml-2 w-1/2">
            <h4 className="font-medium text-base">
              UberGo{" "}
              <span>
                <i className="ri-user-3-fill"></i>1
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable, compact rides
            </p>
          </div>
          <h3 className="text-lg font-semibold">₹56</h3>
        </div>

        <div onClick={()=>{
            props.setConfirmRidePanel(true)
        }} className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between">
          <img
            className="h-10"
            src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
            alt=""
          />
          <div className="ml-1 w-1/2">
            <h4 className="font-medium text-base">
              UberGo{" "}
              <span>
                <i className="ri-user-3-fill"></i>3
              </span>
            </h4>
            <h5 className="font-medium text-sm">2 mins away</h5>
            <p className="font-normal text-xs text-gray-600">
              Affordable, compact rides
            </p>
          </div>
          <h3 className="text-lg font-semibold">₹150.56</h3>
        </div>
        </div>
    )
}

export default VehiclePanel
