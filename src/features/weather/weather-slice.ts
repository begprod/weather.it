import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCityWeather, getCityImage } from '../../services/api';
import { IRootState, ISearchItem, ICityWeather } from '../../interfaces';

const initialState: IRootState = {
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

export const weatherSlice = createSlice({
  name: '@@weather',
  initialState,
  reducers: {
    setCity: (state, action) => {
      const cityItem: ICityWeather = action.payload;
      state.entities.push(cityItem);
    },
    removeCity: (state, action) => {
      //
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCityData.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(getCityData.rejected, (state, action) => {
        state.errorMessage = action.error.message || '';
        state.status = 'error';
      })
      .addCase(getCityData.fulfilled, (state, action) => {
        state.status = 'success';
      })
  }
});


export const selectWeatherList = (state: IRootState) => state.entities;
export const selectWeatherStatus = (state: IRootState) => state.status;

export const selectWeatherErrorMessage = (state: IRootState) => state.errorMessage;

export const { reducer: weatherReducer, actions: weatherActions } = weatherSlice;
