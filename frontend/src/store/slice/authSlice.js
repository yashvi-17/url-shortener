//slices=states {we pass different states altogether in the store file}
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: { //these r the functions that can be accessed through states only (increases data security)
    login:(state,actions) => {
        state.user = actions.payload; //action.payload is the argument passed in the function call
        state.isAuthenticated = true;
    },
    logout: (state) => {
        state.user=null;
        state.isAuthenticated=false;
    },
  },
});

export const {
  login,
  logout
} = authSlice.actions;

export default authSlice.reducer;