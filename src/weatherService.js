// Access Weatherstack API key from environment variables
const weatherApiKey = process.env.REACT_APP_WEATHERSTACK_API_KEY;

// Function to fetch weather data based on location
export const fetchWeatherData = async (location) => {
    // Construct the Weatherstack API URL with the location and API key
    const url = `http://api.weatherstack.com/current?access_key=${weatherApiKey}&query=${location}`;
  
    try {
      // Make a request to the Weatherstack API
      const response = await fetch(url);
      
      // Parse the response JSON data
      const data = await response.json();
  
      // If the response is not OK or contains an error, throw an error
      if (!response.ok || !data || data.error) {
        throw new Error(data.error ? data.error.info : 'Failed to fetch weather data.');
      }
  
      // Return the weather data if successful
      return data;
    } catch (error) {
      // Log the error message in case of failure
      console.error("Error fetching weather data:", error.message);
      return null; // Return null in case of error
    }
};
