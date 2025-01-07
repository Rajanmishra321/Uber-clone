const rideModel = require("../models/ride.model");
const mapsService = require("./maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Please provide pickup and destination");
  }
  const distanceTime = await mapsService.getDistanceTime(pickup, destination);

  if (
    !distanceTime ||
    typeof distanceTime.distance !== "string" ||
    typeof distanceTime.time !== "string"
  ) {
    throw new Error("Invalid distance or time received from mapsService");
  }

  // Extract numeric values from the strings
  const distance = parseFloat(distanceTime.distance.replace(" km", ""));
  const time = parseFloat(distanceTime.time.replace(" mins", ""));

  if (isNaN(distance) || isNaN(time)) {
    throw new Error("Failed to parse distance or time as numeric values");
  }


  const baseFare = {
    motorcycle: 20,
    car: 50,
    auto: 30,
  };

  const perKmRate = {
    motorcycle: 8,
    car: 15,
    auto: 10,
  };

  const perMinuteRate = {
    motorcycle: 1.5,
    car: 3,
    auto: 2,
  };

  const fare = {
    motorcycle:
      baseFare.motorcycle +
      distance * perKmRate.motorcycle +   // Use parsed 'distance'
      time * perMinuteRate.motorcycle,    // Use parsed 'time'
    car:
      baseFare.car +
      distance * perKmRate.car +
      time * perMinuteRate.car,
    auto:
      baseFare.auto +
      distance * perKmRate.auto +
      time * perMinuteRate.auto,
  };

  return fare;
}

module.exports.getFare = getFare;

function getOtp(num){
    function generateOtp(num){
        const otp = crypto.randomInt(Math.pow(10,num-1), Math.pow(10,num)).toString();
        return otp;
    }
    return generateOtp(num);

}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("Please provide all the fields");
  }
  const validVehicleTypes = ["motorcycle", "car", "auto"];
  if (!validVehicleTypes.includes(vehicleType)) {
    throw new Error("Invalid vehicle type");
  }
  const fare = await getFare(pickup, destination);
  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp:getOtp(6),
    fare: fare[vehicleType],
  });

  return ride;
};
