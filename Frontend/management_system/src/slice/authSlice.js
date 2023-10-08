import { createSlice } from "@reduxjs/toolkit";
import { USERS } from "../constants/User";

export const authSlice = createSlice({
  name: 'isLoggedIn',
  initialState: {
    value: false,
    user: null
  },
  reducers: {
    login: (state, action) => {
      const {username, password} = action.payload;
      const user = USERS.find(user => user.username === username && user.password === password);
      if(user){
        state.value = true;
        state.user = user;
      }
    },
    logout: (state) => {
      state.value = false;
    },
  },
});

export const { login, logout} = authSlice.actions

export default authSlice.reducer