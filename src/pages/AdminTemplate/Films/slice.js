import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';

 
export const fetchListMovieAdmin = createAsyncThunk(
    'films/fetchListMovieAdmin',
    async (_, { rejectWithValue }) => {
        try {
            //
            const res = await api.get('/QuanLyPhim/LayDanhSachPhim?maNhom=GP01');
            return res.data.content;
        } catch (error) {
            return rejectWithValue(error.response?.data?.content);
        }
    }
);

// Add phim
export const addMovieUpload = createAsyncThunk(
  "films/addMovieUpload",
  async (formData, { rejectWithValue }) => {
    try {
      const userAdmin = localStorage.getItem("USER_ADMIN");
      const token = userAdmin ? JSON.parse(userAdmin).accessToken : null;

      const res = await api.post(
        "/QuanLyPhim/ThemPhimUploadHinh",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.content;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.content || "Failed to add movie!"
      );
    }
  }
);

// Edit phim
export const updateMovieUpload = createAsyncThunk(
  "films/updateMovieUpload",
  async (formData, { rejectWithValue }) => {
    try {
      const userAdmin = localStorage.getItem("USER_ADMIN");
      const token = userAdmin ? JSON.parse(userAdmin).accessToken : null;

      const res = await api.post("/QuanLyPhim/CapNhatPhimUpload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.content;
    } catch (error) {
      return rejectWithValue(error.response?.data?.content || "Update failed!");
    }
  }
);

// Delete phim
export const deleteMovie = createAsyncThunk(
  "films/deleteMovie",
  async (maPhim, { rejectWithValue, dispatch }) => {
    try {
      const userAdmin = JSON.parse(localStorage.getItem("USER_ADMIN"));
      const token = userAdmin?.accessToken;

      const res = await api.delete(`/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return maPhim; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.content || "Delete failed!");
    }
  }
);

const initialState = {
    listMovie: [],
    loading: false,
    error: null,
};

const filmsSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchListMovieAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchListMovieAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.listMovie = action.payload;
            })
            .addCase(fetchListMovieAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default filmsSlice.reducer;