import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fakeUser } from "./userAPI";

const initialState = {
  user: null,
  status: "idle",
};

const dbURL = `http://127.0.0.1:5009`;

export const signup = createAsyncThunk("user/CreateUser", async (creds) => {
  console.log(JSON.stringify(creds));
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(creds),
  };
  const response = await fetch(`${dbURL}/api/users`, options);
  const data = await response.json();
  console.log(data);
  return data;
});

export const login = createAsyncThunk("user/readOneUser", async (username) => {
  console.log(username);
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(username),
  };
  const response = await fetch(`${dbURL}/api/users/login`, options);
  const data = await response.json();
  console.log(data);
  return data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
    },
    // decrement: (state) => {
    //   state.value -= 1;
    // },

    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "idle";
        action.payload.error
          ? (state.user = null)
          : (state.user = action.payload);
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "idle";
        action.payload.error
          ? (state.user = null)
          : (state.user = action.payload);
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
