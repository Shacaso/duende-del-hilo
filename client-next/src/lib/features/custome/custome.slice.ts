import { Costume } from "@/app/lib/definitions";
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
export const getAllCostumesAsync = createAsyncThunk(
  "costume/getAll",
  async () => {
    const costumes: Costume[] = await fetchGetAll("costumes");
    console.log(costumes);
    return costumes;
  }
);
// export const createClientAsync = createAsyncThunk(
//   "client/create",
//   async (newClient: Costume) => {
//     const created = await await fetchPost(newClient, "clients");
//     return created;
//   }
// );
// export const getOneClientByIdAsync = createAsyncThunk(
//   "client/getOneById",
//   async (id: string) => {
//     const client = await fetchGetById(id, "clients");
//     return client;
//   }
// );
// export const updateClientAsync = createAsyncThunk(
//   "client/update",
//   async (modified: Costume) => {
//     const updated = await fetchPatch(modified.id, modified, "clients");
//     return updated;
//   }
// );
interface State {
  costumes: Costume[];
  isLoading: boolean;
  costume?: Costume;
  created?: Costume;
  error?: string;
}

const initialState: State = {
  costumes: [],
  isLoading: false,
};

export const costumeSlice = createSlice({
  name: "costume",
  initialState,
  reducers: {
    setCostumeSync(state, action: PayloadAction<Costume>) {
      return { ...state, client: action.payload };
    },
    cleanCreatedClientSync(state) {
      const { created, ...newState } = state;
      return { ...newState };
    },
  },
  extraReducers(builder) {
    // GETALL
    builder.addCase(getAllCostumesAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllCostumesAsync.fulfilled, (state, action) => {
      state.costumes = action.payload;
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
    //   const client = action.payload;
    //   state.client = client;
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

export const { setCostumeSync, cleanCreatedClientSync } = costumeSlice.actions;
export const costumeReducer = costumeSlice.reducer;
