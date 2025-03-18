import { createSlice } from "@reduxjs/toolkit";
import { use_token } from "@/utils/index";
import { user_api } from "@/apis/user";

const userstore = createSlice({
  name: "user",

  initialState: {
    useToken: "",
  },

  reducers: {
    setToken: (state, action) => {
      state.useToken = action.payload;
      use_token.set_token(action.payload); // 持久化存储token到浏览器本地
    },
    setuserinfor: (state, action) => {
      state.userinfor = action.payload;
    },
    removeuserinfor: (state, action) => {
      state.userinfor = {};
      state.useToken = "";
      use_token.remove_token(); // 删除token,本地的token
    },
  },
});

// 用户登录模块
const user_login = (data) => {
  return async (dispatch, getState) => {
    const response = await user_api.login(data);
    // 保存token
    dispatch(setToken(response.data.token));
  };
};

// 获取用户信息
const get_userinfo = () => {
  return async (dispatch, getState) => {
    const response = await user_api.get_user_info();
    // 保存用户信息
    dispatch(setuserinfor(response.data));
  };
};

const { setToken, setuserinfor, removeuserinfor } = userstore.actions;

const userReducer = userstore.reducer; // 导出reducer

// 导出修改的方法
export { setToken, user_login, get_userinfo, removeuserinfor };
export default userReducer; // 导出关键的reducer
