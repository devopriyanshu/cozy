import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind, Sun, Cloud } from "lucide-react";
import { format } from "date-fns";
import type { ForecastData } from "@/api/types";

interface WeatherForecastProps {
  data: ForecastData;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  sunrise?: number;
  sunset?: number;
  uvIndex?: number; // Example: Added UV Index for enhanced user value
}

export function WeatherForecast({ data }: WeatherForecastProps) {
  // Group forecast by day and get daily min/max
  const dailyForecasts = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
        sunrise: data.city.sunrise,
        sunset: data.city.sunset,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }

    return acc;
  }, {} as Record<string, DailyForecast>);

  // Get next 5 days
  const nextDays = Object.values(dailyForecasts).slice(1, 6);

  // Format temperature
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  // Format time
  const formatTime = (timestamp: number) =>
    format(new Date(timestamp * 1000), "h:mm a");

  return (
    <Card className="rounded-lg  shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          5-Day Weather Forecast
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {nextDays.map((day) => (
            <div
              key={day.date}
              className="grid grid-cols-4 items-center  gap-4 rounded-lg  p-4"
            >
              {/* Date and Weather Description */}
              <div>
                <p className="text-lg font-bold">
                  {format(new Date(day.date * 1000), "EEE, MMM d")}
                </p>
                <div className="flex items-center gap-2 text-sm  capitalize">
                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                    alt={day.weather.description}
                    className="h-8 w-8"
                  />
                  <span>{day.weather.description}</span>
                </div>
              </div>

              {/* Min/Max Temperature */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <ArrowDown className="text-blue-300" />
                  <span className="text-lg">{formatTemp(day.temp_min)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowUp className="text-red-300" />
                  <span className="text-lg">{formatTemp(day.temp_max)}</span>
                </div>
              </div>

              {/* Additional Weather Details */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-300" />
                  <span className="text-sm">{day.humidity}% Humidity</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-5 w-5 text-blue-300" />
                  <span className="text-sm">{day.wind} m/s Wind</span>
                </div>
              </div>

              {/* Sunrise/Sunset Times */}
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-yellow-300" />
                  <span className="text-sm">{formatTime(day.sunrise!)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-orange-300" />
                  <span className="text-sm">{formatTime(day.sunset!)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
