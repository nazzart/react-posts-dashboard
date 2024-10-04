import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/dataSlice";

const store = configureStore({
  reducer: {
    userData: dataReducer,
  },
});

export default store;