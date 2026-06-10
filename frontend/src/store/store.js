import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice.js";

//object
export const store = configureStore({ 
    reducer:{
        auth:authReducer,
        //We can add more reducers here as the app grows
    },
});

export default store;