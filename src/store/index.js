import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userReducer/userSlice";
import { uiReducer } from "./uiReducer/uiSlice";

const store = configureStore({
    reducer : {
        user : userReducer,
        ui: uiReducer,
    }
})

export default store;