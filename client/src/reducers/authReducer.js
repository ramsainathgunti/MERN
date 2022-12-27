import { createSlice } from "@reduxjs/toolkit";

const initialState = { username: "", email: "" };

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