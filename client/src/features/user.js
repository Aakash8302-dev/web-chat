import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    login:{
        value: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem('userInfo')) : null,
        status:'idle',
        error: null
    }
}


export const userRegister = createAsyncThunk('user/register', async (userData, thunkAPI) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const {name, email, password} = userData
    
    const { data } = await axios.post('/api/users/', {name, email, password}, config)

    if (data.error) {
        throw new Error(data.error)
    } else {
        return data
    }
    
})

export const userLogin = createAsyncThunk('/user/login', async(userData, thunkAPI)=>{
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const {email, password} = userData;

    const {data} = await axios.post('/api/users/login', {email, password}, config)

    if (data.error) {
        throw new Error(data.error)
    } else {
        return data
    }

})

export const userLogout = createAsyncThunk('/user/logout', async(userData, thunkAPI)=>{
    localStorage.removeItem('userInfo');
    console.log("userLogout")
})


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(userRegister.pending, (state, action)=>{
            state.login.status = "loading"
            state.login.value = ""
            state.login.error = ""
        }).addCase(userRegister.fulfilled, (state,action)=>{
            state.login.status = "succeeded"
            state.login.value = action.payload
            state.login.error = null
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        }).addCase(userRegister.rejected, (state,action)=>{
            state.login.value = ""
            state.login.status = "failed"
            state.login.error = action.error.message
        }).addCase(userLogin.pending, (state,action)=>{
            state.login.status = "loading"
            state.login.error = null
            state.login.value = ""
        }).addCase(userLogin.fulfilled, (state,action)=>{
            state.login.status = "succeeded"
            state.login.value = action.payload
            state.login.error = null
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        }).addCase(userLogin.rejected, (state,action)=>{
            state.login.status = "failed"
            state.login.error = action.error.message
            state.login.value = ""
        }).addCase(userLogout.pending, (state,action)=>{
            state.login.status = "loading"
            state.login.value = ""
            state.login.error = null
        }).addCase(userLogout.fulfilled, (state,action)=>{
            state.login.status = "succeeded"
            state.login.value = null
            state.login.error = null
        }).addCase(userLogout.rejected, (state,action)=>{
            state.login.status="failed"
            state.login.value = null
            state.login.error = null
        })
    }
})


export default userSlice.reducer;