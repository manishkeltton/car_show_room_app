// import { configureStore } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import { combineReducers } from "redux";
// import { persistReducer } from "redux-persist";
// import carDetailSlice from "./carDetailSlice/carDetailSlice";

// const reducers = combineReducers({
//   carData: carDetailSlice,
// });

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

// const store = configureStore({
//   reducer: persistedReducer,
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import carDetailSlice from "./carDetailSlice/carDetailSlice";

const store = configureStore({
  reducer: {
    carData: carDetailSlice,
  },
});

export default store;
