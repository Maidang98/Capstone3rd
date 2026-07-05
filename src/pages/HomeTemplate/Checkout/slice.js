import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@services/api";

const initialState = {
    loading: false,
    roomTicketDetail: null, 
    danhSachGheDangDat: [], 
    error: null,
};

export const fetchRoomDetail = createAsyncThunk(
    "checkout/fetchRoomDetail",
    async (maLichChieu, { rejectWithValue }) => {
        try {
            const result = await api.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
            return result.data.content;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const bookTicket = createAsyncThunk(
    "checkout/bookTicket",
    async (bookingInfo, { rejectWithValue, dispatch }) => {
        try {
            await api.post(`QuanLyDatVe/DatVe`, bookingInfo);
            alert("Đặt vé thành công!");
            dispatch(fetchRoomDetail(bookingInfo.maLichChieu));
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const checkoutSlice = createSlice({
    name: "checkoutSlice",
    initialState,
    reducers: {
        datGhe: (state, action) => {
            const gheClick = action.payload;
            const index = state.danhSachGheDangDat.findIndex(ghe => ghe.maGhe === gheClick.maGhe);
            
            if (index !== -1) {
                state.danhSachGheDangDat.splice(index, 1);
            } else {
                state.danhSachGheDangDat.push(gheClick);
            }
        },
        clearBooking: (state) => {
            state.danhSachGheDangDat = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoomDetail.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRoomDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.roomTicketDetail = action.payload;
            })
            .addCase(fetchRoomDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { datGhe, clearBooking } = checkoutSlice.actions;
export default checkoutSlice.reducer;