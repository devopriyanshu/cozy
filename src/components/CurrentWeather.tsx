import { GeocodingResponse, WeatherData } from "@/api/types";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}

export function CurrentWeather({ data, locationName }: CurrentWeatherProps) {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <div className="rounded-lg shadow-md bg-gradient-to-br  p-6 max-w-md mx-auto">
      {/* Location */}

      {/* Main Temperature */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-center">
          <p className="text-6xl font-extrabold">{formatTemp(temp)}</p>
          <p className="text-sm opacity-90">
            Feels like {formatTemp(feels_like)}
          </p>
        </div>
        <div className="text-center">
          <img
            src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
            alt={currentWeather.description}
            className="h-24 w-24"
          />
          <div className="text-center mb-6">
            <p className="text-lg font-medium capitalize">
              {currentWeather.main}
            </p>
            <p className="text-sm opacity-80 capitalize">
              {currentWeather.description}
            </p>
          </div>
        </div>
      </div>

      {/* Weather Description */}

      {/* Additional Info */}
      <div className="flex gap-4">
        {/* Temperature Range */}
        <div className="flex flex-col items-center  bg-opacity-10 rounded-lg p-4">
          <p className="text-sm font-medium">Temperature Range</p>
          <div className="flex gap-2">
            <span className="text-blue-300">{formatTemp(temp_min)}</span>
            <span className="text-red-300">{formatTemp(temp_max)}</span>
          </div>
        </div>

        {/* Humidity */}
        <div className="flex flex-col items-center  bg-opacity-10 rounded-lg p-4">
          <p className="text-sm font-medium">Humidity</p>
          <p className="text-lg font-bold">{humidity}%</p>
        </div>

        {/* Wind Speed */}
        <div className="flex flex-col items-center  bg-opacity-10 rounded-lg p-4">
          <p className="text-sm font-medium">Wind Speed</p>
          <p className="text-lg font-bold">{speed} m/s</p>
        </div>

        {/* Conditions Icon */}
      </div>
    </div>
  );
}
