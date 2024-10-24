import React, { useState } from 'react';
import { fetchWeatherData } from './weatherService';  // Import the weather fetching service
import { fetchOpenAIRecommendations } from './ChecklistService';  // Import the function to get packing recommendations from OpenAI

// Main component for the Packing Checklist
const PackingChecklist = () => {
  const [packingList, setPackingList] = useState([]);  // State to store the generated packing list
  const [location, setLocation] = useState('');  // State to store the user input for destination
  const [duration, setDuration] = useState('');  // State to store the trip duration
  const [tripType, setTripType] = useState('');  // State to store the trip type (e.g., leisure, business)

  // Function to handle the generation of the packing checklist
  const handleGenerateChecklist = async () => {
    const weatherInfo = await fetchWeatherData(location);  // Fetch weather data for the given location
    if (weatherInfo) {
      // Extract weather details such as description and temperature
      const weatherDescription = weatherInfo.current.weather_descriptions[0].toLowerCase();
      const temperature = weatherInfo.current.temperature;

      // Fetch recommendations from OpenAI based on the weather, location, duration, and trip type
      const aiPackingList = await fetchOpenAIRecommendations(location, duration, tripType, weatherDescription, temperature);
      
      // Update the packing list state
      setPackingList(aiPackingList);
    }
  };

  // I used LLM to generate parts of the following code to get a working template of a webpage in React as I have limited prior experience with React
  return (
    <div>
      <h1>Packing Checklist</h1>

      {/* Input field for destination */}
      <input 
        type="text" 
        value={location} 
        onChange={(e) => setLocation(e.target.value)} 
        placeholder="Enter your destination" 
      />

      {/* Input field for trip duration */}
      <input 
        type="number" 
        value={duration} 
        onChange={(e) => setDuration(e.target.value)} 
        placeholder="Enter trip duration (days)" 
      />

      {/* Input field for trip type */}
      <input 
        type="text" 
        value={tripType} 
        onChange={(e) => setTripType(e.target.value)} 
        placeholder="Enter trip type (e.g., business, leisure)" 
      />

      {/* Button to generate the checklist */}
      <button onClick={handleGenerateChecklist}>Generate Checklist</button>
      
      {/* Display the generated packing list as checkable items */}
      <ul>
        {packingList.map((item, index) => (
          <li key={index}>
            <input type="checkbox" id={`item-${index}`} />
            <label htmlFor={`item-${index}`}>{item}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackingChecklist;
