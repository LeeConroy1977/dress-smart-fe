import axios from "axios";
import { useEffect, useState } from "react";
import MainWeatherDisplay from "../components/MainWeatherDisplay";
import WeatherList from "../components/WeatherList";
import Modal from "../reusable_components/Modal";
import Map from "../components/Map";

type DailyWeatherProp = {
  time: string;
  weathercode: number;
  temperature_2m_max: number;
  temperature_2m_min: number;
  windspeed_10m_max: number;
};

type PlaceDetails = {
  name: string;
  lat: number;
  lng: number;
};

type WeatherProp = {
  placeDetails: PlaceDetails;
  isMapOpen: boolean;
  onHandleToggleMap: () => void;
  setIsMapOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onHandlePlace: () => void;
  onSetPlaceDetails: () => void;
};

const Weather = ({
  placeDetails,
  isMapOpen,
  onHandleToggleMap,
  setIsMapOpen,
  onHandlePlace,
  onSetPlaceDetails,
}: WeatherProp) => {
  const [weatherForecast, setWeatherForecast] = useState([]);
  const [selectedWeatherCard, setSelectedWeatherCard] =
    useState<null | DailyWeatherProp>(null);

  const params = {
    latitude: placeDetails.lat,
    longitude: placeDetails.lng,
    hourly: "temperature_2m",
  };

  const dailyParameters =
    "weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max";
  const timezone = "America/New_York";
  const days = 8;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${params.latitude}&longitude=${params.longitude}&daily=${dailyParameters}&timezone=${timezone}&forecast_days=${days}`;
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        const fetchedData = response.data.daily;
        console.log("fetchedData", fetchedData);
        const weatherForecast = fetchedData.time.map((_, index: number) => ({
          time: fetchedData.time[index],
          weathercode: fetchedData.weathercode[index],
          temperature_2m_max: fetchedData.temperature_2m_max[index],
          temperature_2m_min: fetchedData.temperature_2m_min[index],
          windspeed_10m_max: fetchedData.windspeed_10m_max[index],
        }));

        setWeatherForecast(weatherForecast);
        setSelectedWeatherCard(weatherForecast[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {weatherForecast && (
        <div
          className={` relative selection:w-full h-screen flex flex-col items-center justify-start p-4`}
        >
          {isMapOpen && (
            <Modal>
              <Map
                onHandleToggleMap={onHandleToggleMap}
                setIsMapOpen={setIsMapOpen}
                onHandlePlace={onHandlePlace}
                onSetPlaceDetails={onSetPlaceDetails}
              />
            </Modal>
          )}
          {selectedWeatherCard && (
            <MainWeatherDisplay
              selectedWeatherCard={selectedWeatherCard}
              name={placeDetails.name}
            />
          )}

          <WeatherList
            weatherForecast={weatherForecast}
            setSelectedWeatherCard={setSelectedWeatherCard}
          />
        </div>
      )}
    </>
  );
};
[];

export default Weather;
