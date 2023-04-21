import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { activeDefects, completedDefects } from "./defectAPI";

const initialState = {
  activeDefects: [],
  completedDefects: [],
  status: "idle",
};

const dbURL = `http://127.0.0.1:5009`;

export const addDefect = createAsyncThunk("defect/addDefect", async (info) => {
  console.log(info);
  // console.log(JSON.stringify(creds));
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  };
  const response = await fetch(`${dbURL}/api/defects`, options);
  const data = await response.json();

  console.log(data);
  return data;
});

export const getDefects = createAsyncThunk("defect/getDefects", async (id) => {
  const response = await fetch(`${dbURL}/api/defects/${id}`);
  const data = await response.json();
  console.log(data);
  return data;
});

export const defectSlice = createSlice({
  name: "defect",
  initialState,

  reducers: {
    // addDefect: (state, action) => {
    //   const newDefect = {
    //     title: action.payload.title,
    //     location: action.payload.location,
    //     description: action.payload.description,
    //     dateReported: Date.now(),
    //     assignedTo: Number(action.payload.assignedTo),
    //     registeredBy: Number(action.payload.registeredBy),
    //     isComplete: false,
    //   };
    // state.activeDefects.push(newDefect);
  },
  completeDefect: (state, action) => {
    console.log(action.payload);
    const completedDefect = {
      defectId: action.payload.defectId,
      title: action.payload.title,
      location: action.payload.location,
      description: action.payload.description,
      dateReported: action.payload.dateReported,
      assignedTo: Number(action.payload.assignedTo),
      registeredBy: Number(action.payload.registeredBy),
      dateCompleted: Date.now(),
      completedBy: Number(action.payload.completedBy),
      workDescription: action.payload.workDescription,
      isComplete: true,
    };
    state.completedDefects.push(completedDefect);
    state.activeDefects = state.activeDefects.filter(
      (defect) => defect.defectId !== action.payload.defectId
    );
  },

  extraReducers: (builder) => {
    builder
      .addCase(addDefect.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addDefect.fulfilled, (state, action) => {
        state.status = "rerender";
        console.log(action.payload.DepartmentRegisteredBy._id);
        getDefects(action.payload.DepartmentRegisteredBy._id);
        // state.activeDefects.push(action.payload);
      })
      .addCase(getDefects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDefects.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("fulfilled");
        const active = action.payload.filter(
          (defect) => defect.isComplete === false
        );
        const completed = action.payload.filter(
          (defect) => defect.isComplete === true
        );
        state.activeDefects = active;
        state.completedDefects = completed;
      });
  },
});

export const { completeDefect } = defectSlice.actions;

export default defectSlice.reducer;
