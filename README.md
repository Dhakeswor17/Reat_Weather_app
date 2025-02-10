# Weather App

A simple React-based weather application that provides live weather updates based on user input or current location. The app fetches real-time weather data using the WeatherAPI.

## Features

- 🌍 **Search by Location:** Users can enter a city or country name to get the current weather.
- 📍 **Use Current Location:** Fetch weather updates based on the user's geolocation.
- ☀️ **Weather Conditions:** Displays temperature, humidity, wind speed, and weather conditions with icons.
- 🎨 **Modern UI:** Beautiful card-based design with smooth animations.
- ⚡ **Fast & Responsive:** Optimized for mobile and desktop use.

## Technologies Used

- **React** - UI framework
- **TypeScript** - Type safety
- **Material-UI** - UI components
- **Axios** - HTTP requests
- **WeatherAPI** - Live weather data

## Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/weather-app.git
   ```
2. Navigate to the project folder:
   ```sh
   cd weather-app
   ```
3. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```

### Running the App

Start the development server:
```sh
npm start  # or yarn start
```

The app will run on `http://localhost:3000`.

## API Usage

This app uses [WeatherAPI](http://api.weatherapi.com/) to fetch live weather data. You need an API key to run the project.

1. Sign up on [WeatherAPI](https://www.weatherapi.com/) to get your free API key.
2. Add your API key to `SearchPlaces.tsx`:
   ```tsx
   const API_KEY = "your_api_key_here";
   ```

## Project Structure

```
/weather-app
│── src
│   ├── components
│   │   ├── SearchPlaces.tsx  # Main component
│   ├── styles
│   │   ├── searchPlaces.scss # Styling
│   ├── App.tsx  # Main entry file
│── public
│── package.json
│── README.md
```

## Contact

For any questions, reach out to santoshneupane17@gmail.com.

