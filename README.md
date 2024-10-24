# Packing Checklist Generator

## Description
The **Packing Checklist Generator** is a React-based web application designed to help users create personalized packing lists for their trips. By using the destination, duration, and trip type as inputs, the app generates a tailored checklist of items based on the expected weather at the destination. It integrates the Weatherstack API to fetch live weather data for the user's destination and the OpenAI API to generate an AI-recommended packing list, ensuring you don’t forget essential items.

### Problem it Solves
Many people struggle with packing for trips, often forgetting essential items or packing inappropriately for the weather. This app simplifies the packing process by providing a customized checklist based on factors like destination, weather, and trip duration. Users no longer need to guess what they should bring—they'll have a smart packing list ready to go.

## Features
- Generate packing lists based on destination, trip type, and duration.
- Fetch real-time weather data using the Weatherstack API to ensure the packing list is appropriate for the weather.
- Use OpenAI API to recommend tailored packing lists based on user inputs.
- Simple user interface with an option to check off items as they're packed.

## Setup Instructions

### Prerequisites
1. **Node.js**: Make sure you have Node.js installed. If not, download and install it from [Node.js official site](https://nodejs.org/).
2. **API Keys**: You need the following API keys to set up the project:
   - **Weatherstack API Key**: Sign up for a free key at [Weatherstack](https://weatherstack.com/).
   - **OpenAI API Key**: Sign up for a free key at [OpenAI](https://platform.openai.com/signup).

## How to Set Up and Run the Project

1. **Clone the repository:**
   ```bash
   git clone https://github.com/HamzaArshad2004/SmartPack.git
   cd SmartPack


2. **Install dependencies:**
   Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. Then, run the following command in the terminal:
   ```bash
   npm install

3. **Obtain API keys:**
    To use the Weatherstack API, you need an API key. Follow these steps:
     1. Go to the Weatherstack website and sign up for an account.
     2. After creating an account, navigate to the API section to generate your API key.
     3. Create a .env file in the root of your project and add your API key:
        REACT_APP_WEATHERSTACK_API_KEY=your_api_key_here
    For OpenAI API:
     1. Go to the OpenAI website and sign up for an account if you don't have one.
     2. After logging in, navigate to the API section and create an API key.
     3. In the same .env file, add your OpenAI API key:
        REACT_APP_OPENAI_API_KEY=your_openai_api_key_here

4. **Run the application:**
    Start the development server with:
    npm start
   - The application will be available at http://localhost:3000.


## API Integration
SmartPack integrates with the Weatherstack API to provide weather-related packing suggestions based on the user's destination and travel dates. The API is used to fetch weather forecasts, which helps users consider weather conditions when packing.

## How the API is Integrated
The application makes a GET request to the Weatherstack API to retrieve weather data and OpenAI to dyamically generate a recommended packing list
Based on the weather forecast, the application dynamically adjusts the suggested packing items (e.g., recommending umbrellas for rainy forecasts).
The API keys are stored securely in an environment variable to protect sensitive information.



## Credits
This project utilizes AI-generated code to assist in the development process. The AI helped in the following areas:

  1. Generating React components: Provided template code for key components such as the packing list and input forms.
  2. API integration: Assisted in writing the logic for making API requests and handling responses.
  3. Styling suggestions: Offered guidance on CSS styling for a responsive design.

While AI-assisted code was instrumental in speeding up development, the final implementation and customization were carried out by me to ensure the application met specific requirements and functionality.
