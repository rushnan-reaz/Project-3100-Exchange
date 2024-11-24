import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/counter/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
// import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });
