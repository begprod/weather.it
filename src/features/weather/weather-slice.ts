import { createSlice, createAsyncThunk, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import { getCityWeather, getCityImage } from '../../services/api';
import { IRootState, ISearchItem, ICityWeather } from '../../types';

const cityWeatherListAdapter = createEntityAdapter<ICityWeather>({
  selectId: (city) => city.id,
});

export const getCityData = createAsyncThunk(
  '@@weather/getCityData',
  async (cityData: ISearchItem, { dispatch }) => {
    const weatherData = await getCityWeather(cityData.name, cityData.id);
    const imageData = await getCityImage(`${cityData.name} city ${cityData.country}`);

    dispatch(weatherActions.addImage(
      {[cityData.id]:imageData}
    ));
    dispatch(weatherActions.addCity(weatherData));
  }
);

export const updateWeatherData = createAsyncThunk(
  '@@weather/updatedWeatherData',
  async (_, { dispatch, getState }) => {
    const state = getState() as IRootState;
    const cities = selectWeatherList(state as any);
    dispatch(weatherActions.setStatus('updating'));

    for (const city of cities) {
      getCityWeather(city.name, city.id)
        .then((weatherData) => {
          dispatch(weatherActions.addCity(weatherData));
          dispatch(weatherActions.setStatus('success'));
        })
    }
  });



const initialState: IRootState = {
  images: {},
  status: 'init',
  errorMessage: '',
};

export const weatherSlice = createSlice({
  name: '@@weather',
  initialState: cityWeatherListAdapter.getInitialState(initialState),
  reducers: {
    addCity: (state, action: PayloadAction<ICityWeather>) => {
      cityWeatherListAdapter.addOne(state, action.payload);
    },
    removeCity: (state, action: PayloadAction<number>) => {
      cityWeatherListAdapter.removeOne(state, action.payload);
      delete state.images[action.payload];
    },
    addImage: (state, action) => {
      state.images = {...state.images, ...action.payload};
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

export const selectWeatherList = cityWeatherListAdapter.getSelectors().selectAll;
export const selectCityImages = (state: IRootState) => state.images;
export const selectWeatherStatus = (state: IRootState) => state.status;
export const selectWeatherErrorMessage = (state: IRootState) => state.errorMessage;

export const { reducer: weatherReducer, actions: weatherActions } = weatherSlice;
