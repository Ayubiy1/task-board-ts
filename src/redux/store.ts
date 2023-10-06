import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers"; // Reducerlar jamlanmasi
import { type } from "os";

const store = configureStore({
  reducer: rootReducer, // Reducerlar jamlanmasi
});

export default store;

export type RooteState = ReturnType<typeof store.getState>;
export type AppDispach = typeof store.dispatch;
