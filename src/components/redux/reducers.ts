import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

interface CounterState {
  value: number;
  collapsed: boolean; // collapsed holati qo'shildi
}

const initialState: CounterState = {
  value: 0,
  collapsed: false,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
