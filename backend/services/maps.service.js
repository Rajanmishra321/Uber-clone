const axios = require("axios");

module.exports.getCoordinates = async (address) => {
  console.log(address);
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;
  try {
    // console.log(response)
    const response = await axios.get(url);
    console.log(apiKey);
    if (response.data.status === "OK") {
      const coordinates = response.data.results[0].geometry.location;
      return {
        lat: coordinates.lat,
        lng: coordinates.lng,
      };
    } else {
      throw new Error("Failed to retrieve coordinates");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Please provide origin and destination");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("One or both of the locations are invalid");
      }
      const data = response.data.rows[0].elements[0];
      return {
        distance: data.distance.text,
        time: data.duration.text,
      };
    } else {
      throw new Error("Failed to retrieve distance and time");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if(!input) {
    throw new Error('query is required');
  }

  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if(response.data.status === 'OK') {
      return response.data.predictions;
    } else {
      throw new Error('Failed to retrieve suggestions');
    }
  } catch(error) {
    console.error(error);
    return null;
  }
}