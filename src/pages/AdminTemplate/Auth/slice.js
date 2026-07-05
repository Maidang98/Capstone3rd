import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "./../../../services/api"

const userAdmin = localStorage.getItem("USER_ADMIN");
const data = userAdmin ? JSON.parse(userAdmin) : null


const initialState = {
    loading: false,
    data,
    error: null
};

export const actAuth = createAsyncThunk("auth/actAuth", async (user, { rejectWithValue }) => {
    try {
        const result = await api.post("QuanLyNguoiDung/DangNhap", user); 
      
        localStorage.setItem("USER_LOGIN", JSON.stringify(result.data.content));

        const role = result.data.content.maLoainguoiDung;

        if (role === "KhachHang"){

            return rejectWithValue({
                response:{
                    data: {
                        contet: "You are not authorized to access this area",
                    },
                },
            });
        }
        localStorage.setItem("USER_ADMIN",JSON.stringify(result.data.content));

        return result.data.content;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actAuth.pending, (state) => {
            state.loading = true;
            state.data = null;
            state.error = null;
        });
        builder.addCase(actAuth.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(actAuth.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        });
    },
});

export default authSlice.reducer;