import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (queryParams) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/get-users?${queryParams}`
      );
      const users = response.data.users;
      const count = response.data.count;
      const totalPage = response.data.totalPages;
      return { users, count, totalPage };
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState = {
  users: [],
  totalCounts: 0,
  totalPages: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      const { users, count, totalPage } = action.payload;
      state.users = users;
      state.totalCounts = count;
      state.totalPages = totalPage;
    });
  },
});

// export actions
export const allUsers = (state) => state.userReducer.users;
export const totalCounts = (state) => state.userReducer.totalCounts;
export const totalPage = (state) => state.userReducer.totalPages;

export const userReducer = userSlice.reducer;
