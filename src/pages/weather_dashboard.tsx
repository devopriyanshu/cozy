import WeatherSkeleton from '@/components/Skeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetLocation } from '@/hooks/useGetLocation'
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/useWeather';
import React from 'react'

const WeatherDashboard = () => {

    const {coordinates, error:locationError, getLocation, isLoading:locationLoading} = useGetLocation();
    const locationQuery = useReverseGeocodeQuery(coordinates);
    const weatherQuery = useWeatherQuery(coordinates);
    const forecastQuery  = useForecastQuery(coordinates);

    // console.log(locationQuery.data);

    const handleRefresh = ()=>{
        locationQuery.refetch();
        weatherQuery.refetch();
        forecastQuery.refetch();
    }
    if(locationLoading){
        return(
            <WeatherSkeleton/>
        )
    }
  return (
   
    <div>WeatherDashboard</div>
  )
}

export default WeatherDashboard