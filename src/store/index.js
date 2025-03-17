import { configureStore } from '@reduxjs/toolkit';
import userReducer from './modules/user';

const store = configureStore({
  reducer: {
    user: userReducer,
    // 其他reducer...
  },
});

export default store;// 导出reducer



