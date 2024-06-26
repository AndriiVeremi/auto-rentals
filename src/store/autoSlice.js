import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchAuto } from './operations';

const status = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
};

const thunks = [fetchAuto];

const createStatus = status => isAnyOf(...thunks.map(el => el[status]));

//-------------------

const pendingAction = state => {
  state.isLoading = true;
  state.error = null;
};

const fulfilledAction = state => {
  state.isLoading = false;
  state.error = null;
};

const rejectedAction = (state, { payload }) => {
  state.error = payload.message;
  state.isLoading = false;
};

//-------------------

const handleFulfilledGet = (state, { payload }) => {
  state.avto.cars = payload;
  state.avto.length = payload.length;
};

//-----------------------

const autoSlice = createSlice({
  name: 'cars',
  initialState: {
    auto: {
      cars: [],
      length: 0,
    },

    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    const { PENDING, FULFILLED, REJECTED } = status;
    builder
      .addCase(fetchAuto.fulfilled, handleFulfilledGet)
      .addMatcher(createStatus(PENDING), pendingAction)
      .addMatcher(createStatus(FULFILLED), fulfilledAction)
      .addMatcher(createStatus(REJECTED), rejectedAction)
  },
});

export default autoSlice.reducer;
