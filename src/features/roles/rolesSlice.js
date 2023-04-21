import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: [],
  status: "idle",
};

const dbURL = `http://127.0.0.1:5009`;

export const findRoles = createAsyncThunk("roles/fetchRoles", async () => {
  // console.log(JSON.stringify(creds));
  const response = await fetch(`${dbURL}/api/roles`);
  const data = await response.json();
  console.log(data);
  return data;
});

export const rolesSlice = createSlice({
  name: "roles",
  initialState,

  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(findRoles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(findRoles.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload);
        state.roles = action.payload;
      });
  },
});

// export const {} = userSlice.actions;

export default rolesSlice.reducer;
