import { createSlice } from "@reduxjs/toolkit";


const initialState={
    status: false,
    userData: null
}

const authSlice= createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: (state, action) => {
    console.log("Login action payload:", action.payload);
    state.status = true;
    state.userData = action.payload; // Try this first
},

        logout:(state)=>{
            state.status=false;
        }
    }
});

export const {login,logout}= authSlice.actions;

export default authSlice.reducer;