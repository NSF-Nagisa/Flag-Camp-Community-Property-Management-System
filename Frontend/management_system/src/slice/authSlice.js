import { createSlice } from "@reduxjs/toolkit";
import { USERS } from "../constants/User";

export const authSlice = createSlice({
  name: "isLoggedIn",
  initialState: {
    value: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      const user = USERS.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        state.value = true;
        state.user = user;
      }
    },
    logout: (state) => {
      state.value = false;
    },
    updateUser: (state, action) =>{
      const newUser = action.payload;
      const userIndex = USERS.findIndex((u) => u.id == newUser.id);

      state.user = {
        ...state.user, 
        name: newUser.name,
        password: newUser.password,
        phone: newUser.phone,
        company: newUser.company 
      };
      USERS[userIndex] = state.user;
    }
  },
});

export const { login, logout, updateUser } = authSlice.actions;

export default authSlice.reducer