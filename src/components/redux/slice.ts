import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers"; // Reducerlar jamlanmasi

const store = configureStore({
  reducer: rootReducer, // Reducerlar jamlanmasi
});

export default store;
