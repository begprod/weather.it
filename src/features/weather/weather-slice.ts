import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCityWeather, getCityImage } from '../../services/api';
import { IRootState, ISearchItem, ICityWeather } from '../../interfaces';

const initialState: IRootState = {
  status: 'init',
  entities: [],
  errorMessage: '',
};

export const getCityData = createAsyncThunk(
  '@@weather/getCityData',
  async (cityData: ISearchItem, { dispatch }) => {
    const weatherData = await getCityWeather(cityData.name, cityData.id);
    const imageData = await getCityImage(`${cityData.name} city ${cityData.country}`);

    const cityItem: ICityWeather = {
      id: weatherData.id,
      name: weatherData.name,
      country: cityData.country,
      weather: {
        current: weatherData.weather.current,
        feels_like: weatherData.weather.feels_like,
        main: weatherData.weather.main,
        description: weatherData.weather.description,
      },
      image: imageData.urls.regular
    }

    await dispatch(weatherActions.setCity(cityItem));
  }
);

export const updatedWeatherData = createAsyncThunk(
  '@@weather/updatedWeatherData',
  (_, { dispatch, getState }) => {
    const state = getState() as IRootState;

    if (state.entities.length === 0) {
      return;
    };

    state.entities.forEach(async (item) => {
      const city: ISearchItem = {
        id: item.id,
        name: item.name,
        country: item.country
      }

      dispatch(getCityData(city));
    });
  });

export const weatherSlice = createSlice({
  name: '@@weather',
  initialState,
  reducers: {
    setCity: (state, action) => {
      const cityItem: ICityWeather = action.payload;
      const cityIndex = state.entities.findIndex((city) => city.name === cityItem.name);

      if (cityIndex !== -1) {
        state.entities[cityIndex] = cityItem;
        return;
      }

      state.entities.push(cityItem);
    },
    removeCity: (state, action) => {
      state.entities = state.entities.filter((city) => city.name !== action.payload.name);
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCityData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCityData.rejected, (state, action) => {
        state.errorMessage = action.error.message || '';
        state.status = 'error';
      })
      .addCase(getCityData.fulfilled, (state) => {
        state.status = 'success';
      })
  }
});


export const selectWeatherList = (state: IRootState) => state.entities;
export const selectWeatherStatus = (state: IRootState) => state.status;
export const selectWeatherErrorMessage = (state: IRootState) => state.errorMessage;

export const { reducer: weatherReducer, actions: weatherActions } = weatherSlice;
