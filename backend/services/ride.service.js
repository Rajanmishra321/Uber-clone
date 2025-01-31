const rideModel = require("../models/ride.model");
const captainModel = require("../models/captain.model")
const mapsService = require("./maps.service");
const crypto = require("crypto");
const { error } = require("console");
const { sendMessageToSocketId } = require("../socket");

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
      distance * perKmRate.motorcycle + // Use parsed 'distance'
      time * perMinuteRate.motorcycle, // Use parsed 'time'
    car: baseFare.car + distance * perKmRate.car + time * perMinuteRate.car,
    auto: baseFare.auto + distance * perKmRate.auto + time * perMinuteRate.auto,
  };

  return fare;
}

module.exports.getFare = getFare;

function getOtp(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
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
    otp: getOtp(6),
    fare: fare[vehicleType],
  });

  return ride;
};

module.exports.confirmRide = async ({
  rideId, captain
}) => {
  if (!rideId) {
      throw new Error('Ride id is required');
  }

  await rideModel.findOneAndUpdate({
      _id: rideId
  }, {
      status: 'accepted',
      captain: captain._id
  })

  const ride = await rideModel.findOne({
      _id: rideId
  }).populate('user').populate('captain').select('+otp')
    
  // till here every thing is fine

  if (!ride) {
      throw new Error('Ride not found');
  }

  return ride;

}


module.exports.startRide = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
      throw new Error('Ride id and OTP are required');
  }

  const ride = await rideModel.findOne({
      _id: rideId
  }).populate('user').populate('captain').select('+otp');

  if (!ride) {
      throw new Error('Ride not found');
  }
  
  if (ride.status !== 'accepted') {
      throw new Error('Ride not accepted');
  }

  if (ride.otp !== otp) {
      throw new Error('Invalid OTP');
  }

  await rideModel.findOneAndUpdate({
      _id: rideId
  }, {
      status: 'ongoing'
  })

  return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
  if (!rideId) {
      throw new Error('Ride id is required');
  }

  const ride = await rideModel.findOne({
      _id: rideId,
      captain: captain._id
  }).populate('user').populate('captain').select('+otp');

  if (!ride) {
      throw new Error('Ride not found');
  }

  if (ride.status !== 'ongoing') {
      throw new Error('Ride not ongoing');
  }

  await rideModel.findOneAndUpdate({
      _id: rideId
  }, {
      status: 'completed'
  })

  return ride;
}