import { API_CONFIG } from "./apiconfig";
import { Coordinates, ForecastData, GeocodingResponse, WeatherData } from "./types";


class weatherApi {
  private createUrl(
    endpoints: string,
    params: Record<string, string | number>
  ) {
    const searchParams = new URLSearchParams({
      appid: "69aa6db6f56c8ea0875de0761c6e45f9",
      ...params,
    });
    return `${endpoints}?${searchParams.toString()}`;
  }

  private async fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather API Error: ${response.statusText}`);
    }
    return response.json();
  }

  async getCurrentWeather({lat, lon}:Coordinates):Promise<WeatherData>{
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`,{
        lat:lat.toString(),
        lon:lon.toString(),
        units:"metric",
    })
    return this.fetchData<WeatherData>(url)
  }

  async getForecast({lat, lon}: Coordinates): Promise<ForecastData>{
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`,{
        lat:lat.toString(),
        lon:lon.toString(),
        units:"metric"
    });
    return this.fetchData<ForecastData>(url);
  }

  async reverseGeocode({
    lat,
    lon,
  }: Coordinates): Promise<GeocodingResponse[]> {
    const url = this.createUrl(`${API_CONFIG.GEO_URL}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: "1",
    });
    return this.fetchData<GeocodingResponse[]>(url);
  }

  async searchLocations(query: string): Promise<GeocodingResponse[]> {
    const url = this.createUrl(`${API_CONFIG.GEO_URL}/direct`, {
      q: query,
      limit: "5",
    });
    return this.fetchData<GeocodingResponse[]>(url);
  }
}



export const WeatherAPI = new weatherApi();