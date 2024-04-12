import { Bill } from "@/app/lib/definitions";
import {
  fetchGetAll,
  fetchPost,
  fetchGetById,
  fetchPatch,
} from "@/app/lib/fetching";

import {
  type PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

// thunk functions
export const getAllBillsAsync = createAsyncThunk(
  "bill/getAll",
  async (): Promise<Bill[]> => {
    return await fetchGetAll("bills");
  }
);
// export const createClientAsync = createAsyncThunk(
//   "bill/create",
//   async (newClient: Bill) => {
//     const created = await await fetchPost(newClient, "clients");
//     return created;
//   }
// );
// export const getOneClientByIdAsync = createAsyncThunk(
//   "bill/getOneById",
//   async (id: string) => {
//     const bill = await fetchGetById(id, "clients");
//     return bill;
//   }
// );
// export const updateClientAsync = createAsyncThunk(
//   "bill/update",
//   async (modified: Bill) => {
//     const updated = await fetchPatch(modified.id, modified, "clients");
//     return updated;
//   }
// );
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
    // GETALL
    builder.addCase(getAllBillsAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllBillsAsync.fulfilled, (state, action) => {
      state.bills = action.payload;
      state.isLoading = false;
    });

    // * CREATE
    // builder.addCase(createClientAsync.pending, (state) => {
    //   state.isLoading = true;
    //   state.error = "";
    // });
    // builder.addCase(createClientAsync.fulfilled, (state, action) => {
    //   const newClient = action.payload;
    //   state.clients.push(newClient);
    //   state.created = newClient;
    //   state.isLoading = false;
    // });
    // builder.addCase(createClientAsync.rejected, (state, action) => {
    //   state.error = action.error.message;
    //   state.isLoading = false;
    // });

    // // GETBYID
    // builder.addCase(getOneClientByIdAsync.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(getOneClientByIdAsync.fulfilled, (state, action) => {
    //   const bill = action.payload;
    //   state.bill = bill;
    //   state.isLoading = false;
    // });

    // // UPDATE
    // builder.addCase(updateClientAsync.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(updateClientAsync.fulfilled, (state, action) => {
    //   const updated = action.payload;
    //   const id = updated.id;
    //   const index = state.clients.findIndex((item) => item.id === id);
    //   state.clients[index] = updated;
    //   state.isLoading = false;
    // });
  },
});

export const { setBillSync, cleanCreatedBillSync } = billSlice.actions;
export const billReducer = billSlice.reducer;
