import usersSlice from "./usersSlice";
import { configureStore, createStore } from "@reduxjs/toolkit";
import loaderSlice from "./loaderSlice";
import RootReducer from "./RootReducer";

const store = configureStore({
  reducer: {
    users: usersSlice,
    loader: loaderSlice,
    password: RootReducer,
  },
});

export default store;
