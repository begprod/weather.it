import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCityWeather, getCityImage } from '../../services/api';
import { IRootState, IWeatherState, ISearchItem, ICityWeather } from '../../interfaces';

const initialState: IWeatherState = {
  status: 'init',
  entities: [],
  errorMessage: '',
};

export const getCityData = createAsyncThunk(
  '@@weather/getCityWeather',
  async (cityData: ISearchItem, { dispatch }) => {
    const weatherData = await getCityWeather(cityData.name);
    const imageData = await getCityImage(`${cityData.name} ${cityData.country}`);

    const cityItem: ICityWeather = {
      name: weatherData.name,
      weather: {
        current: weatherData.weather.current,
        feels_like: weatherData.weather.feels_like,
        main: weatherData.weather.main,
        description: weatherData.weather.description,
      },
      image: imageData.urls.regular
    }

    await dispatch(weatherActions.addCity(cityItem));
  }
);

export const weatherSlice = createSlice({
  name: '@@weather',
  initialState,
  reducers: {
    addCity: (state, action) => {
      const cityItem: ICityWeather = action.payload;
      state.entities.push(cityItem);
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCityData.pending, (state, action) => {
        console.log('getCityData.pending', action.payload);
        state.status = 'loading';
      })
      .addCase(getCityData.rejected, (state, action) => {
        console.log('getCityData.rejected', action);
        state.errorMessage = action.error.message || '';

        state.status = 'error';
      })
      .addCase(getCityData.fulfilled, (state, action) => {
        console.log('getCityData.fulfilled', action);
        state.status = 'success';
      })
  }
});


export const selectWeatherList = (state: IRootState) => state.weather.entities;
export const selectWeatherStatus = (state: IRootState) => state.weather.status;

export const selectWeatherErrorMessage = (state: IRootState) => state.weather.errorMessage;

export const { reducer: weatherReducer, actions: weatherActions } = weatherSlice;
