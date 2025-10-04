import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/projectApi";

export const fetchProjects = createAsyncThunk("projects/fetch", async () => {
  return await api.getProjects();
});

export const addProject = createAsyncThunk("projects/add", async (data) => {
  return await api.createProject(data);
});

export const updateProjectThunk = createAsyncThunk("projects/update", async ({ id, data }) => {
  return await api.updateProject(id, data);
});

// Evaluations Thunks
export const submitEvaluationThunk = createAsyncThunk("evaluations/submit", async (data) => {
  return await api.submitEvaluationApi(data);
});

export const fetchEvaluationsThunk = createAsyncThunk("evaluations/fetch", async () => {
  return await api.getEvaluationsApi();
});

// Add extraReducers for evaluations
builder
  .addCase(fetchEvaluationsThunk.fulfilled, (state, action) => { state.evaluations = action.payload; })
  .addCase(submitEvaluationThunk.fulfilled, (state, action) => { state.evaluations.push(action.payload); });

// Reports Thunks
export const submitReport = createAsyncThunk("reports/submit", async (data) => {
  return await api.submitReportApi(data);
});

export const fetchReports = createAsyncThunk("reports/fetch", async () => {
  return await api.getReportsApi();
});

export const evaluateReportThunk = createAsyncThunk("reports/evaluate", async ({ id, data }) => {
  return await api.evaluateReportApi(id, data);
});

// Add extraReducers for reports
builder
  .addCase(fetchReports.fulfilled, (state, action) => { state.reports = action.payload; })
  .addCase(submitReport.fulfilled, (state, action) => { state.reports.push(action.payload); })
  .addCase(evaluateReportThunk.fulfilled, (state, action) => {
    const index = state.reports.findIndex(r => r._id === action.payload._id);
    if (index !== -1) state.reports[index] = action.payload;
  });


const projectSlice = createSlice({
  name: "project",
  initialState: { projects: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => { state.loading = true; })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(updateProjectThunk.fulfilled, (state, action) => {
        const index = state.projects.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.projects[index] = action.payload;
      });
  },
});

export default projectSlice.reducer;
