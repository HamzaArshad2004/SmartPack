import { fetchWeatherData} from './weatherService';  // Import weather-related functions
// Access OpenAI API key from the .env file
const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

/**
 * Fetch OpenAI recommendations based on the provided prompt.
 * 
 * @param {string} location - Destination location (e.g., Paris).
 * @param {number} duration - Length of the trip in days.
 * @param {string} tripType - Type of the trip (e.g., vacation, business).
 * @param {string} weatherDescription - Weather condition (e.g., sunny, rainy).
 * @param {number} temperature - Temperature at the destination in °C.
 * @returns {Promise<Array<string>>} - Returns a packing list as an array of strings.
 */

// I used LLM to generate parts of the fetchOpenAIRecommendations function to ensure the correct syntax was being followed to send requests to OpenAI's API model

export const fetchOpenAIRecommendations = async (location, duration, tripType, weatherDescription, temperature) => {
    const openAIKey = openaiApiKey;  // Store OpenAI API key
    
    const apiUrl = 'https://api.openai.com/v1/chat/completions';  // OpenAI API URL

    // Define the prompt for OpenAI API to generate a packing list
    const prompt = `Generate a packing list of 15 items for a ${location} trip with ${weatherDescription} and a temperature of ${temperature}°C for ${tripType} for ${duration} days. Provide a simple list of items without any additional explanation. Separate the items with commas and do not number them. Capitalize first letter for each item. Have passport as the first item in any case`;

    const requestBody = {
      model: 'gpt-3.5-turbo',  // Specify the AI model to use (GPT-3.5-turbo)
      messages: [
        {
          role: 'user',  // Define the role of the message sender
          content: prompt  // The actual content/prompt sent to the OpenAI API
        }
      ],
      max_tokens: 150,  // Limit the maximum number of tokens to generate
    };

    try {
      // Make the POST request to the OpenAI API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Send request as JSON
          'Authorization': `Bearer ${openAIKey}`,  // Include OpenAI API key for authentication
        },
        body: JSON.stringify(requestBody),  // Send the request body as JSON
      });

      // Check if the response is not successful (status code != 200)
      if (!response.ok) {
        const errorData = await response.json();  // Log the response data for debugging if there's an error
        console.error("Error Details:", errorData);
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();  // Parse the response as JSON
      const packingListString = data.choices[0].message.content.trim();  // Extract the packing list from the response
      const packingListArray = packingListString.split(/,\s*|\n/);  // Split the packing list by commas or new lines

      return packingListArray;  // Return the array of packing list items
    } catch (error) {
      console.error("Error fetching from OpenAI API:", error.message);  // Log any errors
      return null;  // Return null if an error occurs
    }
  };

/**
 * Main function to generate a packing checklist based on location, duration, and trip type.
 * It first fetches the weather data and then generates a prompt to fetch a packing list
 * from the OpenAI API based on the weather, trip duration, and type.
 * 
 * @param {string} location - Destination location (e.g., Paris).
 * @param {number} duration - Length of the trip in days.
 * @param {string} tripType - Type of the trip (e.g., vacation, business).
 * @param {Function} setChecklist - State setter function to update the checklist.
 */
export const generateChecklist = async (location, duration, tripType, setChecklist) => {
  try {
    // Step 1: Fetch the weather data for the specified location
    const weatherData = await fetchWeatherData(location);
    if (!weatherData) {
      setChecklist(["Could not fetch weather data"]);  // Error handling if weather data is not available
      return;
    }

    // Extract weather details
    const weatherDescription = weatherData.current.weather_descriptions[0];
    const temperature = weatherData.current.temperature;

    // Step 2: Fetch packing recommendations from the OpenAI API using weather and trip details
    const openAIRecommendations = await fetchOpenAIRecommendations(location, duration, tripType, weatherDescription, temperature);
    
    if (!openAIRecommendations) {
      setChecklist(["Could not generate recommendations"]);  // Error handling if OpenAI fails
      return;
    }

    // Step 3: Set the final checklist based on the recommendations
    setChecklist(openAIRecommendations);  // Update the checklist state with the recommendations

  } catch (error) {
    console.error("Error generating checklist:", error.message);  // Log any errors during checklist generation
    setChecklist(["An error occurred while generating the checklist."]);  // Error handling for the UI
  }
};
