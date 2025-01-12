import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Sunrise,
  Sunset,
  Compass,
  Gauge,
  Droplets,
  Thermometer,
} from "lucide-react";
import { format } from "date-fns";
import type { WeatherData } from "@/api/types";

interface WeatherDetailsProps {
  data: WeatherData;
}

export function WeatherDetails({ data }: WeatherDetailsProps) {
  const { wind, main, sys } = data;

  // Format time using date-fns
  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:mm a");
  };

  // Convert wind degree to direction
  const getWindDirection = (degree: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
    {
      title: "Humidity",
      value: `${main.humidity}%`,
      icon: Droplets,
      color: "text-blue-400",
    },
    {
      title: "Feels Like",
      value: `${Math.round(main.feels_like)}°C`,
      icon: Thermometer,
      color: "text-red-400",
    },
  ];

  return (
    <Card className="rounded-lg   shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Detailed Weather Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="flex items-center gap-4 rounded-lgp-4  transition-shadow duration-300"
            >
              <detail.icon className={`h-6 w-6 ${detail.color}`} />
              <div>
                <p className="text-sm font-bold">{detail.title}</p>
                <p className="text-sm ">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
