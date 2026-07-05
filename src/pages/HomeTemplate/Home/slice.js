import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; 
import api from "../../../services/api";

const initialState = {
    loading: false,
    data: null,
    banners: [],
    error: null,
};

// Thunk to fetch banners
export const fetchBanners = createAsyncThunk("homeMovie/fetchBanners", async (__, { rejectWithValue }) => {
    try {
        const result = await api.get("QuanLyPhim/LayDanhSachBanner");
        return result.data.content;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// Thunk to fetch movie list
export const fetchData = createAsyncThunk("homeMovie/fetchData", async (__, { rejectWithValue }) => {
    try {
        const result = await api.get("QuanLyPhim/LayDanhSachPhim?maNhom=GP01");
        return result.data.content;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

const homeSlice = createSlice({
    name: "homeSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchData.pending, (state) => {
            state.loading = true;
            state.data = null;
            state.error = null;
        });
        builder.addCase(fetchData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        });
        builder.addCase(fetchData.rejected, (state, action) => {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        });
        builder.addCase(fetchBanners.fulfilled, (state, action) => {
            state.banners = action.payload;
        });
    },
});

export default homeSlice.reducer;
