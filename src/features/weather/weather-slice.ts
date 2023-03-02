import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCityImage, getCityWeather } from '../../services/api';
import { IRootState, ICityWeather, ISearchItem } from '../../types';
import { createDate } from '../../helpers';

const cityWeatherListAdapter = createEntityAdapter<ICityWeather>({
  selectId: (city) => city.id,
});

export const getCityData = createAsyncThunk(
  '@@weather/getCityData',
  async (cityData: ISearchItem, {dispatch}) => {
    const weatherData = await getCityWeather(cityData.name, cityData.id);
    const imageData = await getCityImage(`${cityData.name} city ${cityData.country}`);

    dispatch(weatherActions.addImage(
      {[cityData.id]: imageData}
    ));
    dispatch(weatherActions.addCity(weatherData));
  }
);

export const updateWeatherData = createAsyncThunk(
  '@@weather/updatedWeatherData',
  async (_, {dispatch, getState}) => {
    const date = createDate();
    const state = getState() as IRootState['entities'];

    if (!state) {
      throw new Error('No state found');
    }

    const cities = selectWeatherList(state);
    const promises = cities.map((city) => getCityWeather(city.name, city.id));

    if (promises.length === 0) {
      return;
    }

    dispatch(weatherActions.setStatus('updating'));
    dispatch(weatherActions.setLastUpdateDate(date));

    for (const promise of promises) {
      try {
        const weatherData = await promise;

        dispatch(weatherActions.addCity(weatherData));
        dispatch(weatherActions.setStatus('success'));
      } catch (error) {
        dispatch(weatherActions.setStatus('error'));
        throw new Error('Something went wrong with updating weather data. Please try again later.');
      }
    }
  });


const initialState: IRootState = {
  images: {},
  lastUpdateDate: null,
  status: 'init',
  errorMessage: '',
};

export const weatherSlice = createSlice({
  name: '@@weather',
  initialState: cityWeatherListAdapter.getInitialState(initialState),
  reducers: {
    addCity: (state, action: PayloadAction<ICityWeather>) => {
      cityWeatherListAdapter.setOne(state, action.payload);
    },
    removeCity: (state, action: PayloadAction<number>) => {
      cityWeatherListAdapter.removeOne(state, action.payload);
      delete state.images[action.payload];

      if (cityWeatherListAdapter.getSelectors().selectAll(state).length === 0) {
        state.lastUpdateDate = null;
      }
    },
    addImage: (state, action) => {
      state.images = {...state.images, ...action.payload};
    },
    setLastUpdateDate: (state, action) => {
      state.lastUpdateDate = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
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
        state.errorMessage = '';
      })
  }
});

export const selectWeatherList = cityWeatherListAdapter.getSelectors().selectAll;
export const selectCityImages = (state: IRootState) => state.images;
export const selectLastUpdateDate = (state: IRootState) => state.lastUpdateDate;
export const selectWeatherStatus = (state: IRootState) => state.status;
export const selectWeatherErrorMessage = (state: IRootState) => state.errorMessage;

export const { reducer: weatherReducer, actions: weatherActions } = weatherSlice;
