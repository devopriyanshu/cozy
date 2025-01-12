import { ForecastData, WeatherData } from "@/api/types";
import { CurrentWeather } from "@/components/CurrentWeather";
import { HourlyForecast } from "@/components/HourlyForecast";
import WeatherSkeleton from "@/components/Skeleton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { WeatherDetails } from "@/components/WeatherDetails";
import { WeatherForecast } from "@/components/WeatherForecast";
import { useGetLocation } from "@/hooks/useGetLocation";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/useWeather";
import { RefreshCcw } from "lucide-react";
import React from "react";

const WeatherDashboard = () => {
  const defaultForecastData: ForecastData = {
    list: [
      {
        dt: 0,
        main: {
          temp: 0,
          feels_like: 0,
          temp_min: 0,
          temp_max: 0,
          pressure: 0,
          humidity: 0,
        },
        weather: [
          {
            id: 0,
            main: "",
            description: "",
            icon: "",
          },
        ],
        wind: {
          speed: 0,
          deg: 0,
        },
        dt_txt: "",
      },
    ],
    city: {
      name: "Unknown",
      country: "Unknown",
      sunrise: 0,
      sunset: 0,
    },
  };

  const defaultWeatherData: WeatherData = {
    coord: { lat: 0, lon: 0 },
    weather: [{ id: 0, main: "", description: "", icon: "" }],
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
    },
    wind: { speed: 0, deg: 0 },
    sys: { sunrise: 0, sunset: 0, country: "" },
    name: "",
    dt: 0,
  };
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGetLocation();
  const locationQuery = useReverseGeocodeQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  const locationName = locationQuery.data?.[0];
  const data1 = weatherQuery.data;
  console.log(forecastQuery.data);

  const handleRefresh = () => {
    locationQuery.refetch();
    weatherQuery.refetch();
    forecastQuery.refetch();
  };
  if (locationLoading) {
    return <WeatherSkeleton />;
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex">
          <h1>{`${locationName?.name}, ${locationName?.state}`}</h1>
        </div>

        <Button
          variant="outline"
          size="icon"
          //   onClick={handleRefresh}
          //   disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCcw />
        </Button>
      </div>
      <div className="grid gap-6">
        <CurrentWeather
          data={weatherQuery.data || defaultWeatherData}
          locationName={locationName}
        />
        <HourlyForecast data={forecastQuery.data || defaultForecastData} />
        <WeatherDetails data={weatherQuery.data || defaultWeatherData} />
        <WeatherForecast data={forecastQuery.data || defaultForecastData} />
      </div>
    </div>
  );
};

export default WeatherDashboard;
