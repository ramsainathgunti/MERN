import { createSlice } from "@reduxjs/toolkit";

const userState = localStorage.getItem("LoggedInItem");

// if (localStorage.getItem("LoggedInUser")) {
//     userState = JSON.stringify(localStorage.getItem("LoggedInUser"));
// } else {
//     userState = null;
// }

const initialState = {};

export const authSlice = createSlice({
    name: "user",
    initialState: { value: initialState },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
        logout: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;