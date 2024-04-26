import { Bill } from "@/app/lib/definitions";
import { fetchGetAll, fetchPost, fetchPatch } from "@/app/lib/fetching";

import {
  type PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

const path = "bills";

// thunk functions
export const getAllAsync = createAsyncThunk(
  "bill/getAll",
  async (): Promise<Bill[]> => {
    return await fetchGetAll(path);
  }
);
export const createAsync = createAsyncThunk(
  "bill/create",
  async (body: Bill): Promise<Bill> => {
    return await fetchPost(body, path);
  }
);
export const updateAsync = createAsyncThunk(
  "bill/update",
  async (body: Bill): Promise<Bill> => {
    return await fetchPatch(body.id, body, path);
  }
);
interface State {
  bills: Bill[];
  isLoading: boolean;
  bill?: Bill;
  created?: Bill;
  error?: string;
}

const initialState: State = {
  bills: [],
  isLoading: false,
};

export const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {
    setBillSync(state, action: PayloadAction<Bill>) {
      return { ...state, bill: action.payload };
    },
    cleanCreatedBillSync(state) {
      const { created, ...newState } = state;
      return { ...newState };
    },
  },
  extraReducers(builder) {
    //* GETALL
    builder.addCase(getAllAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllAsync.fulfilled, (state, action) => {
      state.bills = action.payload;
      state.isLoading = false;
    });

    // * CREATE
    builder.addCase(createAsync.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(createAsync.fulfilled, (state, action) => {
      const body = action.payload;
      state.bills.push(body);
      state.created = body;
      alert("La factura se ha guardado");
      state.isLoading = false;
    });
    builder.addCase(createAsync.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    //* UPDATE
    builder.addCase(updateAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateAsync.fulfilled, (state, action) => {
      const updated: Bill = action.payload;
      const { id } = updated;
      const index = state.bills.findIndex((item) => item.id === id);
      state.bills[index] = updated;
      // state.updated = updated;
      alert("La factura se ha actualizado");
      state.isLoading = false;
    });
  },
});

export const { setBillSync, cleanCreatedBillSync } = billSlice.actions;
export const billReducer = billSlice.reducer;
